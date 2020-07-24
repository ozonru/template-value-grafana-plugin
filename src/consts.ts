import { SelectableValue } from '@grafana/data';
import { Options } from './types';

export const FORM_ELEMENT_WIDTH = 12;
export const LABEL_WIDTH = 10;

const FONT_SIZES = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
export const fontSize = {
  options: FONT_SIZES.map(v => ({ value: v, label: v })) as Array<SelectableValue<string>>,
  byValue(value) {
    const i = FONT_SIZES.indexOf(value);

    return i > -1 ? { value, label: value } : undefined;
  },
};

export const defaults: Options = {
  colorBackground: false,
  colorValue: false,
  template: '$1',
};
