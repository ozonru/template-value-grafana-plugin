import React, { PureComponent } from 'react';
import { FieldDisplay, GrafanaTheme } from '@grafana/data';

interface Props {
  height: number;
  width: number;
  fontSize: string | undefined;
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
  lineHeight: '19px',
};

const templateVariableStyle = {
  fontWeight: 500,
};

export default class TemplateValue extends PureComponent<Props> {
  renderValue(index): JSX.Element {
    const value = this.props.values[index];

    if (!value) {
      return <></>;
    }

    const {
      display: { text, color, suffix = '' },
    } = value;

    return (
      <span key={`val-${index}`} style={{ ...templateVariableStyle, color }}>
        {text + suffix}
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
    const { width, height, template, values, fontSize } = this.props;

    return (
      <div style={{ ...wrapperStyle, width, height }}>
        {values.length === 0 ? null : <span style={{ ...valueStyle, fontSize }}>{this.renderTemplate(template)}</span>}
      </div>
    );
  }
}
