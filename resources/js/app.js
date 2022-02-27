
require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import {routes} from "./routes";

import Swal from 'sweetalert2'
window.Swal=Swal;
// const Swal = require('sweetalert2')
// import Swal from 'sweetalert2/dist/sweetalert2.js'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.Toast= Toast;
window.Reload = new Vue();


import User from './Helpers/User';
window.User = User

// import Notifycation from "./Helpers/Notifycation";
// window.Notification= Notifycation

const router=new VueRouter({
    mode:'history',
    routes
})
console.log(router)
const app = new Vue({
    el: '#app',
    router

});
