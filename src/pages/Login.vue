<template>
  <div class="column justify-center items-center page">
    <div
      class="absolute input"
      v-if="mode === 'PHONE_INPUT'"
    >
    <div class="text-center"><img alt="logo" src="~assets/coc_logo.png" width="40%" /></div>    
    <div class="text-center q-mt-md"><img alt="logo" src="~assets/uvbox.png" width="70%" /></div>          
      <q-input
        type="text"
        mask="(###) ### - ####"
        hint="ex. (098)-xxx-xxxx"
        v-model="tel"
        input-style="text-align:center;font-size:20px"
        color="secondary"
        label="Sign in with your phone number"
        autofocus
      ></q-input>
      <q-btn
        color="secondary"
        label="Request OTP"
        icon="textsms"
        class="full-width q-mt-md"
        @click="renderRecaptcha"
        :loading="loading"
      />
      <div
        class="q-pt-xl"
        id="recaptcha-container"
      ></div>
    </div>
    <div
      class="absolute input"
      v-if="mode === 'OTP_INPUT'"
    > 
    <div class="text-center"><img alt="logo" src="~assets/coc_logo.png" width="40%" /></div>    
    <div class="text-center q-mt-md"><img alt="logo" src="~assets/uvbox.png" width="70%" /></div>    
      <q-input
        type="number"
        hint="ex. xxxxxx"
        v-model="otp"
        input-style="text-align:center;font-size:20px"
        color="negative"
        label="Check yor phone and enter the OTP"
        autofocus
        ref="otp"
      ></q-input>
      <q-btn
        color="negative"
        label="Sign In"
        icon="login"
        class="full-width q-mt-md"
        @click="confirmOTP"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import { Loading } from "quasar";
import { createUserLockers, isUserLockersExists } from "../api/collections/user-lockers-collection";
import { createUserProfiles } from "../api/collections/user-profiles-collection";

export default {
  data() {
    return {
      tel: "",
      otp: "",
      recaptchaVerifier: null,
      mode: "PHONE_INPUT",
      confirmationResult: null,
      loading: false,
      formatTel: ""
    };
  },
  methods: {
    async onLogin(response) {
      try {
        this.formatTel = `+66${this.tel.replace("(","").replace(")","").replace("-","").replaceAll(" ","").slice(1,10)}`;              
        Loading.show();
        this.confirmationResult = await this.$auth().signInWithPhoneNumber(
          this.formatTel,
          this.recaptchaVerifier
        );
        this.mode = "OTP_INPUT";
        Loading.hide();
      } catch (error) {
        console.error(error);
      }
    },
    async confirmOTP() {
      try {
        this.loading = true
        Loading.show();
        const result = await this.confirmationResult.confirm(this.otp);
        console.log({
              userId: result.user.uid,
              phoneNumber: this.formatTel,
            });
        
        // Create user locker collection & profile collection if it not exists
        const userLockerExist = await isUserLockersExists({phoneNumber: this.formatTel.replace("+66", "0")})      
        if (!userLockerExist) {         
          await Promise.all([
            createUserLockers({
              userId: result.user.uid,
              phoneNumber: this.formatTel.replace("+66", "0"),
            }),
            createUserProfiles({
              userId: result.user.uid,
              phoneNumber: this.formatTel.replace("+66", "0"),
            }),
          ]);
        }

        localStorage.setItem("auth__user", JSON.stringify(result.user));
        // Create user_lockers 

        Loading.hide();
        this.$router.push("/");
        this.loading = false
      } catch (error) {
        console.error(error);
        window.location.reload();
      }
    },
    renderRecaptcha() {
      this.loading = true
      this.recaptchaVerifier.render();
      setTimeout(() => {
        this.loading = false
      }, 3000);
    }
  },
  watch: {
    // tel(val, newVal) {
    //   if (val.length == 10) {
    //     this.recaptchaVerifier.render();
    //   }
    // },
    // otp(val, newVal) {
    //   if (val.length == 6) {
    //     this.confirmOTP();
    //   }
    // },
  },
  mounted() {
    this.recaptchaVerifier = new this.$auth.RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: (response) => this.onLogin(response),
      "expired-callback": function () {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      },
    });
  },
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
  color: #1D959E;
}

.page {
  height: 100vh;
  background-color: #F5F5F5;
}
</style>
