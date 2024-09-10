import generate from '@babel/generator';
import * as t from '@babel/types';

// 生成具有可选 `id` 属性的 `Test` 接口
export const generateInterface = () => {
    // 创建 `id` 属性签名
    const idPropertySignature = t.tsPropertySignature(
        t.identifier('id'),
        t.tsTypeAnnotation(t.tsNumberKeyword())
    );
    idPropertySignature.optional = true;  // 将 `id` 标记为可选属性

    // 创建 `Test` 接口体
    const interfaceBody = t.tsInterfaceBody([idPropertySignature]);

    // 声明 `Test` 接口
    const tsInterfaceDeclaration = t.tsInterfaceDeclaration(
        t.identifier('Test'),
        null,
        [],
        interfaceBody
    );

    // 从 AST 节点生成代码
    return generate(tsInterfaceDeclaration).code;
}

// 生成符合 `Test` 接口的对象
export const generateBody = () => {
    // 创建一个实现 `Test` 接口的对象
    const objectExpression = t.objectExpression([
        t.objectProperty(t.identifier('id'), t.numericLiteral(0)),
    ]);

    // 为该对象创建变量声明
    const body = t.variableDeclaration('const', [
        t.variableDeclarator(
            t.identifier('test'),
            objectExpression
        ),
    ]);

    // 从 AST 节点生成代码
    return generate(body).code;
}
