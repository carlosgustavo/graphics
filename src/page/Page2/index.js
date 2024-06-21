import React, { useState } from 'react';
import { Table, Select, Divider, Row, Col, Checkbox } from 'antd';
import Chart2 from '../Chart2';

const { Option } = Select;

const Page2 = ({ data }) => {

  const [typeChart, setTypeChart] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    cliente: true,
    categoria: true,
    valor_total: true,
    itens: true,
    ano: true,
    mes: true,
    cor: true,
    fabricante: true,
  });

  const [sumFields, setSumFields] = useState({
    valor_total: false,
    itens: false,
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
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Categoria', dataIndex: 'categoria', key: 'categoria' },
    { title: 'Valor Total', dataIndex: 'valor_total', key: 'valor_total', sorter: (a, b) => a.valor_total - b.valor_total },
    { title: 'Itens', dataIndex: 'itens', key: 'itens', sorter: (a, b) => a.itens - b.itens },
    { title: 'Ano', dataIndex: 'ano', key: 'ano', sorter: (a, b) => a.ano - b.ano },
    { title: 'Mês', dataIndex: 'mes', key: 'mes', sorter: (a, b) => a.mes - b.mes },
    { title: 'Cor', dataIndex: 'cor', key: 'cor' },
    { title: 'Fabricante', dataIndex: 'fabricante', key: 'fabricante' },
  ];

  const columns = allColumns.filter(column => visibleColumns[column.dataIndex]);

  const totalValorTotal = sumFields.valor_total ? calculateSum('valor_total') : null;
  const totalItens = sumFields.itens ? calculateSum('itens') : null;

  const chartCategories = data.map(record => record.cliente);
  const chartDataValorTotal = data.map(record => record.valor_total);
  const chartDataItens = data.map(record => record.itens);

  return (
    <div>
      {!typeChart && (
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
                  <Option key={column.key} value={column.dataIndex}>
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
                {['valor_total', 'itens'].map(field => (
                  <Option key={field} value={field}>
                    {field.replace('_', ' ').toUpperCase()}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </>
      )}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Checkbox checked={showDetails} onChange={handleShowDetailsChange}>
            Detalhar no Gráfico
          </Checkbox>
        </Col>
      </Row>
      {typeChart ? (
        <>
          <Divider>Gráfico de Valor Total e Itens por Cliente</Divider>
          <div className='chart'>
            <Chart2
              width="100px"
              categories={chartCategories}
              dataValorTotal={chartDataValorTotal}
              dataItens={chartDataItens}
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
                    {col.dataIndex === 'valor_total' && totalValorTotal !== null && (
                      <strong>Total Valor Total: {totalValorTotal.toFixed(2)}</strong>
                    )}
                    {col.dataIndex === 'itens' && totalItens !== null && (
                      <strong>Total Itens: {totalItens}</strong>
                    )}
                  </Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            )}
          />
        </>
      )}
    </div>
  );
};

export default Page2;
