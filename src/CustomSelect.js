import React, { useState } from 'react';
import { Select } from 'antd';
import { data1, data2, data3, data4, data5 } from './data/data';
import Page1 from './page/Page1'
import Page2 from './page/Page2'


const { Option } = Select;

const CustomSelect = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className='content'>

      <h2>Escolha uma opção:</h2>
      <Select
        style={{ width: 200 }}
        placeholder="Selecione uma opção"
        onChange={handleChange}
      >
        <Option value="option1">Dados 1</Option>
        <Option value="option2">Dados 2</Option>
        <Option value="option3">Dados 3</Option>
        <Option value="option4">Dados 4</Option>
        <Option value="option5">Dados 5</Option>
      </Select>
      {selectedValue === "option1" && (
        <div style={{ marginTop: 20 }}>
          <Page1 data={data1} />
        </div>
      )}
      {selectedValue === "option2" && (
        <div style={{ marginTop: 20 }}>
          <Page2 data={data2} />
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
