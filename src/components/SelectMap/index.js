import React from 'react';
import { Select } from 'antd';

function SelectMap({ ...props }) {
  const { data = [], fields = [], style = { width: '100%' } } = props;

  const renderOption = () => {
    if (Array.isArray(data)) {
      if (data[0] && typeof data[0] === 'object') {
        return data.map(item => <Select.Option key={item[fields[0]]}>{item[fields[1]]}</Select.Option>);
      }
      return data.map(item => <Select.Option key={item}>{item}</Select.Option>);
    }

    return Object.keys(data).map(item => <Select.Option key={item}>{data[item]}</Select.Option>);
  };

  return (
    <Select {...props} style={style}>
      {renderOption()}
    </Select>
  );
}

export default SelectMap;