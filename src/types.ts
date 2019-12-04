import { SingleStatBaseOptions } from '@grafana/ui';

export interface SparklineOptions {
  show: boolean;
  full: boolean;
  fillColor: string;
  lineColor: string;
}

export interface AppearanceGeneralOptions {
  template: string;
  thresholdExpression?: string;
}

export interface Options extends SingleStatBaseOptions, AppearanceGeneralOptions {
  valueFontSize?: string;
  colorBackground: boolean;
  colorValue: boolean;
}

export interface EditorPanelsProps {
  options: Options;
  onChange: (options: Options) => void;
}
