import shop from '../../api/shop'

export default {
  namespaced: true,
  state: {
    cart: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts (state, getters, rootState, rootGetters) {
      return state.cart.map(cartItem => {

        const product = rootState.product.items.find(product => product.id === cartItem.id)

        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    },
  },
  mutations: {
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    emptyCart (state) {
      state.cart = []
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },
  },
  actions: {
    addProductToCart ({state, getters, commit, rootState, rootGetters}, product) {
      if (rootGetters['product/productIsInStock'](product)) {

        const cartItem = state.cart.find(item => item.id === product.id)

        // adds to cart or increment the quantaity of the item on the cart
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        // remove one item of the inventory
        commit('product/decrementProductInventory', product, {root:true})
      }
    },
    checkout ({ state, commit }) {
      shop.buyProducts(
        state.cart,
          () => {
            commit('emptyCart')
            commit('setCheckoutStatus', 'success')
          },
          () => {
            commit('setCheckoutStatus', 'failed')
          }
      )
    },
  }
}
