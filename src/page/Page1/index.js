import React, { useState } from 'react';
import { Table, Select, Divider, Row, Col, Checkbox } from 'antd';
import Chart1 from '../Chart1'


const { Option } = Select;

const Page1 = ({ data }) => {

  const [typeChart, setTypeChart] = useState(false)
  // State to manage which columns are visible
  const [visibleColumns, setVisibleColumns] = useState({
    nome: true,
    categoria: true,
    preco: true,
    quantidade: true,
    ano: true,
    mes: true,
    cor: true,
    fabricante: true,
  });


  // State to manage if the Preço and Quantidade fields should be summed
  const [sumFields, setSumFields] = useState({
    preco: false,
    quantidade: false,
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

  // Definição das colunas da tabela
  const allColumns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => a.nome.localeCompare(b.nome) },
    { title: 'Categoria', dataIndex: 'categoria', key: 'categoria', sorter: (a, b) => a.categoria.localeCompare(b.categoria) },
    { title: 'Preço', dataIndex: 'preco', key: 'preco', sorter: (a, b) => a.preco - b.preco },
    { title: 'Quantidade', dataIndex: 'quantidade', key: 'quantidade', sorter: (a, b) => a.quantidade - b.quantidade },
    { title: 'Ano', dataIndex: 'ano', key: 'ano', sorter: (a, b) => a.ano - b.ano },
    { title: 'Mês', dataIndex: 'mes', key: 'mes', sorter: (a, b) => a.mes.localeCompare(b.mes) },
    { title: 'Cor', dataIndex: 'cor', key: 'cor' },
    { title: 'Fabricante', dataIndex: 'fabricante', key: 'fabricante' },
  ];

  // Filter columns based on visibility state
  const columns = allColumns.filter(column => visibleColumns[column.key]);

  // Calculate total prices and quantities for rendering in the footer
  const totalPreco = sumFields.preco ? calculateSum('preco') : null;
  const totalQuantidade = sumFields.quantidade ? calculateSum('quantidade') : null;

  // Prepare data for chart
  const chartCategories = data.map(record => record.nome);
  const chartDataPreco = data.map(record => record.preco);
  const chartDataQuantidade = data.map(record => record.quantidade);

  return (
    <div>
      {
        !typeChart && (
          <>
            <Row gutter={[16, 16]} className='select-columns'
            >
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
                <div>

                </div>
                <Select
                  mode="multiple"
                  placeholder="Selecionar campos para somar"
                  style={{ width: '100%' }}
                  value={Object.keys(sumFields).filter(key => sumFields[key])}
                  onChange={handleSumChange}
                >
                  {['preco', 'quantidade'].map(field => (
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

            <Divider>Gráfico de Preço e Quantidade por Nome</Divider>
            <div className='chart'>
              <Chart1
                width="100px"
                categories={chartCategories}
                dataPreco={chartDataPreco}
                dataQuantidade={chartDataQuantidade}
              />
            </div>
          </>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={data}
              rowKey={record => record.key || record.id}
              pagination={{ pageSize: 10, className: 'center-pagination' }}
              style={{ marginTop: 20 }}
              summary={() => (
                <Table.Summary.Row>
                  {columns.map((col, index) => (
                    <Table.Summary.Cell key={index}>
                      {col.key === 'preco' && totalPreco !== null && (
                        <strong>Total Preço: {totalPreco}</strong>
                      )}
                      {col.key === 'quantidade' && totalQuantidade !== null && (
                        <strong>Total Quantidade: {totalQuantidade}</strong>
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

export default Page1;
