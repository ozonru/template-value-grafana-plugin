import { SingleStatBaseOptions } from '@grafana/ui';

export interface SparklineOptions {
  show: boolean;
  full: boolean; // full height
  fillColor: string;
  lineColor: string;
}

export interface AppearanceGeneralOptions {
  template: string;
}

export interface Options extends SingleStatBaseOptions, AppearanceGeneralOptions {
  valueFontSize?: string;
  colorBackground: boolean;
  colorValue: boolean;
  sparkline: SparklineOptions;
}

export interface EditorPanelsProps {
  options: Options;
  onChange: (options: Options) => void;
}
