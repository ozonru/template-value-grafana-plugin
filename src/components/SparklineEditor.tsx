import React, { PureComponent } from 'react';
import { Switch, PanelOptionsGroup } from '@grafana/ui';
import { SparklineOptions } from '../types';
import { LABEL_WIDTH } from '../consts';

const labelWidth = `width-${LABEL_WIDTH}`;

export interface Props {
  options: SparklineOptions;
  onChange: (options: SparklineOptions) => void;
}

export class SparklineEditor extends PureComponent<Props> {
  onToggleShow = () => this.props.onChange({ ...this.props.options, show: !this.props.options.show });

  onToggleFull = () => this.props.onChange({ ...this.props.options, full: !this.props.options.full });

  render() {
    const { show, full } = this.props.options;

    return (
      <PanelOptionsGroup title="Sparkline">
        <Switch label="Show" labelClass={labelWidth} checked={show} onChange={this.onToggleShow} />
        <Switch label="Full Height" labelClass={labelWidth} checked={full} onChange={this.onToggleFull} />
      </PanelOptionsGroup>
    );
  }
}
