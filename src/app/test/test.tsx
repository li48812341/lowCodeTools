"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { Select, MenuItem, TextField, Button, Container, Grid } from '@mui/material';
import MonacoEditor from "../../component/MonacoEditor/MonacoEditor";
import { localData ,localData1} from "../../utils/localData"
import { generateYonyou } from "../../component/funcComponent/requestFun";

type FormData = {
  name?: string;
  email?: string;
  productName?: string;
  price?: string;
};

function Test() {
  const [formType, setFormType] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({});

  const [code, setCode] = useState<string>('');
  const [formList, setFormList] = useState<any>();
  const [localData1, setLocalData1] = useState<any>();
  const [selectedFun, setSelectedFun] = useState('');

console.log("test")
//   const handleFormTypeChange = (event: ChangeEvent<{ value: unknown }>) => {
//     setFormType(event.target.value as string);
//     setFormData({});
//     console.log(event.target.value)
//     debugger
//     setFormList(111)
//   };

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     debugger
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//   };
  // 处理 TextField 的输入变化
   const handleInputChange = (key) => (event) => {
    console.log("key",key)
    console.log("event",event)
    setFormData((prevData) => ({
      ...prevData,
      [key]: event.target.value, // 根据 key 更新相应的输入值
    }));
  };
  const handleParamSubmit = () =>{
    console.log("paramSubmit",formData)
  }
  const handleGenerateCode = () => {
    // const generatedCode = `const formData = ${JSON.stringify(formData, null, 2)};`;
    // setCode(generatedCode);
    console.log("formData",formData)
    const params = Object.entries(formData).map(([key, value]) => {
      return { key, value };
    });

    console.log("params",params)
    const result = generateYonyou(...params);
    console.log("result",result)
    setCode(result)
  }
  const handleSubmit = (event: FormEvent) => {
    
    // event.preventDefault();
    // const generatedCode = `const formData = ${JSON.stringify(formData, null, 2)};`;
    // setCode(generatedCode);
  };

//   const renderForm = () => {
//     switch (formType) {
//       case 'user':
//         return (
//           <>
//             <TextField
//               label="Name"
//               name="name"
//               value={formData.name || ''}
//               onChange={handleInputChange}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={formData.email || ''}
//               onChange={handleInputChange}
//               fullWidth
//               margin="normal"
//             />
//           </>
//         );
//       case 'product':
//         return (
//           <>
//             <TextField
//               label="Product Name"
//               name="productName"
//               value={formData.productName || ''}
//               onChange={handleInputChange}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Price"
//               name="price"
//               value={formData.price || ''}
//               onChange={handleInputChange}
//               fullWidth
//               margin="normal"
//             />
//           </>
//         );
//       default:
//         return null;
//     }
//   };
   // 查找选中的功能信息
   const selectedFunInfo = localData.find(item => item.funName === selectedFun)?.funInfo;

   // 根据选中的功能信息渲染表单
   const renderForm = () => {
     if (!selectedFunInfo) return <div>请选择功能</div>;
    console.log(selectedFunInfo)
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
               value={formData[key] || ''}  // 绑定状态值
               onChange={handleInputChange(key)}  // 监听输入变化
               />
             ))}
             
           </div>
         );
         case 'input':
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
              </div>
            );  
       default:
         return <div>未知表单类型</div>;
     }
   };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Select
            value={formType}
            onChange={(e) => setSelectedFun(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>Select a form type</MenuItem>

            {
                localData.map((item, index) => {

                    return <MenuItem key={item.funName} value={item.funName}>
                        {item.funName}
                    </MenuItem>

                })
            }
          </Select>
          
            {renderForm()}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mt-4 mr-4"
              onClick={handleParamSubmit}
            >
              参数提交
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mt-4"
              onClick={handleGenerateCode}
            >
              生成函数
            </Button>
        </Grid>
        <Grid item xs={12} md={8}>
        <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// type your code..."
            // onChange={handleEditorChange}
            value={code}
            options={{
                selectOnLineNumbers: true,
                minimap: { enabled: false },
                wordWrap: 'on'
            }}
            />

        </Grid>
      </Grid>
    </Container>
  );
}
export default Test