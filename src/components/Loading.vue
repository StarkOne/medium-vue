<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: 'McvLoading',
    props: {
        message: {
            type: String,
            required: false,
            default() {
                return 'Loading...';
            },
        },
    },
};
</script>

<style></style>
