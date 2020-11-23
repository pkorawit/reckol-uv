<template>
<div>
    <div class="small-title text-h6">{{ title }}</div>
    <q-card class="q-pt-xl text-center card">
        <q-card-section class="row justify-center">
            <div class=" ">
                <div>
                    <q-input type="password" input-style="text-align:center; font-size:20px" v-model="input1"></q-input>
                </div>

                <div class="q-ma-lg">
                    <q-btn color="primary" class="full-width q-px-lg q-mt-sm q-py-sm" @click="confirmPassword" outline>Confirm</q-btn>
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
            this.input1 == "" ? "" : this.$emit("confirmPassword", true);
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
</style>
