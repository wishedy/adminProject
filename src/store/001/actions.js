const actions  = {
    changeFormInline:({commit,state},data)=>{
        commit('changeFormInline',data);
    },
    getList:({commit,state})=>{
        commit('getList');
    },
    handleCurrentChange:({commit,state})=>{
        commit("handleCurrentChange");
    },
    handleSizeChange:({commit,state})=>{
        commit("handleSizeChange");
    },
    tableCurrentChange:({commit,state},data)=>{
        commit("tableCurrentChange");
    },
    hideLayer:({commit,state})=>{
        commit("hideLayer");
    },
    showLayer:({commit,state})=>{
        commit("showLayer");

    },
    createColumn:({commit,state},data)=>{
        commit("createColumn",data);
    },
    hideMsg:({commit,state})=>{
        commit("hideMsg");
    }
};
export default actions;
