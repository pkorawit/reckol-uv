<template>
  <div>
    <div class="text-h5 text-primary">{{ title }}</div>
    <q-card class="text-center card no-shadow" style="margin-top:24px">
      <q-card-section class="row justify-center">
        <div class=" ">
          <div>
            <q-input 
            type="text"
            mask="#  #  #  #  #  #"
            hint="ex : 123456"
            input-style="text-align:center; font-size:35px; color: #B52324" v-model="input1"></q-input>
          </div>

          <div class="q-ma-lg">
            <q-btn color="primary" 
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
      this.input1 == "" ? "" : this.$emit("confirmPassword", this.input1);
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
        return this.input1 + this.input2 + this.input3 + this.input4;
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
        height: 75px;
        font-size: 20px;
        border-radius: 25px;
      }
</style>
