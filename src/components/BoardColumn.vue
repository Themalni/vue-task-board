<template>
  <div class="column">
    <div class="column-header">{{ category.title }}</div>
    <div class="column-body">
      <draggable v-model="items" group="task-items" class="draggable-container">
        <Card
          v-for="task in items"
          :key="task.id"
          :description="task.description"
          @openCard="openTask(task)"
        >
          <Tag class="mt-2" :type="task.type"/>
        </Card>
      </draggable>
      <View-Task-Modal v-if="viewModalIsOpen"></View-Task-Modal>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Card from '@/components/Card'
import Tag from '@/elements/Tag'
import ViewTaskModal from '@/components/task/ViewTaskModal'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BoardColumn',
  components: {
    draggable,
    Card,
    Tag,
    ViewTaskModal
  },
  props: {
    category: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['viewModalIsOpen', 'activeTask']),
    items: {
      get () {
        return this.category.tasks
      },
      set (value) {
        const payload = {
          id: this.category.id,
          title: this.category.title,
          tasks: value
        }
        this.$store.dispatch('moveTask', payload)
      }
    }
  },
  methods: {
    ...mapActions(['changeViewTaskModalState', 'setActiveCard', 'moveTask']),
    openTask (task) {
      this.$store.dispatch('changeViewTaskModalState', true)
      this.$store.dispatch('setActiveCard', task)
    }
  }
}
</script>

<style lang="scss">
.column {
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 100%;
  margin-right: 0.5em;
  padding: 1em 0.5em 0.7em;
  border-radius: 4px;
  background-color: $grey;
  box-shadow: 0 1px 5px -3px $graphite;
}
.column-header {
  font-size: 1.1em;
  padding-bottom: 1em;
}
.column-body {
  min-height: 110px;
}
.draggable-container {
  min-height: 100%;
}
</style>
