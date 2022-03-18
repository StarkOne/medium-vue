import articleApi from '@/api/article';

const state = {
    data: null,
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
};

export const mutationTypes = {
    getArticleStart: '[Article] getArticleStart',
    getArticleSuccess: '[Article] getArticleSuccess',
    getArticleFailure: '[Article] getArticleFailure',

    editArticleStart: '[editArticle] editArticleStart',
    editArticleSuccess: '[editArticle] editArticleSuccess',
    editArticleFailure: '[editArticle] editArticleFailure',
};

const mutations = {
    [mutationTypes.getArticleStart](state) {
        state.isLoading = true;
        state.data = null;
        state.validationErrors = null;
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getArticleFailure](state, payload) {
        state.isLoading = false;
        state.validationErrors = payload;
    },

    [mutationTypes.editArticleStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.editArticleSuccess](state) {
        state.isSubmitting = false;
    },
    [mutationTypes.editArticleFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
};

export const actionTypes = {
    getArticle: '[editArticle] getArticle',
    editArticle: '[editArticle] editArticle',
};

const actions = {
    [actionTypes.getArticle](context, { slug }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getArticleStart, slug);
            articleApi
                .getArticle(slug)
                .then((article) => {
                    context.commit(mutationTypes.getArticleSuccess, article);
                    resolve(article);
                })
                .catch((error) => {
                    context.commit(mutationTypes.getArticleFailure, error);
                });
        });
    },
    [actionTypes.editArticle](context, { slug, articleInput }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.editArticleStart);
            articleApi
                .updateArticle(slug, articleInput)
                .then((article) => {
                    context.commit(mutationTypes.editArticleSuccess, article);
                    resolve(article);
                })
                .catch((result) => {
                    context.commit(mutationTypes.editArticleFailure, result.response.data.errors);
                });
        });
    },
};

export const getterTypes = {
    data: '[editArticle] data',
    isLoading: '[editArticle] isLoading',
    isSubmitting: '[editArticle] isSubmitting',
    validationErrors: '[editArticle] validationErrors',
};

const getters = {
    [getterTypes.data]: (state) => {
        return state.data;
    },
    [getterTypes.isLoading]: (state) => {
        return Boolean(state.isLoading);
    },
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
