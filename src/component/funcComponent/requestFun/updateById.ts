// const fs = require('fs');
// const path = require('path');
import generate from "@babel/generator";
import * as t from "@babel/types";

interface IDynamicPassingObj {
    [key: string]: string | number | Date | boolean | IDynamicPassingObj;
}

//dynamicObject may be nested obj
const generateDynamicPassingObj = (dynamicObject: IDynamicPassingObj) => {
    const objectProperties = [];

    for (const key in dynamicObject) {
        if (dynamicObject.hasOwnProperty(key)) {
            const value = dynamicObject[key];

            if (typeof value === 'string') {
                objectProperties.push(t.objectProperty(t.identifier(key), t.stringLiteral(value)));
            } else if (typeof value === 'number') {
                objectProperties.push(t.objectProperty(t.identifier(key), t.numericLiteral(value)));
            } else if (typeof value === 'boolean') {
                objectProperties.push(t.objectProperty(t.identifier(key), t.booleanLiteral(value)));
            } else if (value instanceof Date) {
                objectProperties.push(t.objectProperty(t.identifier(key), t.stringLiteral(value.toISOString())));
            } else if (typeof value === 'object' && value !== null) {
                // 递归处理嵌套对象
                const nestedProperties = generateDynamicPassingObj(value as IDynamicPassingObj);
                objectProperties.push(t.objectProperty(t.identifier(key), t.objectExpression(nestedProperties)));
            } else {
                // 默认处理为 null 或 undefined
                objectProperties.push(t.objectProperty(t.identifier(key), t.nullLiteral()));
            }
        }
    }

    return objectProperties;
};

export const updateById = (
    dynamicHeaderObject: IDynamicPassingObj,
    dynamicBodyObject: IDynamicPassingObj,
    apiUrl?: string
) => {
    //constructing the AST from the object


    // Construct let body = object
    const bodyVariableDeclaration = t.variableDeclaration("let", [
        t.variableDeclarator(
            t.identifier("body"),
            t.objectExpression(generateDynamicPassingObj(dynamicBodyObject))
        ),
    ]);

    // Construct let header = object (修复命名重复问题)
    const headerVariableDeclaration = t.variableDeclaration("let", [
        t.variableDeclarator(
            t.identifier("header"),
            t.objectExpression(
                generateDynamicPassingObj(dynamicHeaderObject)
            )
        ),
    ]);
    // let apiResponse = apiman("get", "URL",JSON.stringify(header),JSON.stringify(body));
    const apimanCall = t.callExpression(t.identifier("apiman"), [
        t.stringLiteral("get"),
        t.stringLiteral(apiUrl),
        t.callExpression(
            t.memberExpression(t.identifier("JSON"), t.identifier("stringify")),
            [t.identifier("header")]
        ),
        t.callExpression(
            t.memberExpression(t.identifier("JSON"), t.identifier("stringify")),
            [t.identifier("body")]
        ),
    ]);

    const apiResponseVariableDeclaration = t.variableDeclaration("let", [
        t.variableDeclarator(t.identifier("apiResponse"), apimanCall),
    ]);

    // let AbstractAPIHandler = require('AbstractAPIHandler');
    const abstractAPIHandlerDeclaration = t.variableDeclaration('let', [
        t.variableDeclarator(
            t.identifier('AbstractAPIHandler'),
            t.callExpression(t.identifier('require'), [
                t.stringLiteral('AbstractAPIHandler')
            ])
        )
    ]);

    //  class MyAPIHandler extends AbstractAPIHandler {

    const classDeclaration = t.classDeclaration(
        t.identifier('MyAPIHandler'),
        t.identifier('AbstractAPIHandler'),
        t.classBody([
            //  execute(request){
            t.classMethod('method',
                t.identifier('execute'),
                [t.identifier('request')],
                t.blockStatement([
                    headerVariableDeclaration,
                    bodyVariableDeclaration,
                    apiResponseVariableDeclaration,
                    //if (apiResponse.resultCode === 200) {
                    t.ifStatement(
                        t.binaryExpression(
                            "===",
                            t.memberExpression(t.identifier("apiResponse"), t.identifier("resultCode")),
                            t.numericLiteral(200)
                        ),
                        t.blockStatement([
                            //    var res = ObjectStore.updateById("AT1CD07E460F280004.AT1CD07E460F280004.SalesReceiptLeaf",object,"salespreorder");
                            t.variableDeclaration("const", [
                                t.variableDeclarator(
                                  t.identifier("object"),
                                  t.memberExpression(t.identifier("apiResponse"), t.identifier("data"))
                                )
                              ]),
                            t.variableDeclaration('var',
                                [
                                    t.variableDeclarator(
                                        t.identifier('res'),
                                        t.callExpression(
                                            t.memberExpression(
                                                t.identifier('ObjectStore'),
                                                t.identifier('updateById')
                                            ),
                                            [
                                                //替换
                                                t.stringLiteral('AT1CD07E460F280004.AT1CD07E460F280004.SalesReceiptLeaf'),
                                                t.identifier('object'),
                                                t.stringLiteral('salespreorder')
                                            ]
                                        )
                                    )
                                ]
                            ),
                            t.returnStatement(
                                t.objectExpression([
                                    t.objectProperty(
                                        t.identifier('data'),                //  'data'
                                        t.stringLiteral('success')           //  'success'
                                    )
                                ])
                            )
                        ])
                    )

                    ,
                    //return {data: 'success'}
                    t.returnStatement(
                        t.objectExpression([
                            t.objectProperty(
                                t.identifier('data'),                //  'data'
                                t.stringLiteral('failed')           //  'success'
                            )
                        ])
                    )
                ])
            )
        ])
    )

    const generatedAst = t.program([
        abstractAPIHandlerDeclaration,
        classDeclaration
    ]);
    const code = generate(generatedAst, {
        compact: false,   // 生成非压缩的代码
    }).code;
    //   console.log(JSON.stringify(generatedAst, null, 2));

    return code;
};

