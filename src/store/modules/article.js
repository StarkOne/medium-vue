import articleApi from '@/api/article';

const state = {
    data: null,
    isLoading: false,
    error: null,
};

export const mutationTypes = {
    getArticleStart: '[Article] getArticleStart',
    getArticleSuccess: '[Article] getArticleSuccess',
    getArticleFailure: '[Article] getArticleFailure',
};

const mutations = {
    [mutationTypes.getArticleStart](state) {
        state.isLoading = true;
        state.data = null;
        state.error = null;
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getArticleFailure](state, payload) {
        state.isLoading = false;
        state.error = payload;
    },
};

export const actionTypes = {
    getArticle: '[Article] getArticle',
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
};

export const getterTypes = {
    data: '[Article] data',
    isLoading: '[Article] isLoading',
    error: '[Article] error',
};

const getters = {
    [getterTypes.data]: (state) => {
        return state.data;
    },
    [getterTypes.isLoading]: (state) => {
        return Boolean(state.isLoading);
    },
    [getterTypes.error]: (state) => {
        return state.error;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
