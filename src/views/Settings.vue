<template>
    <div v-if="currentUser" class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />

                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model.trim="form.image"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="URL of profile picture"
                                    :disabled="isSubmitting"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model.trim="form.username"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Username"
                                    :disabled="isSubmitting"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    v-model.trim="form.bio"
                                    rows="8"
                                    class="form-control form-control-lg"
                                    placeholder="Short bio about you"
                                    :disabled="isSubmitting"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model.trim="form.email"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Email"
                                    :disabled="isSubmitting"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model.trim="form.password"
                                    type="password"
                                    class="form-control form-control-lg"
                                    placeholder="New Password"
                                    :disabled="isSubmitting"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <button
                                    :disabled="isSubmitting"
                                    class="btn btn-lg pull-xs-right btn-primary"
                                    type="submit"
                                >
                                    Update profile
                                </button>
                            </fieldset>
                        </fieldset>
                    </form>
                    <hr />
                    <button @click="logout" class="btn btn-outline-danger" type="button">
                        Or click here to logout.
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes as settingsGetterTypes } from '@/store/modules/settings';
import { getterTypes as authGetterTypes, actionTypes as authActionTypes } from '@/store/modules/auth';
import McvValidationErrors from '@/components/ValidationErrors.vue';

export default {
    name: 'McvSettings',
    components: {
        McvValidationErrors,
    },
    computed: {
        ...mapGetters({
            isSubmitting: settingsGetterTypes.isSubmitting,
            validationErrors: settingsGetterTypes.validationErrors,
            currentUser: authGetterTypes.currentUser,
        }),
        form() {
            if (!this.currentUser) {
                return {
                    username: '',
                    bio: '',
                    image: '',
                    email: '',
                    password: '',
                };
            }
            return {
                username: this.currentUser.username,
                bio: this.currentUser.bio,
                image: this.currentUser.image,
                email: this.currentUser.email,
                password: '',
            };
        },
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(authActionTypes.updateCurrentUser, {
                currentUserInput: { ...this.form },
            });
        },
        logout() {
            this.$store.dispatch(authActionTypes.logout).then(() => {
                this.$router.push({
                    name: 'globalFeed',
                });
            });
        },
    },
};
</script>

<style></style>
