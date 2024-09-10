let AbstractAPIHandler = require('AbstractAPIHandler');
  class MyAPIHandler extends AbstractAPIHandler {
   execute(request){
     //更新主表
     var data = request.data;
     console.log(data)
     //子表待更新数据
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
