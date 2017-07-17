// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jQuery from 'jquery';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTruncate from 'vue-truncate-filter';
import ChineseComp from '@/components/ChineseComp';
import EnglishComp from '@/components/EnglishComp';
import ListenComp from '@/components/ListenComp';
import { store } from './Store';
import * as d3 from "d3";

window.jQuery = jQuery;
window.$ = jQuery;

require('motion-ui');
require('what-input');
require('foundation-sites');

Vue.use(VueAxios, axios)
Vue.use(require('vue-cookies'))
Vue.use(d3)

Vue.component('chinese-comprehension', ChineseComp);
Vue.component('english-comprehension', EnglishComp);
Vue.component('listening-comprehension', ListenComp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
