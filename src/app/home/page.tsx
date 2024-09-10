"use client"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import generate from '@babel/generator';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { generateBody, generateInterface } from "../../sdk/babel";
import { generateYonyou } from "../../sdk/script/babel";
import { parse } from '@babel/parser';
import generate from '@babel/generator';

function Generate() {

  // const params = {

  // }
  const res = generateYonyou({"aaa":"value"},{"sss":"value"},"key")

console.log(res);

  // const code = `let body = {key:"value"}; 
  //   let header = {key:"value"}; 
  //   let apiResponse = apiman("get", "https://api.yonyoucloud.com/apis/dst/currencyservice/waihuilist?code=CNY",JSON.stringify(header),JSON.stringify(body));`;

  // ast转化test
  const code = `const x = 42;`;
  const ast = parse(code, { sourceType: 'module' });
  console.log(ast);
  ast.program.body[0].declarations[0].init.value = 100;
  const output = generate(ast, {}, code);
  console.log(output.code);


  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')

  const inputChangeHandler = (e: { target: { value: any; }; }) => {
    console.log(e)
    console.log(e.target.value)
    const result = e.target.value
    setInputValue(result)
  }
  // generate code
  const handleGenerate = () => {
    console.log('generate')
    console.log(inputValue)
    // axios.post('http://36.133.62.220:30080/gateway/openVedio/api/device/list?appId=c753a21f3a504486992fe3c74a499dda',
    //   {
    //     "page": 1,
    //     "pageSize": 10
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     setOutputValue(response.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
  return <div>
    <div className="flex111 justify-between">
      <div >
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          input
          <TextField
            id="outlined-multiline-flexible"
            label="input"
            multiline
            maxRows={4}
            onChange={inputChangeHandler}
          />
        </Box>
      </div>
      <div>
        output
        <TextField id="outlined-multiline-flexible"
          label="output"
          multiline
          maxRows={4} />
      </div>
    </div>

    <div>
      <Button variant="outlined" onClick={handleGenerate}>generate</Button>
      <Button variant="outlined" onClick={handleGenerate}>reset</Button>
    </div>
  </div>
}

export default Generate