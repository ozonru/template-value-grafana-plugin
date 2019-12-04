import React, { PureComponent } from 'react';
import { PanelEditorProps, ThresholdsEditor, ValueMappingsEditor, FieldDisplayOptions } from '@grafana/ui';
import { Threshold, ValueMapping, FieldConfig } from '@grafana/data';

import { Options } from './types';
import { GeneralSettingsEditor } from './components/GeneralSettingsEditor';
import { PanelOptionsGrid } from './components/PanelOptionsGrid';

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
        <GeneralSettingsEditor options={options} onChange={this.props.onOptionsChange} />
        <PanelOptionsGrid cols={2}>
          <ThresholdsEditor onChange={this.onThresholdsChanged} thresholds={defaults.thresholds} />
          <ValueMappingsEditor onChange={this.onValueMappingsChanged} valueMappings={defaults.mappings} />
        </PanelOptionsGrid>
      </>
    );
  }
}
