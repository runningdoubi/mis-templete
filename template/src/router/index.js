import Vue from 'vue';
import Router from 'vue-router';
import app from '@/app';

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',
    hashbang: false,
    routes: [
        {
            path: '/',
            name: 'app',
            component: app
        }
    ]
})
