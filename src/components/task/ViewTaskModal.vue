<template>
  <div>
    <Modal v-if="!isEditing" title="Zadanie" :status="activeTask.status">
      <template v-slot:body>
        <h4 class="mb-1">Opis zadania:</h4>
        <div class="card-grey task-description">
          <p class="text-md m-0 p-1">{{ activeTask.description }}</p>
        </div>
        <h4 class="mt-2 mr-1 section-label">Rodzaj zadania:</h4>
        <Tag class="mt-2" :type="activeTask.type"/>
      </template>
      <template v-slot:footer>
        <Button class="ml-2" color="button-primary" @addAction="isEditing = true">Edytuj</Button>
        <Button class="ml-2" color="button-default" @addAction="closeModal()">Zamknij</Button>
      </template>
    </Modal>
    <Modal title="Edytuj zadanie" :status="activeTask.status" v-else>
      <template v-slot:body>
        <div class="container pb-3">
          <h4>Opis zadania:</h4>
          <textarea
            class="mt-2"
            :class="[{ 'has-error': errors.first('description') }]"
            name="description"
            type="textarea"
            label="Description"
            v-model="activeTask.description"
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
        <div class="container pb-3">
          <h4 class="w-100">Rodzaj zadania:</h4>
          <Select
            :name="'taskTypesSelect'"
            id="select"
            label
            v-model="activeTask.type"
            rules="required"
            friendly-name="Rodzaj zadania"
            :options="taskTypes"
            default-option="Wybierz rodzaj zadania"
          ></Select>
        </div>
      </template>
      <template v-slot:footer>
        <Button class="button-left" color="button-danger" :disabled="!isEditing" @addAction="openDeleteTaskModal()">Usuń</Button>
        <Button color="button-primary" :disabled="!isEditing" @addAction="setChanges(activeTask)">Zachowaj</Button>
        <Button class="ml-2" color="button-default" @addAction="closeModal()">Anuluj</Button>
      </template>
    </Modal>
    <Modal v-if="deleteModalIsOpen" title="Podtwierdzenie usuwania zadania" :small="true">
      <template v-slot:body>
        <h4>Czy napewno chcesz usunąć to zadanie?</h4>
      </template>
      <template v-slot:footer>
        <Button color="button-danger" :disabled="!isEditing" @addAction="deleteSelectedTask(activeTask)">Usuń</Button>
        <Button class="ml-2" color="button-default" @addAction="closeDeleteModal()">Anuluj</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import Button from '@/elements/Button'
import Select from '@/elements/Select'
import Tag from '@/elements/Tag'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ViewTaskModal',
  inject: ['$validator'],
  components: {
    Modal,
    Button,
    Select,
    Tag
  },
  data: () => ({
    isEditing: false,
    deleteModalIsOpen: false,
    taskTypes: {
      feature: 'feature',
      bugfix: 'bugfix',
      default: 'default'
    }
  }),
  computed: {
    ...mapGetters(['activeTask', 'editModalIsOpen'])
  },
  methods: {
    ...mapActions([
      'changeViewTaskModalState',
      'changeNewTaskModalState',
      'saveTask',
      'saveChanges',
      'deleteTask'
    ]),
    closeModal () {
      this.$store.dispatch('changeViewTaskModalState', false)
    },
    closeDeleteModal () {
      this.deleteModalIsOpen = false
    },
    setChanges (taskToSave) {
      this.$store.dispatch('saveChanges', taskToSave)
      this.$store.dispatch('changeViewTaskModalState', false)
    },
    openNewTaskModal () {
      this.$store.dispatch('changeViewTaskModalState', false)
      this.$store.dispatch('changeNewTaskModalState', true)
    },
    openDeleteTaskModal () {
      this.deleteModalIsOpen = true
    },
    deleteSelectedTask (task) {
      this.$store.dispatch('deleteTask', task)
      this.deleteModalIsOpen = false
      this.$store.dispatch('changeViewTaskModalState', false)
    }
  }
}
</script>

<style lang="scss">
.separator {
  height: 1px;
  width: 100%;
  border: none;
  background-color: $grey;
}
.task-description {
  min-height: 80px;
  width: 100%;
}
.section-label {
  line-height: 0.7;
}
.button-left {
  position: absolute;
  left: 1.5em;
}
</style>
