import { createRouter, createWebHashHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';
import Register from '@/views/Register';
import Login from '@/views/Login';

const routes = [
    {
        path: '/',
        name: 'globalFeed',
        component: GlobalFeed,
    },
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
        path: '/login',
        name: 'settings',
        component: Login,
    },
    {
        path: '/login',
        name: 'createArticle',
        component: Login,
    },
    {
        path: '/userProfile/:slug',
        name: 'userProfile',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
