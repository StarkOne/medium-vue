<template>
    <ul v-if="tagsList && tagsList.length" class="tag-list">
        <li v-for="(tag, index) in tagsList" :key="index" class="tag-default tag-pill tag-outline">{{ tag }}</li>
    </ul>
</template>

<script>
export default {
    name: 'McvTagsList',
    props: {
        tagsList: {
            type: Object,
            require: true,
        },
    },
};
</script>

<style></style>
