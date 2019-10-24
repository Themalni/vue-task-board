<template>
  <div class="board">
    <div class="board-header">
      <h1>{{ header }}</h1>
    </div>
    <div class="board-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  props: {
    header: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.board {
  padding: 1em 2em;
}
.board-header {
  font-size: 1.3em;
  color: $graphite;
}
.board-body {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
}
</style>
