<template>
    <mcv-article-form
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @articleSubmit="onSubmit"
    />
</template>

<script>
import { mapGetters } from 'vuex';

import { actionTypes, getterTypes } from '@/store/modules/createArticle';
import McvArticleForm from '@/components/ArticleForm.vue';

export default {
    name: 'McvCreateArticle',
    components: {
        McvArticleForm,
    },
    data() {
        return {
            initialValues: {
                title: '',
                description: '',
                body: '',
                tagList: [],
            },
        };
    },
    computed: {
        ...mapGetters({
            isSubmitting: getterTypes.isSubmitting,
            validationErrors: getterTypes.validationErrors,
        }),
    },
    methods: {
        onSubmit(articleInput) {
            this.$store
                .dispatch(actionTypes.createArticle, {
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
