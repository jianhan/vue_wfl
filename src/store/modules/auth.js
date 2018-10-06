import * as mutationTypes from '../mutation-types';
import Vue from 'vue';
import axios from 'axios';
import * as envs from '../../.env'

export const initialState = {
  user: undefined,
  authError: '',
  showAuthDialog: false,
};

// getters
const getters = {
  isUserLoggedIn(state) {
    const { user, authError } = state;
    if (user && authError === '') {
      return true;
    }

    return false;
  },
};

// actions
const actions = {
  getProfile({ commit, state }) {
    axios.get(`${envs.API}users/profile`).then((r) => {
      console.log(r);
    }).catch((e) => {
      console.log(e);
    });
  },
};

// mutations
const mutations = {
  [mutationTypes.USER_LOGGED_IN](state, payload) {
    Vue.set(state, 'authError', '');
    Vue.set(state, 'user', payload);
    Vue.set(state, 'showAuthDialog', false);
    Vue.set(state, 'isLoading', false);
  },
  [mutationTypes.ERROR_ON_LOGIN](state, payload) {
    Vue.set(state, 'authError', payload);
    Vue.set(state, 'user', undefined);
    Vue.set(state, 'showAuthDialog', false);
    Vue.set(state, 'isLoading', false);
  },
  [mutationTypes.USER_LOGGED_OUT](state) {
    Vue.set(state, 'authError', '');
    Vue.set(state, 'user', undefined);
    Vue.set(state, 'showAuthDialog', false);
    Vue.set(state, 'isLoading', false);
  },
  [mutationTypes.SHOW_AUTH_DIALOG](state) {
    Vue.set(state, 'showAuthDialog', true);
  },
  [mutationTypes.HIDE_AUTH_DIALOG](state) {
    Vue.set(state, 'showAuthDialog', false);
  },
  [mutationTypes.SET_AUTH_ERROR](state, payload) {
    Vue.set(state, 'authError', payload);
  },
  [mutationTypes.CLEAR_AUTH_ERROR](state) {
    Vue.set(state, 'authError', '');
  },
  [mutationTypes.SET_AUTH_LOADING](state, payload) {
    Vue.set(state, 'isLoading', payload);
  },
};

export default {
  namespaced: true,
  initialState,
  getters,
  actions,
  mutations,
};
