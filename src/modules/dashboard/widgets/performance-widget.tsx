import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PerformanceWidgetProps {
  title: string;
  props: any;
}

const options = {
  chart: {
    width: 400,
    height: 200
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
  }
};

export const PerformanceWidget: React.FC<PerformanceWidgetProps> = ({
  title,
}) => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options as any} />
    </div>
  );
};
