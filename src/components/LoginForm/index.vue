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
      <Button title="click" icon="microsoft" bg="#fff" />
    </div>
    <span class="separator">OR</span>
    <form class="inputs-form" @submit.prevent="onSubmit()" action="#">
      <div v-if="alert" class="alert">{{ alert }}</div>

      <InputField
        type="email"
        name="email"
        placeholder="you@company.com"
        label="Work Email"
        @change="validate()"
        :alert="emailAlert"
      />
      <InputField
        type="password"
        name="password"
        placeholder="8+ Characters"
        label="password"
        @change="validate()"
        :alert="passwordAlert"
      />
      <Button
        title="Log in"
        titleColor="#fff"
        :bg="validInputs ? '' : 'gray'"
        :disabled="!validInputs"
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
      validInputs: false,
      passwordAlert: "",
      emailAlert: "",
      email: "",
      password: "",
      alert: "",
    };
  },

  methods: {
    validate: function () {
      this.validInputs = false;
      let email = document.getElementsByName("email");
      let password = document.getElementsByName("password");
      let validPassword = false;
      let validEmail = false;
      email = email[0].value;
      password = password[0].value;
      let passwordRegex = new RegExp(
        /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9-!@#$%^&*()_-~?><:}{+=.,]{8,}$/
      );
      let emailRehex = new RegExp(
        /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      );
      let addresName = "";
      if (!emailRehex.test(email)) {
        this.emailAlert = "Enter a vaild address";
      } else {
        validEmail = true;
      }
      if (password.length) {
        addresName = email.substring(0, email.indexOf("@"));
        var re = new RegExp(addresName, "g");
        let passwordValid = password.match(re);

        if (
          Array.isArray(passwordValid) &&
          passwordValid.length > 0 &&
          emailRehex.test(email)
        ) {
          this.passwordAlert =
            "password shouldn’t contain the email address name";
        } else if (!passwordRegex.test(password)) {
          this.passwordAlert =
            "The password must contain at least 1 uppercase letters and one number";
        } else {
          validPassword = true;
        }
      } else {
        this.passwordAlert = "password must be 8 characters or more";
      }
      if (validPassword && validEmail) {
        this.validInputs = true;
        this.passwordAlert = "";
        this.emailAlert = "";
        this.email = email;
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

  .alert {
    background-color: #f30000;
    color: #fff;
    padding: 20px;
    font-size: 20px;
    border-radius: 3px;
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
