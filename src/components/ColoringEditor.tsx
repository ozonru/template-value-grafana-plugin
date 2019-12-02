import React, { PureComponent } from 'react';
import { Switch, PanelOptionsGroup } from '@grafana/ui';
import { EditorPanelsProps } from '../types';
import { LABEL_WIDTH } from '../consts';

const labelWidth = `width-${LABEL_WIDTH}`;

export class ColoringEditor extends PureComponent<EditorPanelsProps> {
  onToggleColorBackground = () => this.props.onChange({ ...this.props.options, colorBackground: !this.props.options.colorBackground });

  onToggleColorValue = () => this.props.onChange({ ...this.props.options, colorValue: !this.props.options.colorValue });

  render() {
    const { colorBackground, colorValue } = this.props.options;

    return (
      <PanelOptionsGroup title="Coloring">
        <Switch label="Background" labelClass={labelWidth} checked={colorBackground!} onChange={this.onToggleColorBackground} />
        <Switch label="Value" labelClass={labelWidth} checked={colorValue!} onChange={this.onToggleColorValue} />
      </PanelOptionsGroup>
    );
  }
}
