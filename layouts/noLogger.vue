<template>
  <div>
    <PageLoading />
    <v-main class="v-main__content">
      <Nuxt />
    </v-main>
  </div>
</template>

<script>
import PageLoading from '../components/PageLoading.vue'
export default {
  name: 'NoLogger',
  components: {
    PageLoading,
  },
}
</script>

<style lang="scss">
html {
  overflow-y: hidden;
}
.v-main {
  background-color: $color_rich_black_FOGRA_29;

  &__content {
    .v-main__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
    }
  }
}
</style>
