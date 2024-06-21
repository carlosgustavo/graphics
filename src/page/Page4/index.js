import React, { useState } from 'react';
import { Table, Select, Divider, Row, Col, Checkbox } from 'antd';
import Chart4 from '../Chart4'; // Importa o componente de gráfico Chart4

const { Option } = Select;

const Page4 = ({ data }) => {
  // Estado para controlar o tipo de gráfico a ser exibido
  const [typeChart, setTypeChart] = useState(false);

  // Estado para controlar quais colunas são visíveis na tabela
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

  // Estado para controlar se os campos de Orcamento e Duracao Meses devem ser somados
  const [sumFields, setSumFields] = useState({
    orcamento: false,
    duracao_meses: false,
  });

  // Estado para controlar se os detalhes devem ser mostrados
  const [showDetails, setShowDetails] = useState(false);

  // Função para lidar com a mudança na Checkbox para mostrar detalhes no gráfico
  const handleShowDetailsChange = (e) => {
    const isChecked = e.target.checked;
    setShowDetails(isChecked);
    setTypeChart(!showDetails); // Alterna o tipo de gráfico entre true e false
  };

  // Função para lidar com a mudança no Select para alterar a visibilidade das colunas
  const handleVisibleChange = (selectedKeys) => {
    const newVisibleColumns = Object.keys(visibleColumns).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key); // Define a visibilidade com base nas colunas selecionadas
      return acc;
    }, {});
    setVisibleColumns(newVisibleColumns); // Atualiza o estado de colunas visíveis
  };

  // Função para lidar com a mudança no Select para somar campos
  const handleSumChange = (selectedKeys) => {
    const newSumFields = Object.keys(sumFields).reduce((acc, key) => {
      acc[key] = selectedKeys.includes(key); // Define quais campos devem ser somados
      return acc;
    }, {});
    setSumFields(newSumFields); // Atualiza o estado de campos para soma
  };

  // Função para calcular a soma de um campo especificado
  const calculateSum = (field) => {
    return data.reduce((acc, record) => acc + (record[field] || 0), 0); // Calcula a soma do campo especificado em todos os registros
  };

  // Definição das colunas da tabela
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

  // Filtra as colunas com base no estado de visibilidade
  const columns = allColumns.filter(column => visibleColumns[column.key]);

  // Calcula o total de orçamento e total de duração_meses para exibir no rodapé da tabela
  const totalOrcamento = sumFields.orcamento ? calculateSum('orcamento') : null;
  const totalDuracaoMeses = sumFields.duracao_meses ? calculateSum('duracao_meses') : null;

  // Prepara os dados para o gráfico (se necessário)
  const chartCategories = data.map(record => record.nome); // Categorias para o gráfico baseadas nos nomes dos projetos
  const chartDataOrcamento = data.map(record => record.orcamento); // Dados de orçamento para o gráfico
  const chartDataDuracaoMeses = data.map(record => record.duracao_meses); // Dados de duração em meses para o gráfico

  return (
    <div>
      {
        !typeChart && ( // Renderiza apenas se typeChart for falso
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
        typeChart ? ( // Renderiza o gráfico se typeChart for verdadeiro
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
            {/* Renderiza a tabela se typeChart for falso */}
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
