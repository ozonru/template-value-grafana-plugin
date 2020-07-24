/* eslint-disable */
import React, { PureComponent } from 'react';
import { Options } from './types';
import TemplateValue from './components/TemplateValue';
import { PanelProps, getFieldDisplayValues, FieldDisplay, toDataFrame, ReducerID, getDisplayProcessor } from '@grafana/data';
import { Themeable, withTheme } from '@grafana/ui';

interface State {
  values: FieldDisplay[];
  color: string | undefined;
}
type Props = PanelProps<Options> & Themeable;

class Panel extends PureComponent<Props, State> {
  static getDerivedStateFromProps({ options, fieldConfig, data, replaceVariables, theme }: Props): State {
    const values = getFieldDisplayValues({
      fieldConfig,
      reduceOptions: {calcs: [ReducerID.last]},
      replaceVariables,
      theme,
      data: data.series,
      sparkline: undefined,
    });

    debugger;
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
        /*eslint no-eval: 0*/
        /* tslint:disable:no-eval */
        const value = eval(replacedVariables);

        if (typeof value === 'number' && !Number.isNaN(value)) {
          const frame = [toDataFrame({ data: [[0, value]] })];
          frame[0].fields[0].config = {thresholds: fieldConfig.defaults.thresholds};
          const processor = getDisplayProcessor({
            field: frame[0].fields[0],
            theme,
          });

          color = processor(value).color;
        }
      }
    }

    // const fontSize = options.valueFontSize ? evaluateFontSize(DEFAULT_FONT_SIZE, options.valueFontSize) : DEFAULT_FONT_SIZE;

    values.forEach(val => {
      // val.display.fontSize = `${fontSize}px`;

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
    const { height, width, options, theme } = this.props;

    debugger;

    return (
      <div ref={this.panel}>
        <TemplateValue
          template={options.template}
          values={this.state.values}
          fontSize={options.valueFontSize}
          width={width}
          height={height}
          theme={theme}
        />
      </div>
    );
  }
}

export default withTheme(Panel);
