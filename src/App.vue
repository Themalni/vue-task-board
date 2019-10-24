<template>
  <div id="app">
    <Board :header="boardHeader">
      <Board-Column v-for="column in columns" :key="column.id" :title="column.title">
        <draggable v-model="tasks">
          <Card v-for="task in tasks" :key="task.id" :description="task.description"></Card>
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

export default {
  name: "App",
  components: {
    Board,
    BoardColumn,
    Card,
    draggable
  },
  data: () => ({
    boardHeader: "Tablica",
    columns: [
      {
        id: 1,
        title: "Oczekujące"
      },
      {
        id: 2,
        title: "W realizacji"
      },
      {
        id: 3,
        title: "Wykonane"
      }
    ],
    tasks: [
      {
        id: 1,
        description:
          "Opis zadania idzie tutaj na dwie linijki. Więc musi być długi...",
        status: "Oczekujące"
      },
      {
        id: 2,
        description: "To jest inne zadanie",
        status: "Oczekujące"
      },
      {
        id: 3,
        description: "Tutaj zrób cos ze stylami",
        status: "Oczekujące"
      }
    ]
  })
};
</script>
<style>
</style>
