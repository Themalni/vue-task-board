<template>
  <label>
    {{ label }}
    <select :value="value" @input="emitValue($event.target.value)">
      <option :value="undefined">{{ defaultOption }}</option>
      <option v-for="(option, key) in options" :value="key" :key="key">{{ option }}</option>
    </select>
  </label>
</template>

<script>
export default {
  name: "Select",
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    options: {
      type: Object
    },
    defaultOption: {
      type: String
    },
    label: {
      type: [String, Boolean],
      required: false
    }
  },
  methods: {
    emitValue(inputValue) {
      this.$emit("input", inputValue);
    }
  }
};
</script>

<style lang="scss">
select {
  display: block;
  width: 100%;
  height: 32px;
  margin-top: 6px;
  padding: 6px 12px;
  line-height: 17px;
  border: 1px solid $grey;
  box-sizing: border-box;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  option {
    background: $white;
    border-color: $grey;
    color: $graphite;
  }
}
</style>
