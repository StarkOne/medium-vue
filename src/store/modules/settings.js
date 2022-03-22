import { mutationTypes as authMutationTypes } from '@/store/modules/auth';

const state = {
    isSubmitting: false,
    validationErrors: null,
};

const mutations = {
    [authMutationTypes.updateCurrentUserStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [authMutationTypes.updateCurrentUserSuccess](state) {
        state.isSubmitting = false;
    },
    [authMutationTypes.updateCurrentUserFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
};

export const getterTypes = {
    isSubmitting: '[settings] isSubmitting',
    validationErrors: '[settings] validationErrors',
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
    getters,
};
