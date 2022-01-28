<template>
  <div class="text-center">
    <v-btn dark color="orange darken-2" class="d-none"> Open Snackbar </v-btn>
    <v-snackbar :value="handleclick" :timeout="timeout" :multi-line="multiLine">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
    handleclick: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data: () => ({
    multiLine: true,
    timeout: 4000,
  }),
}
</script>

<style lang="scss">
.d-none {
  display: none !important;
}
.v-snack {
  &__wrapper {
    &.theme {
      &--dark {
        background-color: $color_gold_web_golden;
        color: $color_oxford_blue;
      }
    }
  }
}
</style>
