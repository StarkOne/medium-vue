import articleApi from '@/api/article';

const state = {
    isSubmitting: false,
    validationErrors: null,
};

export const mutationTypes = {
    createArticleStart: '[createArticle] createArticleStart',
    createArticleSuccess: '[createArticle] createArticleSuccess',
    createArticleFailure: '[createArticle] createArticleFailure',
};

const mutations = {
    [mutationTypes.createArticleStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.createArticleSuccess](state) {
        state.isSubmitting = false;
    },
    [mutationTypes.createArticleFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
};

export const actionTypes = {
    createArticle: '[createArticle] createArticle',
};

const actions = {
    [actionTypes.createArticle](context, { articleInput }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.createArticleStart);
            articleApi
                .createArticle(articleInput)
                .then((article) => {
                    context.commit(mutationTypes.createArticleSuccess, article);
                    resolve(article);
                })
                .catch((result) => {
                    context.commit(mutationTypes.createArticleFailure, result.response.data.errors);
                });
        });
    },
};

export const getterTypes = {
    isSubmitting: '[createArticle] isSubmitting',
    validationErrors: '[createArticle] validationErrors',
};

const getters = {
    [getterTypes.isSubmitting]: (state) => {
        return state.isSubmitting;
    },
    [getterTypes.validationErrors]: (state) => {
        return state.validationErrors;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
