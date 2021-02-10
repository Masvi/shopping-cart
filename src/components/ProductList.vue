 <template>
  <div>
    <h1>Product List</h1>
    <h3 v-if="loading">carregando...</h3>
    <ul v-else>
      <li
        v-for="product in products"
        :key="product.id"
      >
        {{ product.title }} - {{ product.price | currency }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      products: state => state.products
    }),
    ...mapGetters({
      productIsInStock: 'productIsInStock'
    })
  },
  created() {
    this.loading = true
    this.fetchProducts().then(() => this.loading = false)
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
    })
  }
}
</script>

<style>

</style>
