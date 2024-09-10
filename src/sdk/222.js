import { parse } from '@babel/parser';
import generate from '@babel/generator';

const code = `const x = 42;`;
const ast = parse(code, { sourceType: 'module' });

console.log(ast);

const output = generate(ast, {}, code);
console.log(output.code);
