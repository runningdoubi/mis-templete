import Vue from 'vue';
import Vuex from 'vuex';

// 根vuex
import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
// 模块vuex
import app from './modules/app.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        app
    }
});
