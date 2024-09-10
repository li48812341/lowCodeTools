import * as t from '@babel/types';
import generate from '@babel/generator';

const isPlainObjectByStrDeclaration = t.functionDeclaration(
    t.identifier('isPlainObjectByStr'),
    [t.identifier('str')],
    t.blockStatement([...])
);

const parseObjDeclaration = t.variableDeclaration('const', [
    t.variableDeclarator(
        t.identifier('obj'),
        t.callExpression(t.identifier('JSON.parse'), [t.identifier('str')])
    )
]);


const filteredValuesDeclaration = t.functionDeclaration(
    t.identifier('filteredValues'),
    [t.identifier('str')],
    t.blockStatement([
        t.ifStatement(
            t.unaryExpression('!', t.callExpression(t.identifier('isPlainObject'), [t.identifier('str')])),
            t.blockStatement([
                t.variableDeclaration('const', [
                    t.variableDeclarator(t.identifier('regex'), t.regExpLiteral('{([^}]+)}', 'g'))
                ]),
                t.variableDeclaration('const', [
                    t.variableDeclarator(
                        t.identifier('matches'),
                        t.callExpression(t.memberExpression(t.identifier('str'), t.identifier('match')), [
                            t.identifier('regex')
                        ])
                    )
                ]),
                t.returnStatement(t.identifier('matches'))
            ]),
            t.blockStatement([
                t.returnStatement(t.identifier('str'))
            ])
        )
    ])
);

const isPlainObjectByStrDeclaration = t.functionDeclaration(
    t.identifier('isPlainObjectByStr'),
    [t.identifier('str')],
    t.blockStatement([
        t.variableDeclaration('const', [
            t.variableDeclarator(
                t.identifier('obj'),
                t.callExpression(t.identifier('JSON.parse'), [t.identifier('str')])
            )
        ]),
        t.ifStatement(
            t.callExpression(t.memberExpression(t.identifier('_'), t.identifier('isPlainObject')), [
                t.identifier('obj')
            ]),
            t.blockStatement([
                t.variableDeclaration('const', [
                    t.variableDeclarator(
                        t.identifier('filteredObj'),
                        t.callExpression(t.memberExpression(t.identifier('_'), t.identifier('pickBy')), [
                            t.identifier('obj'),
                            t.identifier('isPlainObject')
                        ])
                    )
                ]),
                t.returnStatement(t.identifier('filteredObj'))
            ]),
            t.blockStatement([
                t.returnStatement(t.nullLiteral())
            ])
        )
    ])
);

const exportFilteredValues = t.exportNamedDeclaration(filteredValuesDeclaration, []);
const exportIsPlainObjectByStr = t.exportNamedDeclaration(isPlainObjectByStrDeclaration, []);

const programBody = [
    exportFilteredValues,
    exportIsPlainObjectByStr
];

const generatedAst = t.program(programBody);

const code = generate(generatedAst).code;
console.log(code);
