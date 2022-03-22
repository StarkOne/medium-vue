<template>
    <button
        @click="handleLike"
        class="btn btn-sm"
        :class="{
            'btn-outline-primary': !isFavoritedOptimistic,
            'btn-primary': isFavoritedOptimistic,
        }"
    >
        <i class="ion-heart"></i><span>&nbsp; {{ favoritesCountOptimistic }}</span>
    </button>
</template>

<script>
import { actionTypes } from '@/store/modules/addToFavorites';
export default {
    name: 'McvAddToFavorites',
    props: {
        isFavorited: {
            type: Boolean,
            require: true,
        },
        articleSlug: {
            type: String,
            require: true,
        },
        favoritesCount: {
            type: Number,
            require: true,
        },
    },
    data() {
        return {
            isFavoritedOptimistic: this.isFavorited,
            favoritesCountOptimistic: this.favoritesCount,
        };
    },
    methods: {
        handleLike() {
            this.$store.dispatch(actionTypes.addToFavorites, {
                slug: this.articleSlug,
                isFavorited: this.isFavoritedOptimistic,
            });
            if (this.isFavoritedOptimistic) {
                this.favoritesCountOptimistic--;
            } else {
                this.favoritesCountOptimistic++;
            }
            this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
        },
    },
};
</script>

<style></style>
