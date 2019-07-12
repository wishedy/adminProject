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
    triggerTableNum(state){
      return state.triggerTableNum;
    },
    dialogVisible(state){
        return state.dialogVisible;
    },
    columnList(state){
      return state.columnList;
    },
    addMessage(state){
        return state.addMessage;
    },
    iconList(state){
        return state.iconList;
    },
    editType(state){
        return state.editType;
    },
    selectTableData(state){
        return state.selectTableData;
    },
    sortOnOff(state){
        return state.sortOnOff;
    }
};
export default  getters;
