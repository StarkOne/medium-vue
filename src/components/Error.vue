<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: 'McvError',
    message: {
        type: String,
        required: false,
        default() {
            return 'Something bad happened';
        },
    },
};
</script>

<style></style>
