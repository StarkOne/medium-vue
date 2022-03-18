<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <mcv-validation-errors v-if="errors" :validation-errors="errors" />
                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model.trim="title"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Article Title"
                                    :disabled="isSubmitting"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model.trim="description"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="What's this article about?"
                                    :disabled="isSubmitting"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    v-model.trim="body"
                                    rows="8"
                                    class="form-control form-control-lg"
                                    placeholder="Write your article (in markdown)"
                                    :disabled="isSubmitting"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model="tagList"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Enter tags"
                                    :disabled="isSubmitting"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <button
                                    :disabled="isSubmitting"
                                    class="btn btn-lg pull-xs-right btn-primary"
                                    type="submit"
                                >
                                    Publish Article
                                </button>
                            </fieldset>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors.vue';

export default {
    name: 'McvArticleForm',
    components: {
        McvValidationErrors,
    },
    props: {
        initialValues: {
            type: Object,
            require: true,
            default() {
                return {};
            },
        },
        errors: {
            type: Object,
            require: false,
            default() {
                return {};
            },
        },
        isSubmitting: {
            type: Boolean,
            require: true,
        },
    },
    data() {
        return {
            title: this.initialValues.title,
            description: this.initialValues.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' '),
        };
    },
    methods: {
        onSubmit() {
            const form = {
                title: this.title,
                description: this.description,
                body: this.body,
                tagList: this.tagList.split(' '),
            };
            this.$emit('articleSubmit', form);
        },
    },
};
</script>

<style></style>
