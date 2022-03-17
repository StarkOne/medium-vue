<template>
    <div>
        <mcv-loading v-if="isLoading" />
        <mcv-error v-if="error" />

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
                    <mcv-tags-list :tags-list="article.tagList" />
                </router-link>
            </div>

            <mcv-pagination :total="feed.articlesCount" :limit="limit" :currect-page="currectPage" :url="baseUrl" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { stringify, parseUrl } from 'query-string';
import { actionTypes, getterTypes } from '@/store/modules/feed';
import McvPagination from '@/components/Pagination';
import { limit } from '@/helpers/vars';
import McvLoading from '@/components/Loading.vue';
import McvError from '@/components/Error.vue';
import McvTagsList from '@/components/TagsList.vue';

export default {
    name: 'McvFeed',
    components: {
        McvPagination,
        McvLoading,
        McvError,
        McvTagsList,
    },
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            limit,
        };
    },
    computed: {
        ...mapGetters({
            feed: getterTypes.data,
            isLoading: getterTypes.isLoading,
            error: getterTypes.error,
        }),
        currectPage() {
            return parseInt(this.$route.query.page || '1');
        },
        baseUrl() {
            return this.$route.path;
        },
        offset() {
            return this.currectPage * this.limit - this.limit;
        },
    },
    watch: {
        currectPage() {
            this.fetchFeed();
        },
        apiUrl() {
            this.fetchFeed();
        },
    },
    mounted() {
        this.fetchFeed();
    },
    methods: {
        fetchFeed() {
            const parsedUrl = parseUrl(this.apiUrl);
            const stringifiedParams = stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query,
            });
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
            this.$store.dispatch(actionTypes.getFeed, {
                apiUrl: apiUrlWithParams,
            });
        },
    },
};
</script>

<style></style>
