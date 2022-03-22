import addToFavoritesApi from '@/api/addToFavorites';

export const mutationTypes = {
    addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
    addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
    addToFavoritesFailure: '[addToFavorites] addToFavoritesFailure',
};

const mutations = {
    [mutationTypes.addToFavoritesStart]() {},
    [mutationTypes.addToFavoritesSuccess]() {},
    [mutationTypes.addToFavoritesFailure]() {},
};

export const actionTypes = {
    addToFavorites: '[addToFavorites] addToFavorites',
};

const actions = {
    [actionTypes.addToFavorites](context, { slug, isFavorited }) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.addToFavoritesStart);
            const promise = isFavorited
                ? addToFavoritesApi.removeFromFavorites(slug)
                : addToFavoritesApi.addToFavorites(slug);

            promise
                .then((article) => {
                    context.commit(mutationTypes.addToFavoritesSuccess, article);
                    resolve(article);
                })
                .catch((error) => {
                    context.commit(mutationTypes.addToFavoritesFailure, error);
                });
        });
    },
};

export default {
    mutations,
    actions,
};
