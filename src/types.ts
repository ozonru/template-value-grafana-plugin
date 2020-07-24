export interface AppearanceGeneralOptions {
  template: string;
  thresholdExpression?: string;
}

export interface Options extends AppearanceGeneralOptions {
  valueFontSize?: string;
  colorBackground: boolean;
  colorValue: boolean;
}

export interface EditorPanelsProps {
  options: Options;
  onChange: (options: Options) => void;
}
