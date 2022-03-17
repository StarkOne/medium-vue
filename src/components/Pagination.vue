<template>
    <ul class="pagination">
        <li v-for="page in pages" :key="page" class="page-item" :class="{ active: currectPage === page }">
            <router-link class="page-link" :to="{ path: url, query: { page: page } }">{{ page }}</router-link>
        </li>
    </ul>
</template>

<script>
import { range } from '@/helpers/utils';
export default {
    name: 'McvPagination',
    props: {
        total: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        currectPage: {
            type: Number,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    computed: {
        pages() {
            const pagesCount = Math.ceil(this.total / this.limit);
            return range(1, pagesCount);
        },
    },
};
</script>

<style></style>
