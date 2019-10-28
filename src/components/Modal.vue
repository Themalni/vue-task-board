<template>
  <transition name="fade">
    <div class="overlay">
      <div class="modal" :class="{ 'w-25': small }">
        <div class="modal-header">
          <h3 class="modal-header-text text-white">{{ title }}</h3>
          <h3 v-if="status" class="modal-header-text text-white ml-1">({{ status }})</h3>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "Modal",
  props: {
    title: {
      type: String
    },
    status: {
      type: [String, Boolean],
      default: false
    },
    small: {
      type: Boolean,
      default: false
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, 0.4);
  z-index: 998;
}
.modal {
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 10px -5px $graphite;
  background-color: $white;
  border-radius: 4px;
  padding: 1.5em;
  z-index: 999;
}
.modal-header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  background-color: $blue;
  padding: 0.5em;
  margin-bottom: 1em;
}
.modal-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.modal-footer {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1em;
}
.modal-header-text {
  font-weight: 400;
}
</style>
