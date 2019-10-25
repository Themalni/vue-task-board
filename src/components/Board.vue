<template>
  <div class="board">
    <div class="board-header">
      <h1 class="board-header-text">{{ header }}</h1>
      <Button class="mb-2" color="button-success" @addAction="openModal()">Dodaj zadanie</Button>
    </div>
    <div class="board-body">
      <slot></slot>
    </div>
    <Task-Modal v-if="modalIsOpen"></Task-Modal>
  </div>
</template>

<script>
import Button from "@/elements/Button";
import TaskModal from "@/components/TaskModal";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Board",
  components: {
    Button,
    TaskModal
  },
  data: () => ({
    id: null
  }),
  props: {
    header: {
      type: String
    }
  },
  computed: {
    ...mapGetters(["modalIsOpen"])
  },
  methods: {
    ...mapActions(["changeModalState"]),
    openModal() {
      this.$store.dispatch("changeModalState", true);
    }
  }
};
</script>

<style lang="scss">
.board {
  padding: 1em 2em;
}
.board-header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
}
.board-heared-text {
  font-size: 1.3em;
  color: $graphite;
}
.board-body {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  /* justify-content: space-between; */
}
textarea {
  padding: 1em;
  border: 1px dashed $grey;
  outline: none;
  resize: none;
  font-family: "Noto Sans", sans-serif;
  font-size: 0.8em;
  color: $graphite;
  border-radius: 2px;
}
</style>
