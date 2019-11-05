<template>
  <div class="board">
    <div class="board-header">
      <h1 class="board-header-text">{{ header }}</h1>
      <Button class="mb-2" color="button-success" @addAction="openModal()">Dodaj zadanie</Button>
    </div>
    <div class="board-body">
      <slot></slot>
    </div>
    <New-Task-Modal v-if="newModalIsOpen"></New-Task-Modal>
  </div>
</template>

<script>
import Button from '@/elements/Button'
import NewTaskModal from '@/components/task/NewTaskModal'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Board',
  components: {
    Button,
    NewTaskModal
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
    ...mapGetters(['newModalIsOpen'])
  },
  methods: {
    ...mapActions(['changeNewTaskModalState']),
    openModal () {
      this.$store.dispatch('changeNewTaskModalState', true)
    }
  }
}
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

  @include device-size(xs, sm) {
    flex-wrap: wrap;
  }
}
</style>
