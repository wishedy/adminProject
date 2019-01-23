const  getters = {
    formInline(state){
        return state.formInline;
    },
    tableData(state){
        return state.tableData;
    },
    pageIndex(state){
        return state.pageIndex;
    },
    pageSize(state){
        return state.pageSize;
    },
    count(state){
        return state.count;
    },
    dialogVisible(state){
        return state.dialogVisible;
    },
    addMessage(state){
        return state.addMessage;
    },
    iconList(state){
        return state.iconList;
    }
};
export default  getters;
