const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');

const code = `
let AbstractAPIHandler = require('AbstractAPIHandler');
class MyAPIHandler extends AbstractAPIHandler {
   execute(request){
     var data = request.data;
     console.log(data)
     var detailData = data.SalesReceiptDetailLeafList;
     var detailObject = detailData.map(item => {
      return {
        id: item.id,
        lineclose:'Y',
        _status:"Update"
      }
    });
    var object = {id:data.id, revstatus:"2","SalesReceiptLeaf":detailObject};
    var res = ObjectStore.updateById("AT1CD07E460F280004.AT1CD07E460F280004.SalesReceiptLeaf",object,"salespreorder");
     
     return {data: 'success'};
 }
}
let body = {key:"value"}; 
let header = {key:"value"}; 
let apiResponse = apiman("get", "https://api.yonyoucloud.com/apis/dst/currencyservice/waihuilist?code=CNY",JSON.stringify(header),JSON.stringify(body));

exports({"entryPoint":MyAPIHandler});
`;

const ast = parser.parse(code, { sourceType: 'module' });

const variableMapping = {
  'AbstractAPIHandler': 'BaseAPIHandler',
  'MyAPIHandler': 'CustomAPIHandler',
  'execute': 'run',
  'data': 'requestData',
  'SalesReceiptDetailLeafList': 'detailsList',
  'SalesReceiptLeaf': 'receiptLeaf'
};

const updateIdentifiers = (ast, mappings) => {
  traverse(ast, {
    Identifier(path) {
      const newName = mappings[path.node.name];
      if (newName) {
        path.node.name = newName;
      }
    }
  });
};

updateIdentifiers(ast, variableMapping);

const outputCode = generator(ast, {}, code).code;
console.log(outputCode);
