<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign up</h1>
                    <p class="text-xs-center">
                        <router-link :to="{ name: 'login' }">Have an account?</router-link>
                    </p>
                    <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group">
                            <input
                                v-model="email"
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                v-model="username"
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="Username"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                v-model="password"
                                type="password"
                                autocomplete="on"
                                class="form-control form-control-lg"
                                placeholder="Password"
                            />
                        </fieldset>
                        <button :disabled="isSubmitting" class="btn btn-lg btn-primary pull-xs-right">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors.vue';
import { actionTypes, getterTypes } from '@/store/modules/auth';
import { mapGetters } from 'vuex';

export default {
    name: 'McvRegister',
    components: {
        McvValidationErrors,
    },
    data() {
        return {
            email: '',
            username: '',
            password: '',
        };
    },
    computed: {
        ...mapGetters({
            isSubmitting: getterTypes.isSubmitting,
            validationErrors: getterTypes.validationErrors,
        }),
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionTypes.register, {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push({
                        name: 'home',
                    });
                });
        },
    },
};
</script>

<style></style>
