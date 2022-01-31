<template>
  <div v-if="loading" class="pageloading">
    <h2 class="pageloading__title">Carregando...</h2>
  </div>
</template>
<script>
export default {
  name: 'PageLoading',
  data: () => ({
    loading: true,
  }),
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.loading = false
      }, 1500)
    })
  },
}
</script>

<style lang="scss" scoped>
.pageloading {
  background-color: $color_mikado_yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  &__title {
    color: $color_oxford_blue;
    font-size: 24px;
    font-weight: normal;

    @media (min-width: 768px) {
      font-size: 80px;
    }
  }
}
</style>
