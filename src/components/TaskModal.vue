<template>
  <form @submit.prevent="handleSubmit()">
    <Modal title="Stwórz nowe zadanie">
      <template v-slot:body>
        <textarea
          class="mt-2"
          name="description"
          type="textarea"
          label="Description"
          v-model="task.description"
          placeholder="Dodaj opis zadania..."
          rows="10"
        ></textarea>
        <Select
          class="mt-2 mb-4"
          id="select"
          label
          v-model="task.type"
          :options="taskTypes"
          default-option="Wybierz rodzaj zadania"
        ></Select>
      </template>
      <template v-slot:footer>
        <Button color="button-primary" type="submit">Zachowaj</Button>
        <Button class="ml-2" color="button-default" @addAction="closeModal()">Anuluj</Button>
      </template>
    </Modal>
  </form>
</template>

<script>
import Modal from "@/components/Modal";
import Button from "@/elements/Button";
import Select from "@/elements/Select";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TaskModal",
  components: {
    Modal,
    Button,
    Select
  },
  data: () => ({
    task: {
      id: null,
      categoryId: "c1",
      description: null,
      type: null
    },
    taskTypes: {
      feature: "feature",
      bugfix: "bugfix",
      default: "default"
    }
  }),
  computed: {
    ...mapGetters(["taskId"])
  },
  methods: {
    ...mapActions(["changeModalState", "saveTask"]),
    handleSubmit() {
      this.$store.dispatch("saveTask", this.task);
      this.$store.dispatch("changeModalState", false);
    },
    closeModal() {
      this.$store.dispatch("changeModalState", false);
    }
  }
};
</script>

<style lang="scss">
</style>
