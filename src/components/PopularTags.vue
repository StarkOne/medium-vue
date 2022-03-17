<template>
    <div class="sidebar">
        <mcv-loading v-if="isLoading" />
        <mcv-error v-if="error" />

        <div v-if="popularTags && popularTags.length">
            <p>Popular Tags</p>
            <div class="tag-list">
                <router-link
                    v-for="(popularTag, index) in popularTags"
                    :key="index"
                    class="tag-default tag-pill"
                    :to="{ name: 'tag', params: { slug: popularTag } }"
                >
                    {{ popularTag }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import McvLoading from '@/components/Loading.vue';
import McvError from '@/components/Error.vue';

import { actionTypes } from '@/store/modules/popularTags';
import { getterTypes } from '@/store/modules/popularTags';

export default {
    name: 'McvPopularTags',
    components: {
        McvLoading,
        McvError,
    },
    computed: {
        ...mapGetters({
            popularTags: getterTypes.data,
            isLoading: getterTypes.isLoading,
            error: getterTypes.error,
        }),
    },
    mounted() {
        this.fetchTags();
    },
    methods: {
        fetchTags() {
            this.$store.dispatch(actionTypes.getPopularTags);
        },
    },
};
</script>

<style></style>
