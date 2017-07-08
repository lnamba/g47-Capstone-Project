import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '@/components/Home';
import ReadComp from '@/components/ReadComp'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // routes
    { name: 'home', path: '/', component: Home },
    { name: 'reading-comprehension', path: '/read', component: ReadComp },
  ],
});
