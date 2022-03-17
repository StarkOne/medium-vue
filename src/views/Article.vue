<template>
    <div class="article-page">
        <div class="banner">
            <div v-if="article" class="container">
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
                    <span>
                        <router-link
                            class="btn btn-sm btn-outline-secondary"
                            :to="{ name: 'editArticle', params: { slug: article.slug } }"
                        >
                            <i class="ion-edit"></i> Edit Article
                        </router-link>
                        <button class="btn btn-sm btn-outline-danger">
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
                    <ul class="tag-list">
                        <li class="tag-default tag-pill tag-outline"></li>
                    </ul>
                </div>
            </div>

            <div class="article-actions">
                <div class="article-meta"></div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { actionTypes } from '@/store/modules/article';
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/article';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';
import McvLoading from '@/components/Loading.vue';
import McvError from '@/components/Error.vue';

export default {
    name: 'McvArticle',
    components: {
        McvLoading,
        McvError,
    },
    computed: {
        ...mapGetters({
            article: getterTypes.data,
            isLoading: getterTypes.isLoading,
            error: getterTypes.error,
            isLoggedIn: authGetterTypes.isLoggedIn,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getArticle, { slug: this.$route.params.slug });
    },
};
</script>

<style></style>
