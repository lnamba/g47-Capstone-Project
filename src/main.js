// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jQuery from 'jquery';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTruncate from 'vue-truncate-filter';
import GetSentences from './mixins/GetSentences';

window.jQuery = jQuery;
window.$ = jQuery;

require('motion-ui');
require('what-input');
require('foundation-sites');

Vue.use(VueAxios, axios)
Vue.use(require('vue-cookies'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
