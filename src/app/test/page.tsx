"use client"
import { useState, ChangeEvent, FormEvent ,useEffect} from 'react';
import { Select, MenuItem, TextField, Button, Container, Grid } from '@mui/material';
import MonacoEditor from "../../component/MonacoEditor/MonacoEditor";
import { localData ,localData1} from "../../utils/localData"
import { generateYonyou } from "../../component/funcComponent/requestFun";

// import { getGeneraFunNode } from "../../utils/getGenerationFun";

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

    // 处理 TextField 的输入变化
    const handleInputChange = (key) => (event) => {
        console.log("key", key)
        console.log("event", event)
        setFormData((prevData) => ({
            ...prevData,
            [key]: event.target.value, // 根据 key 更新相应的输入值
        }));
    };
    const handleParamSubmit = () => {
        console.log("paramSubmit", formData)
    }
    const handleGenerateCode = () => {
        // const generatedCode = `const formData = ${JSON.stringify(formData, null, 2)};`;
        // setCode(generatedCode);
        console.log("formData", formData)
        const params = Object.entries(formData).map(([key, value]) => {
            return { key, value };
        });

        console.log("params", params)
        const dealParams = params.map(item => {
            return {
                // [item.key]: eval('(' + item.value + ')')
                [item.key]:  item.value 
            }
        }
        )
        console.log("dealParams", dealParams)
    // // 默认生成的代码
    const result = generateYonyou(...dealParams); // 传递参数数组
        // const result = generateYonyou(...params);
        console.log("result", result)
        setCode(result)
    }
    // 动态根据函数生成对应ast转化函数
    // const resultNode = getGeneraFunNode(selectedFun) as any;
    // console.log("resultNode",resultNode);
    // debugger

    // const astResult = resultNode(...dealParams)
    // console.log("result", astResult)
    //     setCode(astResult)
    // }
    

    
    // 处理编辑器内容变化的函数
  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  // 重置编辑器内容
  const handleRssetCode = () => {
    handleEditorChange("")
    setCode(""); // 将编辑器值设置为空字符串，清空内容
  };
    // 查找选中的功能信息
    const selectedFunInfo = localData.find(item => item.funName === selectedFun)?.funInfo;

    useEffect(() => {
        console.log("selectedFunInfo", selectedFunInfo)
        const aaa = selectedFun
        console.log("aaa", aaa)
        // setGenerateFunNode(selectedFun)
    },[selectedFunInfo])

    // 根据选中的功能信息渲染表单
    const renderForm = () => {
        if (!selectedFunInfo) return <div>请选择要使用的函数</div>;
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
        <Container className='min-h-screen'>
            <Grid container spacing={2} className='min-h-80'>
                <Grid item xs={12} md={4} className='border-solid border-2 border-neutral-300 px-2 py-2'>
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
                        className="mt-4 mr-4"
                        onClick={handleGenerateCode}
                    >
                        生成函数
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="mt-4"
                        onClick={handleRssetCode} 
                    >
                        重置
                    </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    <MonacoEditor
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue="// type your code..."
                        onChange={handleEditorChange}
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