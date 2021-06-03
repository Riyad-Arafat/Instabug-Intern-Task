<template>
  <div class="input-container">
    <label>
      {{ label }}
      <span v-if="type === 'password'"><a href="#">Forget Password?</a></span>
    </label>

    <div class="input-filed">
      <input
        :style="{ 'border-color': alert ? 'red' : null }"
        :type="type === 'password' && isShowPassword ? 'text' : type"
        :name="name"
        :placeholder="placeholder ? placeholder : label"
        :id="name + '-field'"
      />
      <i
        v-if="!isShowPassword && type === 'password'"
        class="fas fa-eye"
        @click="showPassword()"
      ></i>
      <i
        v-if="isShowPassword && type === 'password'"
        class="fas fa-eye-slash"
        @click="showPassword()"
      ></i>
    </div>
    <span class="alert" :id="name + '-alert'">{{ alert }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: { String, require },
    type: { String, require },
    name: { String, require },
    placeholder: String,
    alert: String,
  },
  methods: {
    showPassword: function () {
      this.isShowPassword = !this.isShowPassword;
    },
  },
  data() {
    return {
      isShowPassword: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    text-align: start;
    display: inline-flex;
    margin-bottom: 0.5rem;
    span {
      margin-left: auto;
      color: gray;
      a {
        color: unset;
        text-decoration: none;
      }
    }
  }
  .input-filed {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    input {
      position: relative;
      flex: 1 1 auto;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid;
      outline: none;
    }
    i {
      position: absolute;
      right: 0;
      font-size: 20px;
      padding: 10px;
      cursor: pointer;
    }
  }
  .alert {
    color: red;
    padding: 2px 5px;
    text-align: start;
  }
}
</style>
