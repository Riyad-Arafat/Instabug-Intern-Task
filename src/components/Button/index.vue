<template>
  <button class="btn" :style="{ 'background-color': bg, color: titleColor }">
    <i :style="{ color: iconColor }" :class="'fab fa-' + icon"></i>{{ title }}
  </button>
</template>

<script>
// import
export default {
  props: {
    title: {
      String,
      require,
    },
    titleColor: String,
    color: String,
    icon: String,
    iconColor: String,
    bg: String,
  },
};
</script>

<style lang="scss" scoped>
$btn-color: #00287a;
.btn {
  position: relative;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 6px;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 12pt;
  cursor: pointer;
  background-color: $btn-color;
  &:hover:not([disabled]) {
    opacity: 0.9;
  }
  i {
    position: absolute;
    left: 8px;
    font-size: 25px;
  }
}
</style>
