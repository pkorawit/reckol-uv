<template>
  <div>
    <q-card flat bordered class="  locker">
      <p style="margin:5px 0 0 10px">UVBOX</p>
      <div class="row text-left">
        <div class="col-8">
          <div class="small-title ">Locker {{ box.number }}</div>
        </div>
        <div class="col-4">
          <div>
            <q-btn text-color="primary" outline @click="unlock">detail</q-btn>
          </div>
        </div>
        <div class="col-12 text-left">
          <p style="margin:0 0 0 10px">Owner : 088-xxx-xxxx</p>
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
      required: true
    }
  },
  data() {
    return {
      transform: false,
      sendPassword: "",
      targetPhoneNumber: ""
    };
  },
  mounted() {
    if (this.$props.box.status == "Available") {
      this.sendPassword = "Send Password";
    }
  },

  methods: {
    unlock() {
      this.$router.push("/scanner");
    },
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
            }
          }
        ]
      });
    }
  },
  watch: {
    targetPhoneNumber: function(newInput) {
      newInput.length == 12 ? (this.sendPassword = "Confirm") : "";
    }
  }
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
