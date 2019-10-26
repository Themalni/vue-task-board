<template>
  <div>
    <v-icon class="button-close" name="times" scale="1.3" @click="$emit('close')" />
  </div>
</template>

<script>
export default {
  name: "ButtonClose",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.button-close {
  padding: 0.5em;
  cursor: pointer;
}
</style>
