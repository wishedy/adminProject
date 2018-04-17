import tab2Actions from './contentActions/tab2Actions';
const actions = {
    toggleSide: ({commit, state}) => {
        commit('toggleSide');//toggleSide(commit, state);
    },
    login:({commit,state},str)=>{
      commit('login',str);
    },
    cancelOutLogin:({commit})=>{
      commit('cancelOutLogin');
    },
    outLoginOne:({commit,state})=>{
        commit('outLoginOne');
    },
    outLogin:({commit,state})=>{
      commit('outLogin');
    },
    addTab:({commit,state},data)=>{
        //type 0增 1减 2，全删
        commit('addTab',data);
    },
    deleteTab:({commit,state},data)=>{
        commit('deleteTab',data);
    },
    ContextOn:({commit,state},data)=>{
        commit('ContextOn');
    },
    ContextOff:({commit,state},data)=>{
        commit('ContextOff');
    }
};
const contentActions = [tab2Actions];
for(let i = 0;i<contentActions.length;i++){
    for(let key in contentActions[i]){
        actions[key] = contentActions[i][key];
    }
}
export default  actions;
