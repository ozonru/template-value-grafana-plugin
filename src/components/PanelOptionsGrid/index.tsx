import React, { FunctionComponent } from 'react';
import './index.css';

export const PanelOptionsGrid: FunctionComponent<{ cols?: number; children: any }> = ({ children }) => {
  return <div className="custom-panel-options-grid">{children}</div>;
};
