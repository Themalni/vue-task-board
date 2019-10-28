<template>
  <Board :header="boardHeader">
    <Board-Column v-for="category in categories" :key="category.id" :category="category"/>
  </Board>
</template>

<script>
import Board from '@/components/Board'
import BoardColumn from '@/components/BoardColumn'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Board,
    BoardColumn
  },
  data: () => ({
    boardHeader: 'Tablica'
  }),
  computed: {
    ...mapGetters(['categories'])
  }
}
</script>
