import { createRouter, createWebHashHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';
import Register from '@/views/Register';
import Login from '@/views/Login';

const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        name: 'globalFeed',
        component: GlobalFeed,
    },
    {
        path: '/',
        name: 'yourFeed',
        component: GlobalFeed,
    },
    {
        path: '/tags/:slug',
        name: 'tag',
        component: GlobalFeed,
    },
    {
        path: '/articles/new',
        name: 'createArticle',
        component: Login,
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: Login,
    },
    {
        path: '/articles/:slug/edit',
        name: 'editArticle',
        component: Login,
    },
    {
        path: '/settings',
        name: 'settings',
        component: Login,
    },
    {
        path: '/profile/:slug',
        name: 'userProfile',
        component: Login,
    },
    {
        path: '/profile/:slug/favorites',
        name: 'userProfileFavorites',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
