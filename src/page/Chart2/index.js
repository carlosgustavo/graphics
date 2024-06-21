import React from 'react';
import Chart from 'react-apexcharts';

const Chart2 = ({ categories, dataValorTotal, dataItens }) => {
  return (
    <Chart
      options={{
        chart: {
          type: 'bar', // Tipo de gráfico (bar para gráfico de barras)
          stacked: true, // Barras empilhadas
        },
        xaxis: {
          categories: categories, // Categorias para o eixo X
        },
        yaxis: {
          title: {
            text: 'Valor Total e Itens', // Título do eixo Y
          },
        },
        plotOptions: {
          bar: {
            horizontal: false, // Barras na vertical
          },
        },
        legend: {
          position: 'top', // Posição da legenda
        },
        tooltip: {
          shared: true, // Tooltip compartilhado
        },
      }}
      series={[
        {
          name: 'Valor Total',
          data: dataValorTotal, // Dados da série de valor total
        },
        {
          name: 'Itens',
          data: dataItens, // Dados da série de itens
        },
      ]}
      height={350}
    />
  );
};

export default Chart2;
