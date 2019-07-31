import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { WidgetProps } from '../../interfaces';

const options = {
  chart: {
    width: 400,
    height: 200,
  },
  title: {
    text: 'My chart',
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
  credits: {
    enabled: false,
  },
};

export const PerformanceWidget: React.FC<WidgetProps> = () => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options as any} />
    </div>
  );
};
