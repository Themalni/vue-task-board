<template>
  <Modal title="Stwórz nowe zadanie" :status="task.status">
    <template v-slot:body>
      <div class="container pb-3">
        <h4>Opis zadania:</h4>
        <textarea
          class="mt-2"
          :class="[{ 'has-error': errors.first('description') }]"
          name="description"
          type="textarea"
          label="Description"
          v-model="task.description"
          v-validate="'required'"
          data-vv-as="Opis zadania"
          placeholder="Dodaj opis zadania..."
          rows="6"
          @focus="isEditing = true"
        ></textarea>
        <small
          v-if="errors.first('description')"
          class="text-xs error-text edit-error"
        >{{ errors.first('description') }}</small>
      </div>
        <h4 class="w-100">Rodzaj zadania:</h4>
        <Select
          :name="'taskTypesSelect'"
          id="select"
          label
          v-model="task.type"
          rules="required"
          friendly-name="Rodzaj zadania"
          :options="taskTypes"
          default-option="Wybierz rodzaj zadania"
        ></Select>
    </template>
    <template v-slot:footer>
      <Button color="button-primary" :disabled="!isEditing" @addAction="saveChanges()">Zachowaj</Button>
      <Button class="ml-2" color="button-default" @addAction="closeModal()">Anuluj</Button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import Button from '@/elements/Button'
import Select from '@/elements/Select'
import { mapActions } from 'vuex'

export default {
  name: 'NewTaskModal',
  inject: ['$validator'],
  components: {
    Modal,
    Button,
    Select
  },
  data: () => ({
    task: {
      id: null,
      categoryId: 'c1',
      description: null,
      type: null,
      status: 'Oczekujące'
    },
    taskTypes: {
      feature: 'feature',
      bugfix: 'bugfix',
      default: 'default'
    },
    isEditing: false,
    isValid: true
  }),
  methods: {
    ...mapActions(['changeNewTaskModalState', 'saveTask']),
    saveChanges () {
      this.$validator.validate()
        .then(valid => {
          if (valid) {
            this.$store.dispatch('saveTask', this.task)
            this.$store.dispatch('changeNewTaskModalState', false)
            this.isEditing = false
          }
        })
        .catch(() => {
          console.log(this.errors.all())
        })
      console.log(this.errors.all())
    },
    closeModal () {
      this.$store.dispatch('changeNewTaskModalState', false)
    }
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}
.edit-error {
  position: absolute;
  bottom: 0.5em;
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
  width: 100%;

  &.has-error {
    border-color: $crimson;
  }
}
</style>
