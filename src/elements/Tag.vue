<template>
  <div :class="`tag text-sm tag-${type}`">
    {{ type }}
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data: () => ({}),
  props: {
    type: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.tag {
  padding: 0.05em 0.6em 0.3em;
  border-radius: 3px;
  border: 1px solid transparent;
}
.tag-feature {
  background-color: $olive;
  color: $white;
}
.tag-bugfix {
  background-color: $crimson;
  color: $white;
}
.tag-default {
  background-color: $white-smoke;
  border-color: darken($white-smoke, 5%);
}
</style>
