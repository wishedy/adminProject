import axios from 'axios';
const mutations = {
    changeFormInline(state,data){
        state.formInline = data;
    },
    saveTableList(state,data){
        state.tableData = data.result.list;
        state.count = data.result.total;
    },
    saveIconList(state,list){
        console.log(list,'列表列表列表列表');
      state.iconList = list;
    },
    handleCurrentChange(state,num){
        state.pageIndex = num;
    },
    handleSizeChange(state,num){
        state.pageSize = num;
    },
    triggerTable(state){
      state.triggerTableNum++;
    },
    tableCurrentChange(state,data){
        state.selectTableData = data;
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
    },
    changeEditType(state,type){
        state.editType = type;
    }
};
export default mutations;
