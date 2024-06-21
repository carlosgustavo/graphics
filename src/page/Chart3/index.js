import React from 'react';
import Chart from 'react-apexcharts';

const Chart3 = ({ categories, dataSalario }) => {
  // Configuração das opções para o gráfico
  const options = {
    chart: {
      type: 'pie', // Define o tipo de gráfico como gráfico de pizza
    },
    labels: categories, // Rótulos para cada segmento (categorias)
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'], // Cores personalizadas para os segmentos
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
            width: 200
        }
      }
    }]
  };

  // Configuração das séries para o gráfico
  const series = dataSalario;

  // Renderiza o componente Chart com as opções e séries definidas
  return (
    <Chart
      options={options}
      series={series}
      type="pie" // Especifica o tipo padrão do gráfico (gráfico de pizza)
      height={420} // Define a altura do gráfico
    />
  );
};

export default Chart3;
