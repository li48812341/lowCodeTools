export const localData = [{
    funName: 'time',
    funInfo: {
        type: 'select',
        params: {
            'header': 'header',
            'body': 'body'
        }
    },
    excuteFun: 'time',
}, {
    funName: 'request',
    funInfo: {
        type: 'input',
        params: {
            'request': 'header11',
            'requestbody': 'body111'
        }
    },
    excuteFun: 'time',
}]

export const localData1 = [{
    funName: 'time',
    funInfo: [{
        type: 'select',
        params: {
            name: 'header',
            value: 'header',
        },
    },
    {
        type: 'input',
        params: {
            name: 'header',
            value: 'header',
        },
    }
    ]
}, {
    funName: 'request',
    funInfo: [{
        type: 'select',
        params: {
            name: 'header',
            value: 'header',
        },
    },
    {
        type: 'input',
        params: {
            name: 'header',
            value: 'header',
        },
    }
    ]
}]