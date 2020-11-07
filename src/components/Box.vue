<template>
  <div>
    <q-card class="q-pa-md locker">
      <q-card-section class="row text-center">
        <div class="col-6">
          <div class="small-title q-mb-md">Box No.</div>
          <div class="text-h5">{{ box.number }}</div>
        </div>
        <div class="col-6">
          <div class="status-btn">
            <q-btn flat @click="toggle">{{ sendPassword }}</q-btn>
          </div>
        </div>
        <div v-if="transform" class="col-12">
          <div :class="{ transform }">
            <div>
              <q-input
                class="center-placeholder"
                placeholder="xxx-xxx-xxxx"
                mask="###-###-####"
                hint="* input the number"
                v-model="targetPhoneNumber"
                autofocus
              ></q-input>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    box: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      transform: false,
      sendPassword: "",
      targetPhoneNumber: "",
    };
  },
  mounted() {
    if (this.$props.box.status == "Available") {
      this.sendPassword = "Send Password";
    }
  },

  methods: {
    toggle() {
      if (this.sendPassword == "Confirm") {
        this.showNotif();

        this.sendPassword = "Send Password";
        this.tel = "";
      }
      this.transform = !this.transform;
    },
    showNotif() {
      this.$q.notify({
        message:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quisquam non ad sit assumenda consequuntur esse inventore officia. Corrupti reiciendis impedit vel, fugit odit quisquam quae porro exercitationem eveniet quasi.",
        color: "primary",
        multiLine: true,
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        actions: [
          {
            label: "Reply",
            color: "yellow",
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },
  },
  watch: {
    targetPhoneNumber: function (newInput) {
      newInput.length == 12 ? (this.sendPassword = "Confirm") : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.small-title {
  font-size: 18px;
}
.locker {
  background: white;
  border-radius: 20px;
}
.status-btn {
  background: #1f2865;
  color: white;
  padding: 10px;
  border-radius: 20px;
}
.center-placeholder {
  ::-webkit-input-placeholder {
    text-align: center;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
  }

  :-ms-input-placeholder {
    text-align: center;
  }
}
.transform {
  display: block;
}
</style>
