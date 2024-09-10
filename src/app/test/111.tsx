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
  
  // 查找选中的功能信息
  const selectedFunInfo = localData.find(item => item.funName === selectedFun)?.funInfo;

  // 根据选中的功能信息渲染表单
  const renderForm = () => {
    if (!selectedFunInfo) return <div>请选择功能</div>;

    switch (selectedFunInfo.type) {
      case 'select':
        return (
          <div>
            {Object.entries(selectedFunInfo.params).map(([key, value]) => (
              <TextField
                key={key}
                label={value}
                fullWidth
                margin="normal"
              />
            ))}
            <Button variant="contained" color="primary">提交</Button>
          </div>
        );
      default:
        return <div>未知表单类型</div>;
    }
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
