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
        <button @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('fetchProducts')
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    addProductToCart (product) {
      this.$store.dispatch('addProductToCart', product)
    }
  }
}
</script>

<style>

</style>
