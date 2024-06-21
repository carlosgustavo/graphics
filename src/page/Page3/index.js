import React, { useState } from 'react';
import { Table, Select, Divider, Row, Col, Checkbox } from 'antd';
import Chart3 from '../Chart3';

const { Option } = Select;

const Page3 = ({ data }) => {

  // Estado para controlar o tipo de gráfico
  const [typeChart, setTypeChart] = useState(false);

  // Estado para controlar quais colunas são visíveis na tabela
  const [visibleColumns, setVisibleColumns] = useState({
    nome: true,
    departamento: true,
    salario: true,
    anos_experiencia: true,
    idade: true,
    ano: true,
    mes: true,
    cor: true,
    fabricante: true,
  });

  // Estado para controlar se os campos de Salário e Anos de Experiência devem ser somados
  const [sumFields, setSumFields] = useState({
    salario: false,
    anos_experiencia: false,
  });
  
  // Estado para controlar se os detalhes devem ser mostrados
  const [showDetails, setShowDetails] = useState(false);

  // Função para lidar com a mudança na Checkbox para mostrar detalhes no gráfico
  const handleShowDetailsChange = (e) => {
    const isChecked = e.target.checked;
    setShowDetails(isChecked);
    setTypeChart(!showDetails);
  };

  // Função para lidar com a mudança no Select para alterar a visibilidade das colunas
  const handleVisibleChange = (selectedKeys) => {
    const newVisibleColumns = Object.keys(visibleColumns).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key);
      return acc;
    }, {});
    setVisibleColumns(newVisibleColumns);
  };

  // Função para lidar com a mudança no Select para somar campos
  const handleSumChange = (selectedKeys) => {
    const newSumFields = Object.keys(sumFields).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key);
      return acc;
    }, {});
    setSumFields(newSumFields);
  };

  // Função para calcular a soma de um campo especificado
  const calculateSum = (field) => {
    return data.reduce((acc, record) => acc + (record[field] || 0), 0);
  };

  // Definição das colunas da tabela
  const allColumns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => a.nome.localeCompare(b.nome) },
    { title: 'Departamento', dataIndex: 'departamento', key: 'departamento', sorter: (a, b) => a.departamento.localeCompare(b.departamento) },
    { title: 'Salário', dataIndex: 'salario', key: 'salario', sorter: (a, b) => a.salario - b.salario },
    { title: 'Anos de Experiência', dataIndex: 'anos_experiencia', key: 'anos_experiencia', sorter: (a, b) => a.anos_experiencia - b.anos_experiencia },
    { title: 'Idade', dataIndex: 'idade', key: 'idade', sorter: (a, b) => a.idade - b.idade },
    { title: 'Ano', dataIndex: 'ano', key: 'ano', sorter: (a, b) => a.ano - b.ano },
    { title: 'Mês', dataIndex: 'mes', key: 'mes', sorter: (a, b) => a.mes - b.mes },
    { title: 'Cor', dataIndex: 'cor', key: 'cor' },
    { title: 'Fabricante', dataIndex: 'fabricante', key: 'fabricante' },
  ];

  // Filtra as colunas com base no estado de visibilidade
  const columns = allColumns.filter(column => visibleColumns[column.key]);

  // Calcula o total de salários e total de anos de experiência para exibir no rodapé da tabela
  const totalSalario = sumFields.salario ? calculateSum('salario') : null;
  const totalAnosExperiencia = sumFields.anos_experiencia ? calculateSum('anos_experiencia') : null;

  // Prepara os dados para o gráfico (se necessário)
  const chartCategories = data.map(record => record.nome);
  const chartDataSalario = data.map(record => record.salario);
  const chartDataAnosExperiencia = data.map(record => record.anos_experiencia);

  return (
    <div>
      {
        !typeChart && (
          <>
            <Row gutter={[16, 16]} className='select-columns'>
              <Col span={24}>
                <Divider>Escolha as colunas para visualizar</Divider>
                <Select
                  mode="multiple"
                  placeholder="Selecionar colunas"
                  value={Object.keys(visibleColumns).filter(key => visibleColumns[key])}
                  onChange={handleVisibleChange}
                >
                  {allColumns.map(column => (
                    <Option key={column.key} value={column.key}>
                      {column.title}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 20 }} className='select-columns'>
              <Col span={24}>
                <Divider>Escolha os campos para somar</Divider>
                <Select
                  mode="multiple"
                  placeholder="Selecionar campos para somar"
                  style={{ width: '100%' }}
                  value={Object.keys(sumFields).filter(key => sumFields[key])}
                  onChange={handleSumChange}
                >
                  {['salario', 'anos_experiencia'].map(field => (
                    <Option key={field} value={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </>
        )
      }
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Checkbox checked={showDetails} onChange={handleShowDetailsChange}>
            Detalhar no Gráfico
          </Checkbox>
        </Col>
      </Row>
      {
        typeChart ? (
          <>
            <Divider>Gráfico de Salário e Anos de Experiência por Nome</Divider>
            <div className='chart'>
              <Chart3
                width="100px"
                categories={chartCategories}
                dataSalario={chartDataSalario}
                dataAnosExperiencia={chartDataAnosExperiencia}
              />
            </div>
          </>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={data}
              rowKey={record => record.id}
              pagination={{ pageSize: 10, className: 'center-pagination' }}
              style={{ marginTop: 20 }}
              summary={() => (
                <Table.Summary.Row>
                  {columns.map((col, index) => (
                    <Table.Summary.Cell key={index}>
                      {col.key === 'salario' && totalSalario !== null && (
                        <strong>Total Salário: {totalSalario.toFixed(2)}</strong>
                      )}
                      {col.key === 'anos_experiencia' && totalAnosExperiencia !== null && (
                        <strong>Total Anos de Experiência: {totalAnosExperiencia}</strong>
                      )}
                    </Table.Summary.Cell>
                  ))}
                </Table.Summary.Row>
              )}
            />
          </>
        )
      }
    </div>
  );
};

export default Page3;
