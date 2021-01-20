import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import { currency } from '@/currency'

Vue.config.productionTip = false

Vue.filter('currency', currency)

/**
 * Vuex provide an mechanism to inject the store into all
 * components from the root instance,
 * using the store option.
 *
 * all we have to do is to import the store once and pass it as an option
 *
 * the global store is now available under -- this.$store --
 */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
