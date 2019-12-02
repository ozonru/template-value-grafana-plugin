import React, { PureComponent } from 'react';
import { PanelEditorProps, ThresholdsEditor, PanelOptionsGrid, ValueMappingsEditor, FieldDisplayOptions } from '@grafana/ui';
import { Threshold, ValueMapping, FieldConfig } from '@grafana/data';

import { Options, SparklineOptions } from './types';
import { ColoringEditor } from './components/ColoringEditor';
import { SparklineEditor } from './components/SparklineEditor';
import { GeneralSettingsEditor } from './components/GeneralSettingsEditor';

export default class Editor extends PureComponent<PanelEditorProps<Options>> {
  onThresholdsChanged = (thresholds: Threshold[]) => {
    const current = this.props.options.fieldOptions.defaults;
    this.onDefaultsChange({
      ...current,
      thresholds,
    });
  };

  onValueMappingsChanged = (mappings: ValueMapping[]) => {
    const current = this.props.options.fieldOptions.defaults;
    this.onDefaultsChange({
      ...current,
      mappings,
    });
  };

  onDisplayOptionsChanged = (fieldOptions: FieldDisplayOptions) =>
    this.props.onOptionsChange({
      ...this.props.options,
      fieldOptions,
    });

  onSparklineChanged = (sparkline: SparklineOptions) =>
    this.props.onOptionsChange({
      ...this.props.options,
      sparkline,
    });

  onDefaultsChange = (field: FieldConfig) => {
    this.onDisplayOptionsChanged({
      ...this.props.options.fieldOptions,
      defaults: field,
    });
  };

  render() {
    const { options } = this.props;
    const { fieldOptions } = options;
    const { defaults } = fieldOptions;

    return (
      <>
        <PanelOptionsGrid>
          <GeneralSettingsEditor options={options} onChange={this.props.onOptionsChange} />
          <ColoringEditor options={options} onChange={this.props.onOptionsChange} />
          <SparklineEditor options={options.sparkline} onChange={this.onSparklineChanged} />
          <ThresholdsEditor onChange={this.onThresholdsChanged} thresholds={defaults.thresholds} />
        </PanelOptionsGrid>

        <ValueMappingsEditor onChange={this.onValueMappingsChanged} valueMappings={defaults.mappings} />
      </>
    );
  }
}
