import { PanelPlugin, SelectableValue } from '@grafana/data';
import { Options } from './types';
import Panel from './Panel';
import { fontSize } from './consts';

import './switch-patch.css';

export const plugin = new PanelPlugin<Options>(Panel)
  .setPanelOptions(builder => {
    builder
      .addTextInput({
        path: 'template',
        description: 'Value template: e.g. $1',
        name: 'Template',
        defaultValue: '$1',
      })
      .addTextInput({
        path: 'thresholdExpression',
        description: 'e.g. $1 / $2',
        name: 'Threshold expression',
        defaultValue: '$1',
      })
      .addBooleanSwitch({
        path: 'colorValue',
        name: 'Color value',
        defaultValue: false,
      })
      .addBooleanSwitch({
        path: 'colorBackground',
        name: 'Color background',
        defaultValue: false,
      })
      .addSelect<string, { options: Array<SelectableValue<string>> }>({
        path: 'valueFontSize',
        name: 'Font size',
        settings: {
          options: fontSize.options,
        },
      });
  })
  .setNoPadding()
  .useFieldConfig();
