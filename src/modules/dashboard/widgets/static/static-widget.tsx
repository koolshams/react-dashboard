import React from 'react';
import { WidgetProps } from '../../interfaces';

export const StaticWidget: React.FC<WidgetProps> = ({ widget }) => {
  return (
    <div>
      <p>{widget.props.text || 'no text provided'}</p>
    </div>
  );
};
