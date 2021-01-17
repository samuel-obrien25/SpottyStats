<template>
    <button :class="['ActionButton', `ActionButton--${this.type}`]">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    type: String,
  },
};
</script>

<style lang="scss">
.ActionButton{
    border-radius: 7.5px;
    margin: auto;
    padding: 15px 20px;
    font-weight: 700;

    &--Constructive{
        background-color: #6dcac1;
        border: 3px solid rgba(0,0,0,.85);
        box-shadow: -3px 3px 0px 1px #449a92;
        color: rgba(0,0,0,.85);
    }
    &--Destructive{
        background-color: #fdb1be;
        border: 3px solid rgba(0,0,0,.85);
        box-shadow: -3px 3px 0px 1px #c77281;
        color: rgba(0,0,0,.85);
    }
}
</style>
