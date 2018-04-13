const mutations = {
    toggleSide(state,data){
        state.toggleOnOff = !state.toggleOnOff;
    },
    addTab(state,data){
        let nowData = (state.nowTabData.length)?JSON.parse(state.nowTabData):{};
        if(!nowData[data.routerLink]){
            nowData[data.routerLink] = data;
        }
        state.nowTabData = JSON.stringify(nowData);
        // console.log(state.nowTabData)
    },
    deleteTab(state,data){
        let nowData = (state.nowTabData.length)?JSON.parse(state.nowTabData):{};
        delete  nowData[data.routerLink];
        state.nowTabData = JSON.stringify(nowData);
    },
    ContextOn(state){
        state.Context = true;
    },
    ContextOff(state){
        state.Context = false;
    }
};
export default  mutations;
