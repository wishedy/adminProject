import axios from 'axios';
const mutations = {
    changeFormInline(state,data){
        state.formInline = data;
    },
    saveTableList(state,data){
        state.tableData = data.result;
        state.count = data.result.length;
    },
    saveIconList(state,list){
        console.log(list,'列表列表列表列表');
      state.iconList = list;
    },
    saveColumnList(state,list){
        console.log(list,'列表列表列表列表');
      state.columnList = list;
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
    showSort(state){
      state.sortOnOff = true;
    },
    hideSort(state){
        state.sortOnOff = false;
    },
    tableCurrentChange(state,data){
        state.selectTableData = data;
        console.log(data);
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
        let xhrUrl = parseInt(state.editType,10)===0?'/api/columns/insert':'/api/columns/update';
        axios({
            method: 'post',
            url: xhrUrl,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
                title:data.columnTitle,
                grade:data.columnIndex,
                iconId:data.columnIcon,
                routerName:data.columnRouterName,
                parentColumnId:data.parentColumnId,
                columnIndex:data.columnIndex,
                adminId:data.adminId
            }
        }).then(function(response) {
            let reqData = response.data;
            if(parseInt(reqData.code,10)===200){
                state.addMessage = true;
                state.dialogVisible = false;
                state.triggerTableNum++;
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
