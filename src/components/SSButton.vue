<template>
  <button
    :class="['Button', `Button--${this.type}`]"
    @click="this.handleClick"
    v-if="!this.to"
  >
    <slot />
  </button>
  <router-link
    :class="['Button', `Button--${this.type}`]"
    v-else
    :to="this.to"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'SSButton',
  props: {
    handleClick: {
      type: Function,
      default() {
        return null;
      },
    },
    to: {
      type: String,
      default() {
        return '/';
      },
      valdator(inpt) {
        return typeof inpt === 'string';
      },
    },
    type: {
      type: String,
      default() {
        return 'Constructive';
      },
      validator(inpt) {
        return ['Constructive', 'Destructive'].indexOf(inpt) !== -1;
      },
    },
  },
};
</script>

<style lang="scss">
.Button{
    border: 3px solid rgba(0,0,0,.85);
    border-radius: 7.5px;
    color: rgba(0,0,0,.85);
    font-weight: 700;
    margin: auto;
    padding: 15px 20px;

    :hover {
      cursor: pointer;
    }

    &--Constructive{
        background-color: #6dcac1;
        box-shadow: -3px 3px 0px 1px #449a92;
    }
    &--Destructive{
        background-color: #fdb1be;
        box-shadow: -3px 3px 0px 1px #c77281;
    }
}
</style>
