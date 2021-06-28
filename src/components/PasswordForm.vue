<template>
  <div>
    <div class="text-h5 text-primary">{{ title }}</div>
    <q-card class="text-center card no-shadow" style="margin-top:24px">
      <q-card-section class="row justify-center">
        <div class=" ">
          <div>
            <q-input 
            ref="passcode"
            type="text"
            mask="#  #  #  #  #  #"
            hint="ex : 123456"
            input-style="text-align:center; font-size:35px; color: #B52324" v-model="input1"></q-input>
          </div>

          <div class="q-ma-md">
            <q-btn color="primary" 
            :disable="isNoneValidPasscode"
            unelevated
            icon="fas fa-check"
            class="full-width my-locker-btn " 
            label="Confirm"
            @click="confirmPassword"></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    btnLabel: {
      type: String,
      default: "Confirm",
    },
  },
  data() {
    return {
      input1: "",
      // input2: "",
      // input3: "",
      // input4: ""
    };
  },
  mounted(){
    this.$refs.passcode.focus()
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.password);
    },
    log(val) {
      console.log(val);
    },
    confirmPassword() {
      // console.log(this.input1);

      // api state
      this.input1 == "" ? "" : this.$emit("confirmPassword", this.password);
    },
    toInput(input) {
      const temp = [this.input1, this.input2, this.input3, this.input4];
      console.log(temp[input - 2]);
      const ref = this.$refs[`input${input}`].$el.focus();
    },
  },
  computed: {
    password: {
      get() {
        return this.input1.replaceAll(" ","");
      },
    },
    isNoneValidPasscode: {
      get() {
        return (this.password.length == 6) ? false: true;
      },
    },
  },
};
</script>

<style scoped>
.small-title {
  padding: 15px;
  font-size: 18px;
}

.card {
  margin-top: 40px;
  border-radius: 14px;
}

.my-locker-btn {
        width: 45%;
        height: 65px;
        font-size: 20px;
        border-radius: 25px;
      }
</style>
