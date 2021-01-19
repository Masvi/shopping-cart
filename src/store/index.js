/**
 * VUEX
 *
 * is a state management library for vue applications. It servers
 * as a centralized data store for all components in an application
 * in addition (além disso), it enforces rules to ensure that we interact
 * with the state in a predictable fashion
 */

import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

/**
 * to betther understand the store you can compare it with a Vue instance
*/
export default new Vuex.Store({

  state: { // = data
    products: [],
    cart: []
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
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0)
    }
  },

  /**
   * Actions
   *
   * When we need to fech some data from an api we would create an action for it.
   * Vuex automatically passes the - CONTEXT object - as the first parameter to all actions
   * The context object exposes the same set of methods and properties as the store object
   *
   * This means that we can use :
   *  -> context.commit to commit an mutation
   *  -> context.state to access the state, and so on (assim por diante)
   *
   * Actions are also responsible for the logic of when mutations shold be fired (disparada)
   *
   * Ex: when a user adds a product to the cart we would call an action
   */
  actions: { // = methods
    fetchProducts ({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },

    addProductToCart (context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id)

        // adds to cart or increment the quantaity of the item on the cart
        if (!cartItem) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', cartItem)
        }
        // remove one item of the inventory
        context.commit('decrementProductInventory', product)
      }
    }
  },

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
    setProducts (state, products) {
      state.products = products
    },
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})
