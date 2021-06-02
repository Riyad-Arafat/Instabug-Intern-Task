<template>
  <div class="slider">
    <div class="slides">
      <div class="slide" v-for="img in images" :key="img.id">
        <img :src="img.src" alt="" srcset="" />
      </div>
    </div>

    <div class="pagination">
      <div
        v-for="(img, index) in images"
        class="item"
        :class="index === 0 ? 'active' : ''"
        :key="img.id"
        @click="pagination(index)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
  },
  methods: {
    pagination: (index) => {
      const slider = document.querySelectorAll(".slides");
      const curentPag = document.querySelectorAll(
        ".slider .pagination .item.active"
      );
      const pagination = document.querySelectorAll(".slider .pagination .item");

      curentPag[0].classList.remove("active");
      pagination[index].classList.add("active");

      const slide = document.querySelectorAll(".slides .slide");
      console.log(slide);
      const width = slide[index].clientWidth;

      slider[0].style.transform = `translateX(${-index * width}px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  border: 1px solid;
  overflow: hidden;
  display: flex;
  position: relative;
  background-color: #00287a;
  .slides {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    transition: 0.25s all ease-in-out;

    .slide {
      height: 100%;
      flex: 0 0 100%;
      width: 100%;
      // padding: 0 25px;
      img {
        width: 90%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .pagination {
    width: 100%;
    position: absolute;
    height: 20px;
    bottom: 90px;
    display: flex;
    justify-content: center;
    .item {
      background: #ffffff52;
      margin: 0px 5px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background-color: #ffffff87;
      }
      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>
