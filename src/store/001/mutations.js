import axios from 'axios';
const mutations = {
    changeFormInline(state,data){
        state.formInline = data;
    },
    getList(state){
        console.log(state.formInline);
        let searchData = JSON.parse(JSON.stringify(state.formInline));
        searchData.pageIndex = state.pageIndex;
        searchData.pageSize = state.pageSize;
        searchData.createDuringTime =JSON.stringify(searchData.createDuringTime);
        searchData.updateDuringTime =JSON.stringify(searchData.updateDuringTime);
        axios.get('/call/column/getList', {
            params: searchData
        })
            .then(function (response) {
                let reqData = response.data;
                if(reqData.responseObject.responseData['data_list']){
                    console.log(reqData.responseObject.responseData['data_list']);
                    state.tableData = reqData.responseObject.responseData['data_list'];
                }
                if(reqData.responseObject.responseData.totalCount){
                    state.count = reqData.responseObject.responseData.totalCount;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    saveIconList(state,list){
        console.log(list,'列表列表列表列表');
      state.iconList = list;
    },
    handleCurrentChange(state){

    },
    handleSizeChange(state){

    },
    tableCurrentChange(state,data){

    },
    hideLayer(state){
        state.dialogVisible = false;
    },
    showLayer(state){
        state.dialogVisible = true;
    },
    createColumn(state,data){
        console.log(data);
        let t = this;
        axios({
            method: 'post',
            url: '/call/column/create',
            transformRequest: [function(data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
                columnTitle:data.columnTitle,
                columnIndex:data.columnIndex,
                columnIcon:data.columnIcon,
                columnRouterName:data.columnRouterName,
                parentColumnId:data.parentColumnId,
                adminId:data.adminId
            }
        }).then(function(response) {
            let reqData = response.data;
            if(reqData.responseObject.responseStatus){
                state.addMessage = true;
                state.dialogVisible = false;
            }
            console.log(response.data);
        });
    },
    hideMsg(state){
        state.addMessage = false;
    }
};
export default mutations;
