<template>
    <div>
        <div class="container">
            <div class="row">
                <mcv-loading v-if="isLoading" />
            </div>
        </div>
        <mcv-article-form
            v-if="initialValues"
            :initial-values="initialValues"
            :errors="validationErrors"
            :is-submitting="isSubmitting"
            @articleSubmit="onSubmit"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { actionTypes, getterTypes } from '@/store/modules/editArticle';
import McvArticleForm from '@/components/ArticleForm.vue';
import McvLoading from '@/components/Loading.vue';

export default {
    name: 'McvEditArticle',
    components: {
        McvArticleForm,
        McvLoading,
    },
    computed: {
        ...mapGetters({
            article: getterTypes.data,
            isLoading: getterTypes.isLoading,
            isSubmitting: getterTypes.isSubmitting,
            validationErrors: getterTypes.validationErrors,
        }),
        initialValues() {
            if (!this.article) {
                return null;
            }

            return {
                title: this.article.title,
                description: this.article.description,
                body: this.article.body,
                tagList: this.article.tagList,
            };
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getArticle, { slug: this.$route.params.slug });
    },
    methods: {
        onSubmit(articleInput) {
            this.$store
                .dispatch(actionTypes.editArticle, {
                    slug: this.$route.params.slug,
                    articleInput,
                })
                .then((article) => {
                    this.$router.push({
                        name: 'article',
                        params: {
                            slug: article.slug,
                        },
                    });
                });
        },
    },
};
</script>

<style></style>
