import React, { useState } from 'react';
import { Table, Select, Divider, Row, Col, Checkbox } from 'antd';
import Chart4 from '../Chart4';

const { Option } = Select;

const Page4 = ({ data }) => {

  const [typeChart, setTypeChart] = useState(false);
  // State to manage which columns are visible
  const [visibleColumns, setVisibleColumns] = useState({
    nome: true,
    departamento: true,
    orcamento: true,
    duracao_meses: true,
    ano_inicio: true,
    mes_inicio: true,
    cor: true,
    fabricante: true,
  });

  // State to manage if the Orcamento and Duracao Meses fields should be summed
  const [sumFields, setSumFields] = useState({
    orcamento: false,
    duracao_meses: false,
  });
  
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetailsChange = (e) => {
    const isChecked = e.target.checked;
    setShowDetails(isChecked);
    setTypeChart(!showDetails);
  };

  // Handle Select change for column visibility
  const handleVisibleChange = (selectedKeys) => {
    const newVisibleColumns = Object.keys(visibleColumns).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key);
      return acc;
    }, {});
    setVisibleColumns(newVisibleColumns);
  };

  // Handle Select change for summing fields
  const handleSumChange = (selectedKeys) => {
    const newSumFields = Object.keys(sumFields).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key);
      return acc;
    }, {});
    setSumFields(newSumFields);
  };

  // Calculate sum of a specified field
  const calculateSum = (field) => {
    return data.reduce((acc, record) => acc + (record[field] || 0), 0);
  };

  // Define table columns
  const allColumns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => a.nome.localeCompare(b.nome) },
    { title: 'Departamento', dataIndex: 'departamento', key: 'departamento', sorter: (a, b) => a.departamento.localeCompare(b.departamento) },
    { title: 'Orçamento', dataIndex: 'orcamento', key: 'orcamento', sorter: (a, b) => a.orcamento - b.orcamento },
    { title: 'Duração (Meses)', dataIndex: 'duracao_meses', key: 'duracao_meses', sorter: (a, b) => a.duracao_meses - b.duracao_meses },
    { title: 'Ano Início', dataIndex: 'ano_inicio', key: 'ano_inicio', sorter: (a, b) => a.ano_inicio - b.ano_inicio },
    { title: 'Mês Início', dataIndex: 'mes_inicio', key: 'mes_inicio', sorter: (a, b) => a.mes_inicio - b.mes_inicio },
    { title: 'Cor', dataIndex: 'cor', key: 'cor' },
    { title: 'Fabricante', dataIndex: 'fabricante', key: 'fabricante' },
  ];

  // Filter columns based on visibility state
  const columns = allColumns.filter(column => visibleColumns[column.key]);

  // Calculate total orcamento and total duracao_meses for rendering in the footer
  const totalOrcamento = sumFields.orcamento ? calculateSum('orcamento') : null;
  const totalDuracaoMeses = sumFields.duracao_meses ? calculateSum('duracao_meses') : null;

  // Prepare data for chart (if needed)
  const chartCategories = data.map(record => record.nome);
  const chartDataOrcamento = data.map(record => record.orcamento);
  const chartDataDuracaoMeses = data.map(record => record.duracao_meses);

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
                  {['orcamento', 'duracao_meses'].map(field => (
                    <Option key={field} value={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
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
            <Divider>Gráfico de Orçamento e Duração por Nome do Projeto</Divider>
            <div className='chart'>
              <Chart4
                width="100px"
                categories={chartCategories}
                dataOrcamento={chartDataOrcamento}
                dataDuracaoMeses={chartDataDuracaoMeses}
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
                      {col.key === 'orcamento' && totalOrcamento !== null && (
                        <strong>Total Orçamento: R$ {totalOrcamento.toFixed(2)}</strong>
                      )}
                      {col.key === 'duracao_meses' && totalDuracaoMeses !== null && (
                        <strong>Total Duração (Meses): {totalDuracaoMeses}</strong>
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

export default Page4;
