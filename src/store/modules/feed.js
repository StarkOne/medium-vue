import feedApi from '@/api/feed';

const state = {
    data: null,
    isLoading: false,
    error: null,
};

export const mutationTypes = {
    getFeedStart: '[feed] getFeedStart',
    getFeedSuccess: '[feed] getFeedSuccess',
    getFeedFailure: '[feed] getFeedFailure',
};

const mutations = {
    [mutationTypes.getFeedStart](state) {
        state.isLoading = true;
        state.data = null;
        state.error = null;
    },
    [mutationTypes.getFeedSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getFeedFailure](state, payload) {
        state.isLoading = false;
        state.error = payload;
    },
};

export const actionTypes = {
    getFeed: '[feed] getFeed',
};

const actions = {
    [actionTypes.getFeed](context, { apiUrl }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getFeedStart);
            feedApi
                .getFeed(apiUrl)
                .then((response) => {
                    context.commit(mutationTypes.getFeedSuccess, response.data);
                    resolve(response.data.articles);
                })
                .catch((error) => {
                    context.commit(mutationTypes.getFeedFailure, error);
                });
        });
    },
};

export const getterTypes = {
    data: '[feed] data',
    isLoading: '[feed] isLoading',
    error: '[feed] error',
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
