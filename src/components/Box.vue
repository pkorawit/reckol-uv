<template>
<div>
    <q-card flat bordered class="locker">
        <p style="margin: 5px 0 0 10px">UVBOX</p>
        <div class="row text-left">
            <div class="col-8">
                <div class="small-title">Locker S1</div>
            </div>
            <div class="col-4">
                <div>
                    <q-btn text-color="primary" outline @click="detail">detail</q-btn>
                </div>
            </div>
            <div class="col-12 text-left">
                <p style="margin: 0 0 0 10px">Owner : 088-xxx-xxxx</p>
            </div>
        </div>
    </q-card>
</div>
</template>

<script>
export default {
    props: {
        box: {
            type: Object,
            // required: true,
        },
    },
    methods: {
        detail() {
            this.$router.push("/detail");
        },
    },
};
</script>

<style lang="scss" scoped>
.small-title {
    font-size: 18px;
    margin-left: 10px;
}

.locker {
    background: white;
    border-radius: 20px;
    color: $primary;
    font-weight: 500;
}

.status-btn {
    background: #1f2865;
    color: white;
    padding: 10px;
    border-radius: 20px;
}
</style>
