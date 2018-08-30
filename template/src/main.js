import 'babel-polyfill';
import Vue from 'vue';
{{#router}}
import routes from './router';
{{/router}}
{{#vuex}}
import store from './store';
{{/vuex}}
import App from './app';

Vue.config.productionTip = false

new Vue({
    el: '#app',
    {{#router}}
    router,
    {{/router}}
    {{#vuex}}
    store,
    {{/vuex}}
    components: { App },
    templete: '<App/>'
});
