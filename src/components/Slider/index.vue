<template>
  <div class="slider">
    <div class="slides">
      <div class="slide" v-for="img in images" :key="img.id">
        <img :src="img.src" alt="" srcset="" />
        <span class="title">{{ img.title }}</span>
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
// // CAhnge Slides
const pagination = (index) => {
  const slider = document.querySelectorAll(".slides");
  const curentPag = document.querySelectorAll(
    ".slider .pagination .item.active"
  );
  const pagination = document.querySelectorAll(".slider .pagination .item");

  curentPag[0].classList.remove("active");
  pagination[index].classList.add("active");

  const slide = document.querySelectorAll(".slides .slide");

  const width = slide[index].clientWidth;

  slider[0].style.transform = `translateX(${-index * width}px)`;
};
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      autoPlay: () => {},
    };
  },
  mounted() {
    this.autoPlay = setInterval(function () {
      const allitems = document.querySelectorAll(".slider .pagination .item");
      let index;
      allitems.forEach((i, inx) => {
        if (i.classList.contains("active")) {
          index = inx;
        }
      });
      if (index === allitems.length - 1) {
        pagination(0);
      } else {
        pagination(index + 1);
      }
    }, 5000);
  },

  unmounted() {
    clearInterval(this.autoPlay);
    this.autoPlay = () => {};
  },

  methods: {
    pagination: (index) => pagination(index),
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        color: #fff;
        font-size: 2em;
        margin-top: 10px;
      }
      img {
        width: 90%;
        height: 60%;
        object-fit: contain;
      }
    }
  }
  .pagination {
    width: 100%;
    position: absolute;
    height: 20px;
    bottom: 30px;
    display: flex;
    justify-content: center;
    .item {
      margin: 0px 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid #fff;
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
