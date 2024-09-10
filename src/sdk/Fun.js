// // 创建EventSource对象
// const eventSource = new EventSource('http://localhost:8080/events');
// // 监听服务器发送的事件
// eventSource.onmessage = function(event) {
//   console.log('收到消息：', event.data);
// };
// // 监听服务器关闭连接的事件
// eventSource.onclose = function() {
//   console.log('连接已关闭');
// };
// // 监听服务器错误事件
// eventSource.onerror = function() {
//   console.log('连接出错');
// };

// 创建 WebSocket 连接
const socket = new WebSocket('wss://localhost:8080');

// 连接成功打开时的处理
socket.onopen = function (event) {
    console.log('WebSocket 连接已打开');
    // 发送一条消息到服务器
    socket.send('halo啊哈哈哈哈哈哈(*´▽｀)ノノ!');
};

// 接收到消息时的处理
socket.onmessage = function (event) {
    // 处理接收到的消息
    const message = event.data;
    console.log('接收到消息咯O(∩_∩)O:', message);
};

// 连接关闭时的处理
socket.onclose = function (event) {
    console.log('啊喔…… WebSocket连接已关闭(｀・ω・´)');
};

// 连接发生错误时的处理
socket.onerror = function (error) {
    console.error('WebSocket发生错误啦:', error);
};
// 请求后台接口，获取数据
viewModel.getGridModel().on('afterSetDataSource', function (data) {
    debugger;
    // const arrData = [

    //     {
    //         "deviceName": "5553",
    //         "deviceId": "5552"
    //     },
    //     {
    //         "tenant_id": "g2sfl7vv",
    //         "id": "2080829535394201606",
    //         "pubts": "2024-09-04 17:00:41",
    //         "deviceName": "66",
    //         "deviceId": "99",
    //         "_id": "rowId_3"
    //     }]

    // data = arrData;

    // return data
    // var gridModel = viewModel.getGridModel();
    // gridModel.setState('dataSourceMode', 'local');
    // gridModel.setDataSource([
    //     {
    //         tenant_id: 'g2sfl7vv',
    //         id: '2080829535394201606',
    //         pubts: '2024-09-04 17:00:41',
    //         deviceId: '5552',
    //         deviceName: '5553'
    //     }
    // ]);
    // gridModel.setState('dataSourceMode', 'remote');
    var proxy = viewModel.setProxy({
        ensure: {
            url: "http://36.133.62.220:30080/gateway/openvedio/api/device/list? appId=c753021f30504486992fe3c74a499dda&&domainkey devel opl atform",
            method: "POST",
            options: {//选填，如果不传，则自动创建
                domainKey: viewModel.getParams().domainKey //如果不传，则系统自动添加 cb.utils.getActiveDomainKey()
            }
        }
    })
    //拼接接口入参
    var params = {
        "page": 1,
        "pagesize": 10
    }

    //调用接口后执行的操作
    proxy.ensure(params, function (err, result) {
        if (result) {
            cb.utils.alert(err, 'error');

            return;

        } else {
            //给卡片页设需数据
            var gridModel = viewModel.getGridModel();
            gridModel.setstate('datasourceMode', "local");
            gridModel.setDataSource(result.recordList)
            gridModel.setState("dataSourceMode", "remote")
            return false
        }
    }

    )
});


viewModel.getGridModel().on('beforeSetDataSource', function (data) {

    // var gridModel = viewModel.getGridModel();

    //   gridModel.setState('dataSourceMode', 'local');
    // data.push(

    // {   "deviceName": "5553",
    //     "deviceId": "5552"
    // },
    // {
    //     "deviceName": "66",
    //     "deviceId": "99"
    // });
    const arrData = [

        {
            "deviceName": "测试",
            "deviceId": "id000"
        },
        {

            "deviceName": "测试name",
            "deviceId": "99",
        }]
    const testData = []
    data.push(...arrData)
    console.log(testData)
    // data.push(

    //       {   "deviceName": "原始",
    //           "deviceId": "00000"
    //       },
    //       {

    //           "deviceName": "66",
    //           "deviceId": "999",
    //       });
    console.log(data);
    // return testData;
});

//弹出回复框---------------------------------------------功能一  begin
var id = viewModel.get('id').getValue();
var currentState = viewModel.getParams().mode;
if ('edit' == currentState) {
    viewModel.communication({
        type: 'modal',
        payload: {
            mode: 'inner',
            groupCode: 'form24yd',   //模态框容器编码
            viewModel: viewModel
        }
    });
}