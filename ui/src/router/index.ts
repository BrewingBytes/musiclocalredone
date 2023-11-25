import { createRouter, createWebHistory } from 'vue-router';

import Default from '@/layouts/default/Default.vue';

import Queue from '@/views/Queue.vue';
import Search from '@/views/Search.vue';

import NotFound from '@/views/NotFound.vue';

const routes = [
    {
        path: '/',
        component: Default,
        children: [
            {
                path: '',
                redirect: '/queue'
            },
            {
                path: '/queue',
                name: 'Queue',
                component: Queue
            },
            {
                path: '/search',
                name: 'Search',
                component: Search
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: NotFound
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
