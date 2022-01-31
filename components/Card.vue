<template>
  <div class="card">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  background-color: #f4f4f4;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 025);
  margin-bottom: 8px;

  h3 {
    font-size: 16px;
    color: $color_rich_black_FOGRA_29;
  }
}
</style>
