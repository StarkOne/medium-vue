<template>
    <div class="article-page">
        <div v-if="article" class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>
                <div class="article-meta">
                    <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
                        <img :src="article.author.image" alt="user_image" />
                    </router-link>
                    <div class="info">
                        <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <span v-if="isAuthor">
                        <router-link
                            class="btn btn-sm btn-outline-secondary"
                            :to="{ name: 'editArticle', params: { slug: article.slug } }"
                        >
                            <i class="ion-edit"></i> Edit Article
                        </router-link>
                        <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteArticle">
                            <i class="ion-trash-a"></i> Delete Article
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <div class="container page">
            <mcv-loading v-if="isLoading" />
            <mcv-error v-if="error" />

            <div v-if="article" class="row article-content">
                <div class="col-xs-12">
                    <div>
                        <p>{{ article.body }}</p>
                    </div>
                    <mcv-tags-list :tags-list="article.tagList" />
                </div>
            </div>

            <hr />

            <div v-if="article" class="article-actions">
                <div class="article-meta">
                    <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
                        <img :src="article.author.image" alt="user_image" />
                    </router-link>
                    <div class="info">
                        <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <span v-if="isAuthor">
                        <router-link
                            class="btn btn-sm btn-outline-secondary"
                            :to="{ name: 'editArticle', params: { slug: article.slug } }"
                        >
                            <i class="ion-edit"></i> Edit Article
                        </router-link>
                        <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteArticle">
                            <i class="ion-trash-a"></i> Delete Article
                        </button>
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { actionTypes as articleActionTypes } from '@/store/modules/article';
import { mapGetters } from 'vuex';
import { getterTypes as articleGetterTypes } from '@/store/modules/article';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import McvLoading from '@/components/Loading.vue';
import McvError from '@/components/Error.vue';
import McvTagsList from '@/components/TagsList.vue';

export default {
    name: 'McvArticle',
    components: {
        McvLoading,
        McvError,
        McvTagsList,
    },
    computed: {
        ...mapGetters({
            article: articleGetterTypes.data,
            isLoading: articleGetterTypes.isLoading,
            error: articleGetterTypes.error,
            isLoggedIn: authGetterTypes.isLoggedIn,
            currentUser: authGetterTypes.currentUser,
        }),
        isAuthor() {
            if (!this.article || !this.currentUser) {
                return false;
            }
            return this.currentUser.username === this.article.author.username;
        },
    },
    mounted() {
        this.$store.dispatch(articleActionTypes.getArticle, { slug: this.$route.params.slug });
    },
    methods: {
        deleteArticle() {
            this.$store.dispatch(articleActionTypes.deleteArticle, { slug: this.$route.params.slug }).then(() => {
                this.$router.push({
                    name: 'globalFeed',
                });
            });
        },
    },
};
</script>

<style></style>
