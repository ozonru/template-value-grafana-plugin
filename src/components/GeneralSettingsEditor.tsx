import React, { PureComponent } from 'react';
import { FormField, Select, PanelOptionsGroup, StatsPicker } from '@grafana/ui';
import { fontSize, FORM_ELEMENT_WIDTH, LABEL_WIDTH } from '../consts';
import { EditorPanelsProps } from '../types';
import { loadFormats } from '../utils';
import { FieldConfig, ReducerID, SelectableValue } from '@grafana/data';

const EMPTY_ARRAY = [];

export class GeneralSettingsEditor extends PureComponent<EditorPanelsProps> {
  unitFormats = loadFormats();

  override = (config: FieldConfig) =>
    this.props.onChange({
      ...this.props.options,
      fieldOptions: {
        ...this.props.options.fieldOptions,
        override: {
          ...this.props.options.fieldOptions.override,
          ...config,
        },
      },
    });

  handleUnitChange = (selected: SelectableValue<string>) =>
    this.override({
      unit: selected.value as string,
    });

  handleDecimalsChange = (e: React.SyntheticEvent) => {
    // @ts-ignore
    const value = parseInt(e.target.value, 10);

    this.override({
      decimals: !Number.isNaN(value) ? value : undefined,
    });
  };

  handleStatChange = (calcs: ReducerID[]) =>
    this.props.onChange({
      ...this.props.options,
      fieldOptions: {
        ...this.props.options.fieldOptions,
        calcs,
      },
    });

  handleValueFontSize = (v: SelectableValue<string>) => this.props.onChange({ ...this.props.options, valueFontSize: v.value });

  render() {
    const { options } = this.props;

    const { defaults, override } = options.fieldOptions;

    const unit = defaults.unit || override.unit;

    return (
      <PanelOptionsGroup title="Appearance: General">
        <div className="section">
          <div className="gf-form">
            <FormField
              label="Unit format"
              labelWidth={LABEL_WIDTH}
              inputEl={
                <Select<string>
                  placeholder="Select unit"
                  isClearable
                  isSearchable
                  isMulti={false}
                  width={FORM_ELEMENT_WIDTH}
                  onChange={this.handleUnitChange}
                  value={{ value: unit, label: unit }}
                  options={this.unitFormats}
                />
              }
            />
          </div>
          <div className="gf-form">
            <FormField
              label="Stat Type"
              labelWidth={LABEL_WIDTH}
              inputEl={
                <StatsPicker
                  allowMultiple={false}
                  placeholder="Select unit"
                  width={FORM_ELEMENT_WIDTH}
                  onChange={this.handleStatChange as (v: string[]) => void}
                  stats={options.fieldOptions.calcs ? options.fieldOptions.calcs : EMPTY_ARRAY}
                />
              }
            />
          </div>
          <div className="gf-form">
            <FormField
              label="Decimals"
              placeholder="auto"
              labelWidth={LABEL_WIDTH}
              inputWidth={FORM_ELEMENT_WIDTH}
              type="number"
              onChange={this.handleDecimalsChange}
              value={override.decimals || ''}
            />
          </div>
        </div>
        <div className="section">
          <div className="gf-form">
            <FormField
              label="Prefix"
              labelWidth={LABEL_WIDTH}
              inputEl={
                <Select
                  width={FORM_ELEMENT_WIDTH}
                  options={fontSize.options}
                  onChange={this.handleValueFontSize}
                  value={fontSize.byValue(options.valueFontSize)}
                />
              }
            />
          </div>
        </div>
      </PanelOptionsGroup>
    );
  }
}
