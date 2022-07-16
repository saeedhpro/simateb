<template>
  <div class="custom-toggle-button" @click="toggle">
    <div class="content" :class="{'on': value}">
      <div class="circle"></div>
    </div>
    <span class="on-label" v-if="value"> {{ onLabel }} </span>
    <span class="off-label" v-else> {{ offLabel }} </span>
  </div>
</template>

<script>
export default {
  name: "CustomToggleButton",
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    onLabel: {
      type: String,
      default: "",
    },
    offLabel: {
      type: String,
      default: "",
    }
  },
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.custom-toggle-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  .content {
    background: #FFFFFF 0 0 no-repeat padding-box;
    border: 1px solid #DBDBDB;
    border-radius: 100px;
    width: 48px;
    height: 24px;
    position: relative;
    cursor: pointer;
    transition: all .3s ease-in-out;
    &.on {
      background: #F6F7FF 0 0 no-repeat padding-box;
      border: 1px solid #5063FF;
      transition: all .3s ease-in-out;
      .circle {
        top: 1px;
        right: 25px;
        background: #5063FF 0 0 no-repeat padding-box;
        transition: all .3s ease-in-out;
      }
    }
    .circle {
      background: #DBDBDB 0 0 no-repeat padding-box;
      border-radius: 100px;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 1px;
      right: 1px;
      transition: all .3s ease-in-out;
    }
  }
  .on-label, .off-label {
    text-align: right;
    font: normal normal medium 16px/28px IRANYekanRegular !important;
    letter-spacing: 0;
    color: #141432;
    margin-right: 5px;
  }
}
</style>
