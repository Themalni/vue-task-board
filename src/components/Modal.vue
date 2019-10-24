<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-header-text">{{ title }}</h3>
        <Button-Close @close="closeModal()"></Button-Close>
      </div>
      <div class="board-body">
        <slot name="body"></slot>
      </div>
      <div class="board-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonClose from "@/elements/ButtonClose";

export default {
  name: "Modal",
  components: {
    ButtonClose
  },
  props: {
    title: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.modal {
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 5px 10px -5px $graphite;
  background-color: $white;
  border-radius: 4px;
  padding: 1.5em;
}
.modal-header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
}
.board-footer {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1em;
}
</style>
