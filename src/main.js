import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router';
import Toasted from 'vue-toasted';
import {router} from './router/router';
import {UsersService} from "@/services/local/users.service";

Vue.config.productionTip = false;

Vue.use(Toasted);
Vue.use(Router);
UsersService.init();

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
