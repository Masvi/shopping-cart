/**
 * VUEX
 *
 * is a state management pattern library for vue applications. It servers
 * as a centralized data store for all components in an application
 * in addition (além disso), it enforces rules to ensure that we interact
 * with the state in a predictable fashion
 */

import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'

import cart from './modules/cart'
import product from './modules/product'

Vue.use(Vuex)

/**
 * to betther understand the store you can compare it with a Vue instance
*/
export default new Vuex.Store({

  modules: {
    cart,
    product
  },

  state: { // = data
    products: []
  },

  /**
   * GETTERS
   *
   * You can think of getters as computed properties. Getters are perfect when we
   * need to filter or calculate somenthing on runtime.
   *
   * Ex: want to show the products that are not sold out.
   * Or calculate the shopping cart total
   */
  getters: { // = computed properties

  },

  /**
   * Actions
   */
  actions,


  /**
   * MUTATIONS
   *
   * Mutations are responsible for setting and updating the state
   * Mutations should be as simple as possible and only responsible for
   * updating just a piece of the state, on the other hand, actions can
   * be complex but never update the state.
   *
   * if you follow this pattern it is very likely (muito provável) to have less
   * bugs in your code
   */
  mutations: {

  },
})
