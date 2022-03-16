<template>
    <div>
        <div v-if="isLoading" class="">Loading...</div>
        <div v-if="error" class="">Something bad happened</div>

        <div v-if="feed">
            <div v-for="(article, index) in feed.articles" class="article-preview" :key="index">
                <div class="article-meta">
                    <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
                        <img :src="article.author.image" alt="user_image" />
                    </router-link>
                    <div class="info">
                        <router-link
                            :to="{ name: 'userProfile', params: { slug: article.author.username } }"
                            class="author"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <div class="pull-xs-right">ADD to FAVORITES</div>
                </div>
                <router-link class="preview-link" :to="{ name: 'article', params: { slug: article.slug } }">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    TAG LIST
                </router-link>
            </div>
            PAGINATION
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { actionTypes, getterTypes } from '@/store/modules/feed';

export default {
    name: 'McvFeed',
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            feed: getterTypes.data,
            isLoading: getterTypes.isLoading,
            error: getterTypes.error,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getFeed, {
            apiUrl: this.apiUrl,
        });
    },
};
</script>

<style></style>
