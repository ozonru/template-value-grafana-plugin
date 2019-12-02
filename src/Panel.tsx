import React, { PureComponent } from 'react';
import config from 'grafana/app/core/config';
import { Options } from './types';
import { PanelProps, getFieldDisplayValues } from '@grafana/ui';
import TemplateValue from './components/TemplateValue';

export default class Panel extends PureComponent<PanelProps<Options>> {
  render() {
    const { height, width, data, options, replaceVariables } = this.props;

    const values = getFieldDisplayValues({
      ...options,
      replaceVariables,
      theme: config.theme,
      data: data.series,
      sparkline: options.sparkline.show,
    });

    return <TemplateValue template={options.template} values={values} width={width} height={height} theme={config.theme} />;
  }
}
