import React from 'react';
import Chart from 'react-apexcharts';

const Chart1 = ({ categories, dataPreco, dataQuantidade }) => {
  return (
    <Chart
      options={{
        chart: {
          type: 'line', // Utiliza um gráfico de linha para uma das séries
        },
        xaxis: {
          categories: categories, // Define as categorias no eixo X
        },
        yaxis: [
          {
            title: {
              text: 'Quantidade', // Título do eixo Y para a série de Quantidade
            },
          },
          {
            opposite: true,
            title: {
              text: 'Preço', // Título do eixo Y para a série de Preço
            },
          },
        ],
        stroke: {
          width: [0, 4], // Define a largura das linhas (0 para barra, 4 para linha)
        },
        plotOptions: {
          bar: {
            columnWidth: '50%', // Largura das colunas para o gráfico de barras
          },
        },
      }}
      series={[
        {
          name: 'Quantidade',
          type: 'column',
          data: dataQuantidade, // Dados para a série de Quantidade (gráfico de barras)
        },
        {
          name: 'Preço',
          type: 'line',
          data: dataPreco, // Dados para a série de Preço (gráfico de linha)
        },
      ]}
      height={350} // Altura do gráfico
    />
  );
};

export default Chart1;
