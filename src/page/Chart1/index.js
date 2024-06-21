import React from 'react';
import Chart from 'react-apexcharts';

const Chart1 = ({ categories, dataPreco, dataQuantidade }) => {
  return (
    <Chart
      options={{
        chart: {
          type: 'line', // Use a line chart for one of the series
        },
        xaxis: {
          categories: categories,
        },
        yaxis: [
          {
            title: {
              text: 'Quantidade',
            },
          },
          {
            opposite: true,
            title: {
              text: 'Preço',
            },
          },
        ],
        stroke: {
          width: [0, 4], // Set the width of the lines (0 for bar, 4 for line)
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
      }}
      series={[
        {
          name: 'Quantidade',
          type: 'column',
          data: dataQuantidade,
        },
        {
          name: 'Preço',
          type: 'line',
          data: dataPreco,
        },
      ]}
      height={350}
    />
  );
};

export default Chart1;
