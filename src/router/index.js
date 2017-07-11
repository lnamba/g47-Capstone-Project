import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '@/components/Home';
import ReadComp from '@/components/ReadComp'
import ListenComp from '@/components/ListenComp'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // routes
    { name: 'home', path: '/', props: true, component: Home },
    { name: 'reading-comprehension', path: '/read', props: true, component: ReadComp },
    { name: 'listening-comprehension', path: '/listen', props: true, component: ListenComp },
  ],
});
