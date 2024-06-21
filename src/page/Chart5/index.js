import React from 'react';
import Chart from 'react-apexcharts';

const Chart5 = ({ categories, dataValor }) => {
  const chartData = {
    options: {
      chart: {
        type: 'bar', // Alterado para tipo de gráfico de barras
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false, // Define a orientação das barras
        },
      },
      xaxis: {
        categories: categories, // Categorias no eixo X
      },
      colors: ['#8FBC8F'], // Cores personalizadas para as barras
    },
    series: [
      {
        data: dataValor, // Dados das barras
      },
    ],
  };

  return (
    <div className="chart">
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default Chart5;
