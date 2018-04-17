const tab2Actions = {
  tab2ShowDialog:(v)=>{
      const commit = v.commit;
      commit('tab2ShowDialog');
  },
    tab2HideDialog:(v)=>{
        const commit = v.commit;
        commit('tab2HideDialog');
    }
};
export default tab2Actions;
