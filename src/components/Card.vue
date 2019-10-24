<template>
  <div class="card">
    <div class="card-body">{{ description }}</div>
    <div class="card-footer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    description: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.card {
  max-width: 100%;
  height: 100px;
  margin-bottom: 0.7em;
  padding: 0.5em;
  border-radius: 4px;
  background-color: $white;
  box-shadow: 0 1px 5px -3px $graphite;
  font-size: 0.8em;
}
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
