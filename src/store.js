import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment (state) {
			state.count++
		}
	}
})

export function createStore (creator) {
	let store = {
		state: {},
		getters: {},
		mutations: {},
		actions: {}
	}

	function state (name, value) {
		store.state[name] = value
	}

	function getter (name, value) {
		store.getters[name] = value
	}

	function mutation (name, value) {
		store.mutations[name] = value
	}

	function action (name, value) {
		store.actions[name] = value
	}

	creator({ state, getter, mutation, action })

	return new Vuex.Store(store)
}
