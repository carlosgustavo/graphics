import React, { useState } from 'react';
import { Table, Select, Divider, Row, Col, Checkbox } from 'antd';
import Chart5 from '../Chart5';

const { Option } = Select;

const Page5 = ({ data }) => {
  const [typeChart, setTypeChart] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    categoria: true,
    valor: true,
    tipo: true,
    ano: true,
    mes: true,
    cor: true,
    fabricante: true,
  });

  const [sumFields, setSumFields] = useState({
    valor: false,
  });

  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetailsChange = (e) => {
    const isChecked = e.target.checked;
    setShowDetails(isChecked);
    setTypeChart(!showDetails);
  };

  const handleVisibleChange = (selectedKeys) => {
    const newVisibleColumns = Object.keys(visibleColumns).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key);
      return acc;
    }, {});
    setVisibleColumns(newVisibleColumns);
  };

  const handleSumChange = (selectedKeys) => {
    const newSumFields = Object.keys(sumFields).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key);
      return acc;
    }, {});
    setSumFields(newSumFields);
  };

  const calculateSum = (field) => {
    return data.reduce((acc, record) => acc + (record[field] || 0), 0);
  };

  const allColumns = [
    { title: 'Categoria', dataIndex: 'categoria', key: 'categoria', sorter: (a, b) => a.categoria.localeCompare(b.categoria) },
    { title: 'Valor', dataIndex: 'valor', key: 'valor', sorter: (a, b) => a.valor - b.valor },
    { title: 'Tipo', dataIndex: 'tipo', key: 'tipo', sorter: (a, b) => a.tipo.localeCompare(b.tipo) },
    { title: 'Ano', dataIndex: 'ano', key: 'ano', sorter: (a, b) => a.ano - b.ano },
    { title: 'Mês', dataIndex: 'mes', key: 'mes', sorter: (a, b) => a.mes - b.mes },
    { title: 'Cor', dataIndex: 'cor', key: 'cor' },
    { title: 'Fabricante', dataIndex: 'fabricante', key: 'fabricante' },
  ];

  const columns = allColumns.filter(column => visibleColumns[column.key]);

  const totalValor = sumFields.valor ? calculateSum('valor') : null;

  const chartCategories = data.map(record => record.categoria);
  const chartDataValor = data.map(record => record.valor);

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
                  {['valor'].map(field => (
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
            <Divider>Gráfico de Valor por Categoria</Divider>
            <div className='chart'>
              <Chart5
                width="100px"
                categories={chartCategories}
                dataValor={chartDataValor}
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
                      {col.key === 'valor' && totalValor !== null && (
                        <strong>Total Valor: R$ {totalValor.toFixed(2)}</strong>
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

export default Page5;
