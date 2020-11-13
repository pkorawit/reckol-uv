<template>
<div class="background">
    <div>
        <password-form title="Passcode" @confirmPassword="confirmPassword" />
    </div>
</div>
</template>

<script>
import {
    MODE
} from "src/common/constant";
import PasswordForm from "../components/PasswordForm";
import {
    rentLocker,
    unlockOneTimeLocker,
    unlockSelfLocker
} from "src/api";
import {
    Loading
} from "quasar";
export default {
    components: {
        PasswordForm,
    },
    computed: {
        mode() {
            return this.$route.query.mode;
        },
        lockerId() {
            return this.$route.query.lockerId;
        },
        user() {
            return localStorage.getItem("auth__user");
        },
    },
    methods: {
        async confirmPassword(passcode) {
            try {
                Loading.show();
                //     let isSucceed = false;

                //     if (this.mode == MODE.RENTAL) {
                //         isSucceed = await rentLocker({
                //             lockerId: this.lockerId,
                //             passcode,
                //             userId: this.user.id,
                //         });
                //     }

                //     if (this.mode == MODE.SELF_UNLOCK) {
                //         isSucceed = await unlockSelfLocker({
                //             lockerId: this.lockerId,
                //             passcode,
                //             userId: this.user.id,
                //         });
                //     }

                //     if (this.mode == MODE.OTP_UNLOCK) {
                //         isSucceed = await unlockOneTimeLocker({
                //             lockerId: this.lockerId,
                //             passcode,
                //             userId: this.user.id,
                //         });
                //     }

                // Loading.hide();

                // this.$router.push({
                //     path: `/success`,
                // });

                setTimeout(() => {
                    // for mockup
                    Loading.hide();

                    this.$router.push({
                        path: `/success`,
                    });
                }, 3000);
            } catch (error) {
                this.$q
                    .dialog({
                        title: "Alert",
                        message: "Something went wrong.",
                    })
                    .onDismiss(() => {
                        this.$router.resolve("/");
                    });
            }
        },
    },
};
</script>

<style lang="scss">
.background {
    position: absolute;
    width: 100%;

    height: calc(100vh - (80px + 65px));

    overflow-y: hidden;

    border-radius: 50px 50px 0px 0px;

    background: #eeecec;

    padding: 25px;

    p {
        padding: 15px;
    }
}
</style>
