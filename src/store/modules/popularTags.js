import popularTagsApi from '@/api/popularTags';

const state = {
    data: null,
    isLoading: false,
    error: null,
};

export const mutationTypes = {
    getPopularTagsStart: '[PopularTags] getPopularTagsStart',
    getPopularTagsSuccess: '[PopularTags] getPopularTagsSuccess',
    getPopularTagsFailure: '[PopularTags] getPopularTagsFailure',
};

const mutations = {
    [mutationTypes.getPopularTagsStart](state) {
        state.isLoading = true;
        state.data = null;
        state.error = null;
    },
    [mutationTypes.getPopularTagsSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getPopularTagsFailure](state, payload) {
        state.isLoading = false;
        state.error = payload;
    },
};

export const actionTypes = {
    getPopularTags: '[PopularTags] getPopularTags',
};

const actions = {
    [actionTypes.getPopularTags](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getPopularTagsStart);
            popularTagsApi
                .getPopularTags()
                .then((tags) => {
                    context.commit(mutationTypes.getPopularTagsSuccess, tags);
                    resolve(tags);
                })
                .catch((error) => {
                    context.commit(mutationTypes.getPopularTagsFailure, error);
                });
        });
    },
};

export const getterTypes = {
    data: '[PopularTags] data',
    isLoading: '[PopularTags] isLoading',
    error: '[PopularTags] error',
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
