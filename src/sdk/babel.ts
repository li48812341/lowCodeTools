import babelTraverse from '@babel/traverse';
import { parse, ParserPlugin } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';


export const generateInterface = () => {
    // 创建 `id` 属性的 AST 节点
    const idPropertySignature = t.tsPropertySignature(
        t.identifier('id'),
        t.tsTypeAnnotation(t.tsNumberKeyword())
    );
    idPropertySignature.optional = true;  // 设置 `id` 为可选属性

    // 创建 `Test` 接口的 AST 节点
    const interfaceBody = t.tsInterfaceBody([idPropertySignature]);

    const tsInterfaceDeclaration = t.tsInterfaceDeclaration(
        t.identifier('Test'),
        null,
        [],
        interfaceBody
    );
``
    return generate(tsInterfaceDeclaration).code;
}

export const generateBody = () => {
    const body =  t.variableDeclaration('const', [
        t.variableDeclarator(
            t.identifier('test'),
            t.newExpression(t.identifier('Test'), [t.numericLiteral(0)])
        ),
    ]);
    return generate(body).code;
}