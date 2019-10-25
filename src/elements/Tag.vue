<template>
  <div class="tag">{{ title }}</div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    color: {
      type: String,
      default: $ecru
    }
  }
};
</script>

<style lang="scss">
.tag {
  padding: 0.2em 0.4em;
}
</style>
