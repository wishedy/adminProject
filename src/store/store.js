import  Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex);
import state from './state.js';
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import module001 from './001/index';
import module002 from './002/index';
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        module001,
        module002
    }
});
