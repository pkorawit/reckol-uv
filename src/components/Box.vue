<template>
  <div>
    <q-card class="q-pa-md locker">
      <q-card-section class=" row text-center">
        <div class="col-6">
          <div class="small-title q-mb-md">Box No.</div>
          <div class="text-h5">{{ box.number }}</div>
        </div>
        <div class="col-6">
          <div class="status-btn">
            <q-btn flat @click="toggle">{{ sendPassword }}</q-btn>
          </div>

          <!-- <div class="small-title q-mb-md">Status</div> -->
          <!-- <div class="text-h4" style="padding-top: 10px">{{ box.status }}</div> -->
        </div>
        <div v-if="tf" class="col-12">
          <div :class="{ transform: tf }">
            <div>
              <q-input
                class="center-placeholder"
                placeholder="xxx-xxx-xxxx"
                mask="###-###-####"
                hint="* input the number"
                v-model="tel"
                autofocus
              ></q-input>
            </div>
          </div>
        </div>

        <!-- <div class="col-12 q-mt-md">
          <div class="text-left">Price</div>
          <q-btn
            class="full-width"
            color="grey-1"
            text-color="black"
            label="Free"
            disable
          />
        </div> -->
      </q-card-section>
      <!-- <q-card-section class="q-pa-none">
        <div class="col-12 q-mt-md">
          <q-btn
            class="full-width"
            color="blue-3"
            text-color="black"
            label="Rent this box"
            @click="rent"
          />
        </div>
      </q-card-section> -->
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    box: {
      /**
       * {
       *    id:string
       *
       *    number: string
       *
       *    status: string
       *
       *    price: number
       * }
       */
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tf: false,
      sendPassword: "",
      tel: "",
      sending: false
    };
  },
  mounted() {
    // console.log(this.$props.box.status);
    if (this.$props.box.status == "Available") {
      this.sendPassword = "Send Password";
    }
  },

  methods: {
    rent() {
      this.$emit("rent");
    },
    toggle() {
      if (this.sendPassword == "Confirm") {
        this.showNotif();

        this.sendPassword = "Send Password";
        this.tel = "";
      }
      this.tf = !this.tf;
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
            }
          }
        ]
      });
    }
  },
  watch: {
    // whenever question changes, this function will run
    tel: function(newInput, oldInput) {
      newInput.length == 12 ? (this.sendPassword = "Confirm") : "";
      // this.answer = 'Waiting for you to stop typing...'
      // this.debouncedGetAnswer()
    }
  }
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
