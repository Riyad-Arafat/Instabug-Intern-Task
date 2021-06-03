<template>
  <div class="form">
    <div class="logo">
      <img src="../../assets/images/logo.png" />
      <h2>Log in to Instabug</h2>
    </div>
    <div class="api-auth">
      <Button
        title="Google"
        titleColor="#fff"
        icon="google"
        bg="#1975ff"
        iconColor="#fff"
      />
      <Button
        title="GitHub"
        titleColor="#fff"
        icon="github"
        bg="#31323a"
        iconColor="#fff"
      />
      <Button title="Microsoft" icon="microsoft" bg="#fff" />
    </div>
    <span class="separator">OR</span>
    <form class="inputs-form" @submit.prevent="onSubmit()" action="#">
      <div v-if="alert" id="alert">{{ alert }}</div>

      <InputField
        type="email"
        name="email"
        placeholder="you@company.com"
        label="Work Email"
        @change="validateEmail()"
        :alert="emailAlert"
      />
      <InputField
        type="password"
        name="password"
        placeholder="8+ Characters"
        label="password"
        @change="validatePassword()"
        :alert="passwordAlert"
      />
      <Button
        id="login-btn"
        title="Log in"
        titleColor="#fff"
        :bg="validateEmail && validPassword ? '' : 'gray'"
        :disabled="!validEmail || !validPassword"
      />
      <div class="others">
        <span>Don't have an account? <a href="#">Sign up</a></span>
        <span><a href="#">Login via SSO</a></span>
      </div>
    </form>
  </div>
</template>

<script>
import Button from "../Button/index";
import InputField from "../InputField/index";

export default {
  components: {
    Button,
    InputField,
  },
  data() {
    return {
      validEmail: false,
      validPassword: false,
      validInputs: false,
      passwordAlert: "",
      emailAlert: "",
      email: "",
      password: "",
      alert: "",
    };
  },

  methods: {
    validateEmail: function () {
      this.alert = "";
      let email = document.getElementsByName("email");
      email = email[0].value;

      let emailRehex = new RegExp(
        /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      );
      if (!emailRehex.test(email)) {
        this.emailAlert = "Enter a vaild address";
        this.validEmail = false;
      } else {
        this.emailAlert = "";
        this.validEmail = true;
      }

      if (this.validEmail) {
        this.emailAlert = "";
        this.email = email;
      }
    },
    validatePassword: function () {
      this.alert = "";
      let password = document.getElementsByName("password");

      password = password[0].value;
      let passwordRegex = new RegExp(
        /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9-!@#$%^&*()_-~?><:}{+=.,]{8,}$/
      );

      let addresName = "";

      if (password.length > 0 && this.email) {
        addresName = this.email.substring(0, this.email.indexOf("@"));
        var re = new RegExp(addresName, "g");
        let passwordValid = password.match(re);
        if (
          Array.isArray(passwordValid) &&
          passwordValid.length > 0 &&
          this.email
        ) {
          this.passwordAlert =
            "password shouldn’t contain the email address name";
          this.validPassword = false;
        } else if (!passwordRegex.test(password)) {
          this.passwordAlert =
            "The password must contain at least 1 uppercase letters and one number";
          this.validPassword = false;
        } else {
          this.validPassword = true;
        }
      } else if (!password.length > 0 && this.validEmail) {
        this.passwordAlert = "password must be 8 characters or more";
      }
      if (this.validPassword) {
        this.passwordAlert = "";
        this.password = password;
      }
    },
    onSubmit: async function () {
      await fetch("data.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const users = data.filter((user) => user.email === this.email);
          const user = users[0];
          if (user) {
            if (user.password === this.password) {
              localStorage.setItem("email", this.email);
              this.$router.push("/");
            } else {
              this.validInputs = false;
              this.alert = "Your email and/or your password are incorrect";
            }
          } else {
            this.alert = "Your email and/or your password are incorrect";
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 47px;
  div {
    width: 100%;
  }

  #alert {
    background-color: #ff2424f2;
    color: #fff;
    padding: 12px 0;
    font-size: 20px;
    margin-bottom: 16px;
    border-radius: 5px;
  }
  .logo {
    margin-top: 50px;
    img {
      max-width: 100px;
    }
  }
  .api-auth {
    .btn {
      width: 80% !important;
    }
  }
  .separator {
    display: flex;
    align-items: center;
    margin: 10px 0;
    width: 100%;
    &::after,
    &::before {
      content: "";
      flex: 1;
      border-bottom: 1px solid #b3b3b391;
    }
  }
  .inputs-form {
    width: 70%;
    .btn {
      width: 100%;
    }
    .others {
      display: flex;
      justify-content: space-between;
      a {
        color: #4587ff;
        text-decoration: none;
      }
    }
  }
}
</style>
