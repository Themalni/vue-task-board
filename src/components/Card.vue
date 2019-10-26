<template>
  <div class="card" @click="openCard()">
    <div class="card-body">{{ truncateString(description, 65) }}</div>
    <div class="card-footer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    description: {
      type: String
    }
  },
  methods: {
    openCard() {
      this.$emit("openCard");
    },
    truncateString(text, limit) {
      const shortened = text.indexOf(" ", limit);
      if (shortened == -1) return text;
      return text.substring(0, shortened) + "...";
    }
  }
};
</script>

<style lang="scss">
.card {
  position: relative;
  max-width: 100%;
  height: 70px;
  margin-bottom: 0.7em;
  padding: 0.5em;
  border-radius: 4px;
  background-color: $white;
  box-shadow: 0 1px 5px -3px $graphite;
  font-size: 0.8em;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
}
.card-footer {
  position: absolute;
  bottom: 0.7em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
