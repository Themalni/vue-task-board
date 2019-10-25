<template>
  <div class="column">
    <div class="column-header">{{ title }}</div>
    <div class="column-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardColumn",
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.column {
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 100%;
  margin-right: 0.5em;
  padding: 1em 0.5em 0.7em;
  border-radius: 4px;
  background-color: $grey;
  box-shadow: 0 1px 5px -3px $graphite;
}
.column-header {
  font-size: 1.1em;
  padding-bottom: 1em;
}
</style>
