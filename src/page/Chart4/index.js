import React from 'react';
import Chart from 'react-apexcharts';

const Chart4 = ({ categories, dataOrcamento, dataDuracaoMeses }) => {
  const bubbleData = dataOrcamento.map((value, index) => ({
    x: categories[index],
    y: value,
    z: dataDuracaoMeses[index], // Valor do tamanho da bolha
  }));

  return (
    <Chart
      options={{
        chart: {
          type: 'bubble', // Tipo de gráfico
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          title: {
            text: 'Orçamento e Duração (Meses)',
          },
        },
        legend: {
          position: 'top',
        },
        tooltip: {
          shared: true,
        },
        colors: ['#00CED1'], // Cor personalizada para as bolhas
      }}
      series={[
        {
          name: 'Orçamento e Duração',
          data: bubbleData,
        },
      ]}
      height={350}
    />
  );
};

export default Chart4;
