<template>
  <div class="column justify-center items-center page">
    <div class="absolute text">
      <p class="text-h4 product-name">uvbox</p>
    </div>
    <div class="absolute input">
      <q-input
        dark
        type="number"
        mask="###-###-####"
        hint="ex. 098-xxx-xxxx"
        v-model="tel"
        input-style="text-align:center;"
        color="secondary"
        label=" input your phone number to login"
        autofocus
      ></q-input>
      <div class="q-pt-xl" id="recaptcha-container"></div>
    </div>
  </div>
</template>

<script>
import { Loading } from "quasar";
export default {
  data() {
    return {
      tel: "",
      recaptchaVerifier: null
    };
  },
  methods: {
    async onLogin(response) {
      try {
        const formatTel = tel => `+66${tel.slice(1, 10)}`;
        Loading.show();
        const confirmationResult = await this.$auth().signInWithPhoneNumber(
          formatTel(this.tel),
          this.recaptchaVerifier
        );
        const result = await confirmationResult.confirm("123456");
        localStorage.setItem("auth__user", result.user);
        Loading.hide();
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    tel(val, newVal) {
      if (val.length == 10) {
        this.recaptchaVerifier.render();
      }
    }
  },
  mounted() {
    this.recaptchaVerifier = new this.$auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: response => this.onLogin(response),
        "expired-callback": function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 100px);
}
.text {
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -350%);
}
.product-name {
  text-transform: uppercase;
  color: white;
}
.page {
  height: 100vh;
  background-color: #1f2865;
}
</style>
