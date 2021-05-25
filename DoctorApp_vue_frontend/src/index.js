import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import VCalendar from "v-calendar";
import VueToastr from "vue-toastr";
// import "v-calendar/lib/v-calendar.min.css";

Vue.use(VeeValidate);
// use plugin
Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
});


// import { setupCalendar} from 'v-calendar'

// // main.js
// setupCalendar({
//   componentPrefix: 'vc'
// });
Vue.use(VCalendar);


// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});