 <template>
  <div>
    <h1>Product List</h1>
    <h3 v-if="loading">carregando...</h3>
    <ul v-else>
      <li
        v-for="product in products"
        :key="product.id"
      >
        {{ product.title }} - {{ product.price }}
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
  }
}
</script>

<style>

</style>
