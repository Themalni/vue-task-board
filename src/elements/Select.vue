<template>
  <div class="select-container pb-3">
    <label>
      {{ label }}
      <select
        :name="name"
        :value="value"
        @input="emitValue($event.target.value)"
        v-validate="rules"
        :data-vv-as="friendlyName"
        data-vv-validate-on="blur">
        <option :value="undefined">{{ defaultOption }}</option>
        <option v-for="(option, key) in options" :value="key" :key="key">{{ option }}</option>
      </select>
    </label>
    <small
      v-if="errors.first(name)"
      class="text-xs error-text edit-error"
    >
      {{ errors.first(name) }}
    </small>
  </div>
</template>

<script>
export default {
  name: "Select",
  inject: ['$validator'],
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
    },
    name: {
      type: String
    },
    rules: {
      type: [String, Object],
      required: false
    },
    friendlyName: {
      type: String,
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
.select-container {
  display: flex;
  flex-direction: column;
  position: relative;
}
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

    &.has-error {
      border-color: $crimson;
    }
  }
}
.edit-error {
  position: absolute;
  bottom: 0.5em;
}
</style>
