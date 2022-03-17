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

    deleteArticleStart: '[Article] deleteArticleStart',
    deleteArticleSuccess: '[Article] deleteArticleSuccess',
    deleteArticleFailure: '[Article] deleteArticleFailure',
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

    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSuccess]() {},
    [mutationTypes.deleteArticleFailure]() {},
};

export const actionTypes = {
    getArticle: '[Article] getArticle',
    deleteArticle: '[Article] deleteArticle',
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

    [actionTypes.deleteArticle](context, { slug }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteArticleStart, slug);
            articleApi
                .deleteArticle(slug)
                .then(() => {
                    context.commit(mutationTypes.deleteArticleSuccess);
                    resolve();
                })
                .catch((error) => {
                    context.commit(mutationTypes.deleteArticleFailure, error);
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
