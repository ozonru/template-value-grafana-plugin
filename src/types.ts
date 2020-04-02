import { FieldConfig } from '@grafana/data';

export interface AppearanceGeneralOptions {
  template: string;
  thresholdExpression?: string;
}

export interface FieldDisplayOptions {
  values?: boolean;
  limit?: number;
  calcs: string[];
  defaults: FieldConfig;
  override: FieldConfig;
}

export interface Options extends AppearanceGeneralOptions {
  fieldOptions: FieldDisplayOptions;
  valueFontSize?: string;
  colorBackground: boolean;
  colorValue: boolean;
}

export interface EditorPanelsProps {
  options: Options;
  onChange: (options: Options) => void;
}
