import { createRouter, createWebHashHistory } from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';
import YourFeed from '@/views/YourFeed.vue';
import TagFeed from '@/views/TagFeed.vue';
import Register from '@/views/Register';
import Login from '@/views/Login';
import CreateArticle from '@/views/CreateArticle';
import Article from '@/views/Article';

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
        path: '/feed',
        name: 'yourFeed',
        component: YourFeed,
    },
    {
        path: '/tags/:slug',
        name: 'tag',
        component: TagFeed,
    },
    {
        path: '/articles/new',
        name: 'createArticle',
        component: CreateArticle,
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: Article,
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
