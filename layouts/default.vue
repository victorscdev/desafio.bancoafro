<template>
  <v-app dark>
    <PageLoading />
    <Navigation />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import PageLoading from '../components/PageLoading.vue'

export default {
  name: 'DefaultLayout',
  component: {
    Navigation,
    PageLoading,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style lang="scss" scoped>
.v-main {
  background-color: $color_mikado_yellow;
}
</style>
