import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
      store: {
        // stores globally the logged user info
        displayName: ""
      },
    },
    plugins: [createPersistedState()], // makes vuex to be saved locally
    mutations: {
        SET_USER(state, obj) {
            state.store = obj;
        },
        REMOVE_USER(state) {
        // emptys credentials on logout
            state.store.displayName = ''
        },
    },
    actions: {},
    modules: {}
  });