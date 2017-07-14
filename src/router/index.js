import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '@/components/Home';
import ChineseComp from '@/components/ChineseComp'
import EnglishComp from '@/components/EnglishComp'
import ListenComp from '@/components/ListenComp'
import Sentences from '@/components/Sentences'
import Summary from '@/components/Summary'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // routes
    { name: 'home', path: '/', props: true, component: Home },
    { name: 'sentences', path: '/sentences', props: true, component: Sentences },
    { name: 'summary', path: '/summary', props: true, component: Summary },
  ],
});
