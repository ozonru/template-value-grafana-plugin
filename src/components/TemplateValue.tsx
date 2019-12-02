import React, { PureComponent } from 'react';
import { FieldDisplay, GrafanaTheme } from '@grafana/ui';

interface Props {
  height: number;
  width: number;
  values: FieldDisplay[];
  theme: GrafanaTheme;
  template: string;
}

const wrapperStyle = {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};

const valueStyle = {
  alignSelf: 'center',
};

export default class TemplateValue extends PureComponent<Props> {
  renderValue(index): JSX.Element {
    const value = this.props.values[index];

    if (!value) {
      return <></>;
    }

    const {
      display: { text, fontSize, color },
    } = value;

    return (
      <span key={`val-${index}`} style={{ fontSize, color }}>
        {text}
      </span>
    );
  }

  renderTemplate(template: string) {
    const regex = /\$\d+/g;
    let prevEnd = 0;
    let match = regex.exec(template);

    if (!match) {
      return [];
    }

    const result: Array<JSX.Element | string> = [];

    while (match) {
      result.push(template.slice(prevEnd, match.index));

      prevEnd = match.index + match[0].length;
      result.push(this.renderValue(parseInt(match[0].slice(1), 10) - 1));
      match = regex.exec(template);
    }

    if (prevEnd !== template.length) {
      result.push(template.slice(prevEnd));
    }

    return result;
  }

  render() {
    const { width, height, template } = this.props;

    return (
      <div style={{ ...wrapperStyle, width, height }}>
        <span style={valueStyle}>{this.renderTemplate(template)}</span>
      </div>
    );
  }
}
