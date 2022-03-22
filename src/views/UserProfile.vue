<template>
    <div>
        <mcv-loading v-if="isLoading" />
        <mcv-error v-if="error" />
        <div v-if="userProfile" class="profile-page">
            <div class="user-info">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-md-10 offset-md-1">
                            <img :src="userProfile.image" class="user-img" alt="user-img" />
                            <h4>{{ userProfile.username }}</h4>
                            <p>{{ userProfile.bio }}</p>
                            <router-link
                                v-if="isCurrentUserProfile"
                                class="btn btn-sm btn-outline-secondary action-btn"
                                :to="{ name: 'settings' }"
                                ><i class="ion-gear-a"></i> Edit Profile Settings
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="userProfile" class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'userProfile', params: { slug: userProfile.username } }"
                                    active-class="active"
                                >
                                    My Articles
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'userProfileFavorites', params: { slug: userProfile.username } }"
                                    active-class="active"
                                >
                                    Favorited Articles
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <mcv-feed :api-url="apiUrl" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes as userProfileGetterTypes, actionTypes } from '@/store/modules/userProfile';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import McvLoading from '@/components/Loading.vue';
import McvError from '@/components/Error.vue';
import McvFeed from '@/components/Feed.vue';

export default {
    name: 'McvUserProfile',
    components: {
        McvLoading,
        McvError,
        McvFeed,
    },
    computed: {
        ...mapGetters({
            userProfile: userProfileGetterTypes.data,
            isLoading: userProfileGetterTypes.isLoading,
            error: userProfileGetterTypes.error,
            currentUser: authGetterTypes.currentUser,
        }),
        slug() {
            return this.$route.params.slug;
        },
        isCurrentUserProfile() {
            if (!this.currentUser || !this.userProfile) {
                return false;
            }
            return this.currentUser.username === this.userProfile.username;
        },
        apiUrl() {
            const isFavorites = this.$route.path.includes('favorites');
            return isFavorites ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`;
        },
    },
    watch: {
        slug() {
            this.getUserProfile();
        },
    },
    mounted() {
        this.getUserProfile();
    },
    methods: {
        getUserProfile() {
            this.$store.dispatch(actionTypes.getUserProfile, {
                slug: this.slug,
            });
        },
    },
};
</script>

<style></style>
