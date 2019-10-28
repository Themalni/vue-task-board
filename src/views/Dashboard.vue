<template>
  <Board :header="boardHeader">
    <Board-Column v-for="category in categories" :key="category.id" :title="category.title" :category="category">
      <draggable v-model="items">
        <Card
          v-for="task in items[0].tasks"
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
    ...mapGetters(["categories", "activeTaskId", "viewModalIsOpen"]),
    items: {
      get() {
        return this.categories
      },
      set(value) {
        this.$store.dispatch("moveTask", value);
      }
    }
  },
  methods: {
    ...mapActions(["changeViewTaskModalState", "moveTask"]),
    openTask(id) {
      this.$store.dispatch("changeViewTaskModalState", true);
      this.$store.dispatch("setActiveTask", id);
    }
  },
  mounted() {
    console.log("Tasks:", this.categories.find(item => item.tasks.length > 0).tasks.filter(item => item.categoryId === 'c1'))
  }
}
</script>
