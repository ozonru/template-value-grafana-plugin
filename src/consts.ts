import { ReducerID, ThresholdsMode } from '@grafana/data';
import { FieldDisplayOptions, Options } from './types';

export const FORM_ELEMENT_WIDTH = 12;
export const LABEL_WIDTH = 10;
export const DEFAULT_FONT_SIZE = 19;

const FONT_SIZES = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
export const fontSize = {
  options: FONT_SIZES.map(v => ({ value: v, label: v })),
  byValue(value) {
    const i = FONT_SIZES.indexOf(value);

    return i > -1 ? { value, label: value } : undefined;
  },
};

export const standardFieldDisplayOptions: FieldDisplayOptions = {
  calcs: [ReducerID.last],
  defaults: {
    thresholds: {
      mode: ThresholdsMode.Absolute,
      steps: [
        { value: -Infinity, color: 'green' },
        { value: 80, color: 'red' }, // 80%
      ],
    },
    mappings: [],
    unit: 'none',
  },
  override: {},
};

export const defaults: Options = {
  fieldOptions: standardFieldDisplayOptions,
  colorBackground: false,
  colorValue: false,
  template: '$1',
};
