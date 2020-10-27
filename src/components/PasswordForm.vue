<template>
  <q-card class="bg-blue row text-center">
    <q-card-section>
      <div class="small-title">Set the password</div>
      <div class="text-subtitle2 row">
        <q-input
          v-model="input1"
          outlined
          mask="#"
          class="col-3 q-px-md"
          ref="input1"
          :rules="[val => !!val || '* Required']"
          lazy-rules
          @keyup="toInput(2)"
        />
        <q-input
          v-model="input2"
          outlined
          mask="#"
          class="col-3 q-px-md"
          ref="input2"
          :rules="[val => !!val || '* Required']"
          lazy-rules
          @keyup="toInput(3)"
        />
        <q-input
          v-model="input3"
          outlined
          mask="#"
          class="col-3 q-px-md"
          ref="input3"
          :rules="[val => !!val || '* Required']"
          lazy-rules
          @keyup="toInput(4)"
        />
        <q-input
          v-model="input4"
          outlined
          mask="#"
          class="col-3 q-px-md"
          ref="input4"
          :rules="[val => !!val || '* Required']"
          lazy-rules
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    btnLabel: {
      type: String,
      default: "Confirm"
    }
  },
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: ""
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.password);
    },
    log(val) {
      console.log(val);
    },
    toInput(input) {
      const temp = [this.input1, this.input2, this.input3, this.input4];
      console.log(temp[input - 2]);
      const ref = this.$refs[`input${input}`].$el.focus();
    }
  },
  computed: {
    password: {
      get() {
        return this.input1 + this.input2 + this.input3 + this.input4;
      }
    }
  }
};
</script>

<style scoped>
.small-title {
  font-size: 18px;
}</style
>>
