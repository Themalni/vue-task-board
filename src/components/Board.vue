<template>
  <div class="board">
    <div class="board-header">
      <h1 class="board-header-text">{{ header }}</h1>
      <Button class="mb-2" color="button-success" @addAction="openModal()">Dodaj zadanie</Button>
    </div>
    <div class="board-body">
      <slot></slot>
    </div>
    <Modal v-if="isOpen" title="Stwórz nowe zadanie" :isOpen="isOpen">
      <template v-slot:body>
        <textarea
          class="mt-2"
          name="description"
          type="textarea"
          label="Description"
          v-model="description"
          placeholder="Dodaj opis zadania..."
          rows="10"
        ></textarea>
      </template>
      <template v-slot:footer>
        <Button color="button-primary" @addAction="openModal()">Zachowaj</Button>
        <Button class="ml-2" color="button-default" @addAction="closeModal()">Anuluj</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from "@/elements/Button";
import Modal from "@/components/Modal";

import { mapActions } from "vuex";

export default {
  name: "Board",
  components: {
    Button,
    Modal
  },
  data: () => ({
    isOpen: false
  }),
  props: {
    header: {
      type: String
    }
  },
  methods: {
    ...mapActions(["createNewTask"]),
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
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
  justify-content: space-between;
}
textarea {
  padding: 1em;
  border: 1px dashed $grey;
  outline: none;
  width: 100%;
  resize: none;
  font-family: "Noto Sans", sans-serif;
  font-size: 0.8em;
  color: $graphite;
  border-radius: 2px;
}
</style>
