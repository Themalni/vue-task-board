<template>
  <div>
    <button class="button" :class="[ color ]" @click="$emit('addAction')" :disabled="disabled">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    addAction () {
      this.$emit('addAction')
    }
  }
}
</script>

<style lang="scss">
.button {
  padding: 0.7em 1.5em;
  border: none;
  border-radius: 2px;
  box-shadow: 0 1px 5px -3px $graphite;
  cursor: pointer;
  transition: 0.2s linear;

  &:hover {
    box-shadow: 0px 3px 8px -5px $graphite;
    transition: 0.2s linear;
  }

  &:disabled {
    pointer-events: none;
  }
}
.button-default {
  background-color: $light-grey;
  color: $graphite;

  &:hover {
    background-color: darken($light-grey, 5%);
    transition: 0.2s linear;
  }

  &:disabled {
    background-color: lighten($light-grey, 25%);
  }
}
.button-primary {
  background-color: $blue;
  color: $white;

  &:hover {
    background-color: darken($blue, 5%);
    transition: 0.2s linear;
  }

  &:disabled {
    background-color: lighten($blue, 25%);
  }
}
.button-success {
  background-color: $olive;
  color: $white;

  &:hover {
    background-color: darken($olive, 5%);
    transition: 0.2s linear;
  }

  &:disabled {
    background-color: lighten($olive, 25%);
  }
}
.button-danger {
  background-color: $crimson;
  color: $white;

  &:hover {
    background-color: darken($crimson, 5%);
    transition: 0.2s linear;
  }
}
</style>
