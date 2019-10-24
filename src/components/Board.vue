<template>
  <div class="board">
    <div class="board-header">
      <slot name="header"></slot>
    </div>
    <div class="board-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board"
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