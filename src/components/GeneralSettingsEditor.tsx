import React, { PureComponent } from 'react';
import { FormField, Select, PanelOptionsGroup, StatsPicker, Switch, UnitPicker } from '@grafana/ui';
import { fontSize, FORM_ELEMENT_WIDTH, LABEL_WIDTH } from '../consts';
import { EditorPanelsProps } from '../types';
import { FieldConfig, ReducerID, SelectableValue } from '@grafana/data';
import InputOnBlur from './InputOnBlur';

const checkExpression = /[ \t\d\.\$\+\-\/\*]+/i;
const EMPTY_ARRAY = [];
const valueMapping = s => s;

export class GeneralSettingsEditor extends PureComponent<EditorPanelsProps> {
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

  handleUnitChange = (selected?: string) =>
    this.override({
      unit: selected,
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

  handleTemplateChange = (e: React.SyntheticEvent) => {
    // @ts-ignore
    const template = e.target.value;

    this.props.onChange({
      ...this.props.options,
      template,
    });
  };

  handleThresholdExpressionChange = (template: string) => {
    if (!template.trim()) {
      this.props.onChange({
        ...this.props.options,
        thresholdExpression: undefined,
      });
    }

    const match = checkExpression.exec(template);

    if (!match || match[0].length !== template.length) {
      return;
    }

    this.props.onChange({
      ...this.props.options,
      thresholdExpression: template,
    });
  };

  toggleColorBackground = (e?: React.SyntheticEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    // @ts-ignore
    const hasColor = !!e.target.checked;

    this.props.onChange({
      ...this.props.options,
      colorBackground: hasColor,
    });
  };

  toggleColorValue = (e?: React.SyntheticEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    // @ts-ignore
    const hasColor = !!e.target.checked;

    this.props.onChange({
      ...this.props.options,
      colorValue: hasColor,
    });
  };

  render() {
    const { options } = this.props;
    const { defaults, override } = options.fieldOptions;
    const unit = override.unit || defaults.unit;

    return (
      <PanelOptionsGroup title="Appearance: General">
        <div className="section">
          <div className="gf-form">
            <FormField label="Unit format" labelWidth={LABEL_WIDTH} inputEl={<UnitPicker onChange={this.handleUnitChange} value={unit} />} />
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
              label="Template"
              labelWidth={LABEL_WIDTH}
              inputWidth={FORM_ELEMENT_WIDTH}
              value={options.template}
              onChange={this.handleTemplateChange}
            />
          </div>
          <div className="gf-form">
            <FormField
              label="Font size"
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
        <div className="section">
          <InputOnBlur<string>
            label="Threshold expression"
            placeholder="$1"
            labelWidth={LABEL_WIDTH}
            inputWidth={FORM_ELEMENT_WIDTH}
            value={options.thresholdExpression || ''}
            valueToString={valueMapping}
            onChange={this.handleThresholdExpressionChange}
          />
          <div>
            <Switch
              label="Color background"
              labelClass={`width-${LABEL_WIDTH}`}
              checked={options.colorBackground!}
              onChange={this.toggleColorBackground}
            />
          </div>
          <div>
            <Switch label="Color value" labelClass={`width-${LABEL_WIDTH}`} checked={options.colorValue!} onChange={this.toggleColorValue} />
          </div>
        </div>
      </PanelOptionsGroup>
    );
  }
}
