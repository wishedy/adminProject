const actions = {
    toggleSide: ({commit, state}) => {
        commit('toggleSide');//toggleSide(commit, state);
    },
    addTab:({commit,state},data)=>{
        //type 0增 1减 2，全删
        commit('addTab',data);
    },
    deleteTab:({commit,state},data)=>{
        commit('deleteTab',data);
    }
};
export default  actions;
