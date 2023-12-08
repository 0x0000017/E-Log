import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store';
import Home from '../components/Home.vue';
import ChooseVehicle from '../components/ChooseVehicle.vue';
import ChooseParkingSpot from '../components/ChooseParkingSpot.vue';
import SubmitForm from '../components/SubmitForm.vue';
import MainMenu from '../components/MainMenu.vue';
import Logs from '../components/Logs.vue';
import Login from '../components/Login.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/choose-vehicle',
    name: 'chooseVehicle',
    component: ChooseVehicle
  },
  {
    path: '/menu',
    name: 'mainMenu',
    component: MainMenu,
  },
  {
    path: '/choose-parking-spot/:vehicleType',
    name: 'chooseParkingSpot',
    component: ChooseParkingSpot 
  },
  {
    path: '/submit-form/:vehicleType/:spot',
    name: 'submitForm',
    component: SubmitForm
  },
  {
    path: '/logs',
    name: 'logs',
    component: Logs
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('Is logged in?', store.state.isLoggedIn);
  next();
});

export default router
