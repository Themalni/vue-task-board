<template>
  <div id="app">
    <Board :header="boardHeader">
      <Board-Column v-for="category in categories" :key="category.id" :title="category.title">
        <draggable v-model="category.tasks">
          <Card v-for="task in category.tasks" :key="task.id" :description="task.description"></Card>
        </draggable>
      </Board-Column>
    </Board>
  </div>
</template>

<script>
import Board from "@/components/Board";
import BoardColumn from "@/components/BoardColumn";
import Card from "@/components/Card";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Board,
    BoardColumn,
    Card,
    draggable
  },
  data: () => ({
    boardHeader: "Tablica"
  }),
  computed: {
    ...mapGetters(["categories"])
  }
};
</script>
<style>
</style>
