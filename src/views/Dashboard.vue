<template>
  <Board :header="boardHeader">
    <Board-Column v-for="category in categories" :key="category.id" :title="category.title">
      <draggable v-model="category.tasks">
        <Card
          v-for="task in category.tasks"
          :key="task.id"
          :description="task.description"
          @openCard="openTask(task.id)"
        >
          <Tag class="mt-2" :type="task.type"/>
        </Card>
      </draggable>
    </Board-Column>
    <View-Task-Modal v-if="viewModalIsOpen"></View-Task-Modal>
  </Board>
</template>

<script>
import Board from "@/components/Board";
import BoardColumn from "@/components/BoardColumn";
import Card from "@/components/Card";
import ViewTaskModal from "@/components/task/ViewTaskModal";
import Tag from "@/elements/Tag";
import draggable from "vuedraggable";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    Board,
    BoardColumn,
    Card,
    draggable,
    ViewTaskModal,
    Tag
  },
  data: () => ({
    boardHeader: "Tablica"
  }),
  computed: {
    ...mapGetters(["categories", "activeTaskId", "viewModalIsOpen"])
  },
  methods: {
    ...mapActions(["changeViewTaskModalState"]),
    openTask(id) {
      this.$store.dispatch("changeViewTaskModalState", true);
      this.$store.dispatch("setactiveTask", id);
    }
  }
};
</script>
