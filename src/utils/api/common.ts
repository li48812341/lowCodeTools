import apiClient from '../axios';

const getAllList = (pageSize, pageNumber) =>
apiClient.get('/assistants', {
        params: {
            pageSize: pageSize,
            pageNum: pageNumber
        }
    })