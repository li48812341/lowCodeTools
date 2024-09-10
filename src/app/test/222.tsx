import React, { useState } from 'react';
import { Select, MenuItem, TextField, Button, FormControl, InputLabel } from '@mui/material';

// 示例数据
export const localData = [
  {
    funName: 'time',
    funInfo: {
      type: 'select',
      params: {
        'header': 'header',
        'body': 'body'
      }
    },
  },
  {
    funName: 'request',
    funInfo: {
      type: 'select',
      params: {
        'header': 'header',
        'body': 'body'
      }
    },
  }
];

const MyDynamicForm = () => {
  const [selectedFun, setSelectedFun] = useState('');
  const [formData, setFormData] = useState({}); // 用于存储表单输入值

  // 查找选中的功能信息
  const selectedFunInfo = localData.find(item => item.funName === selectedFun)?.funInfo;

  // 处理 TextField 的输入变化
  const handleInputChange = (key) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: event.target.value, // 根据 key 更新相应的输入值
    }));
  };

  // 提交表单时打印数据
  const handleSubmit = () => {
    console.log('提交的表单数据:', formData);
  };

  // 根据选中的功能信息渲染表单
  const renderForm = () => {
    if (!selectedFunInfo) return <div>请选择功能</div>;

    return (
      <div>
        {Object.entries(selectedFunInfo.params).map(([key, value]) => (
          <TextField
            key={key}
            label={value}
            fullWidth
            margin="normal"
            value={formData[key] || ''}  // 绑定状态值
            onChange={handleInputChange(key)}  // 监听输入变化
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          提交
        </Button>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-fun-label">选择功能</InputLabel>
        <Select
          labelId="select-fun-label"
          value={selectedFun}
          onChange={(e) => setSelectedFun(e.target.value)}
        >
          <MenuItem value="">请选择功能</MenuItem>
          {localData.map(item => (
            <MenuItem key={item.funName} value={item.funName}>
              {item.funName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ marginTop: '20px' }}>
        {renderForm()}
      </div>
    </div>
  );
};

export default MyDynamicForm;
