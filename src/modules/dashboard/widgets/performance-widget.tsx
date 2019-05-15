import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PerformanceWidgetProps {
  title: string;
  props: any;
}

const options = {
  title: {
    text: 'My chart',
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
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
