import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '@/components/Home';
import ChineseComp from '@/components/ChineseComp'
import EnglishComp from '@/components/EnglishComp'
import ListenComp from '@/components/ListenComp'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // routes
    { name: 'home', path: '/', props: true, component: Home },
    { name: 'chinese-comprehension', path: '/readcomp1', props: true, component: ChineseComp },
    { name: 'english-comprehension', path: '/readcomp2', props: true, component: EnglishComp },
    { name: 'listening-comprehension', path: '/listen', props: true, component: ListenComp },
  ],
});
