<template>
  <div id="app">
    <Board>
      <template v-slot:header>
        <h1>Tablica</h1>
      </template>
      <template v-slot:body></template>
    </Board>
  </div>
</template>

<script>
import Board from "@/components/Board";

export default {
  name: "App",
  components: {
    Board
  }
};
</script>
<style>
</style>
