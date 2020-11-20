// import Vue from 'vue';
import Vuex from 'vuex';
import commonGetters from './getters';
import commonState from './state';
import commonMutations from './mutations';
import commonActions from './actions';

Vue.use(Vuex);

// 合并公共store和私有store。如果命名重复，公共会覆盖私有
export default function ({state, getters, mutations, actions}) {
	return new Vuex.Store({
		state: {
			...state,
			...commonState
		},
		getters: {
			...getters,
			...commonGetters
		},
		mutations: {
			...mutations,
			...commonMutations
		},
		actions: {
			...actions,
			...commonActions
		}
	});
};
