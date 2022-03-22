import userProfileApi from '@/api/userProfile';

const state = {
    data: null,
    isLoading: false,
    error: null,
};

export const mutationTypes = {
    getUserProfileStart: '[UserProfile] getUserProfileStart',
    getUserProfileSuccess: '[UserProfile] getUserProfileSuccess',
    getUserProfileFailure: '[UserProfile] getUserProfileFailure',
};

const mutations = {
    [mutationTypes.getUserProfileStart](state) {
        state.isLoading = true;
        state.data = null;
        state.error = null;
    },
    [mutationTypes.getUserProfileSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getUserProfileFailure](state, payload) {
        state.isLoading = false;
        state.error = payload;
    },
};

export const actionTypes = {
    getUserProfile: '[UserProfile] getUserProfile',
};

const actions = {
    [actionTypes.getUserProfile](context, { slug }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getUserProfileStart);
            userProfileApi
                .getUserProfile(slug)
                .then((profile) => {
                    context.commit(mutationTypes.getUserProfileSuccess, profile);
                    resolve(profile);
                })
                .catch((error) => {
                    context.commit(mutationTypes.getUserProfileFailure, error);
                });
        });
    },
};

export const getterTypes = {
    data: '[UserProfile] data',
    isLoading: '[UserProfile] isLoading',
    error: '[UserProfile] error',
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
