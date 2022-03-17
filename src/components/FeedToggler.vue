<template>
    <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="isLoggedIn">
                <router-link class="nav-link" active-class="active" :to="{ name: 'yourFeed' }">Your Feed</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" active-class="active" :to="{ name: 'globalFeed' }">
                    Global Feed
                </router-link>
            </li>
            <li class="nav-item" v-if="tagName">
                <router-link class="nav-link" active-class="active" :to="{ name: 'tag', params: { slug: tagName } }">
                    <i class="ion-pound"></i> {{ tagName }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { getterTypes } from '@/store/modules/auth';
import { mapGetters } from 'vuex';

export default {
    name: 'McvFeedToggler',
    props: {
        tagName: {
            type: String,
            required: false,
            default: null,
        },
    },
    computed: {
        ...mapGetters({
            isLoggedIn: getterTypes.isLoggedIn,
        }),
    },
};
</script>

<style></style>
