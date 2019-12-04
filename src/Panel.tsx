import React, { PureComponent } from 'react';
import config from 'grafana/app/core/config';
import { Options } from './types';
import { FieldDisplay, getFieldDisplayValues, PanelProps } from '@grafana/ui';
import TemplateValue from './components/TemplateValue';
import { DEFAULT_FONT_SIZE } from './consts';
import { ArrayVector, FieldType } from '@grafana/data';

interface State {
  values: FieldDisplay[];
  color: string | undefined;
}

function evaluateFontSize(size: number, percent: string): number {
  const percentNumber = parseInt(percent, 10);

  return Math.round((size / 100) * percentNumber);
}

export default class Panel extends PureComponent<PanelProps<Options>, State> {
  static getDerivedStateFromProps({ options, data, replaceVariables }: PanelProps<Options>): State {
    const values = getFieldDisplayValues({
      ...options,
      replaceVariables,
      theme: config.theme,
      data: data.series,
      sparkline: undefined,
    });

    let color = values[0].display.color;

    if (options.thresholdExpression) {
      let valid = true;

      const replacedVariables = options.thresholdExpression.replace(/\$\d+/g, (varId: string): string => {
        if (!valid) {
          return varId;
        }

        const i = parseInt(varId.slice(1), 10) - 1;

        if (!values[i]) {
          valid = false;
          return varId;
        }

        return values[i].display.numeric.toString();
      });

      if (valid) {
        /* tslint:disable:no-eval */
        const value = eval(replacedVariables);

        if (typeof value === 'number' && !Number.isNaN(value)) {
          const result = getFieldDisplayValues({
            ...options,
            replaceVariables,
            theme: config.theme,
            data: [
              {
                length: 1,
                fields: [
                  {
                    name: '',
                    type: FieldType.number,
                    values: new ArrayVector([value]),
                    config: {},
                  },
                ],
              },
            ],
            sparkline: undefined,
          });

          color = result[0].display.color;
        }
      }
    }

    const fontSize = options.valueFontSize ? evaluateFontSize(DEFAULT_FONT_SIZE, options.valueFontSize) : DEFAULT_FONT_SIZE;

    values.forEach(val => {
      val.display.fontSize = `${fontSize}px`;

      if (!options.colorValue) {
        val.display.color = undefined;
      }
    });

    return {
      values,
      color: options.colorBackground ? color : undefined,
    };
  }

  private panel: React.RefObject<HTMLDivElement>;

  constructor(props, ctx) {
    super(props, ctx);

    this.panel = React.createRef();
  }

  componentDidUpdate() {
    this.tryToRenderBackground();
  }

  componentDidMount() {
    this.tryToRenderBackground();
  }

  tryToRenderBackground() {
    const { options } = this.props;
    const parent = ((this.panel.current as HTMLDivElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement;

    if (options.colorBackground && this.panel) {
      parent.setAttribute('style', `background-color: ${this.state.color}`);
    } else {
      parent.setAttribute('style', '');
    }
  }

  render() {
    const { height, width, options } = this.props;

    return (
      <div ref={this.panel}>
        <TemplateValue template={options.template} values={this.state.values} width={width} height={height} theme={config.theme} />
      </div>
    );
  }
}
