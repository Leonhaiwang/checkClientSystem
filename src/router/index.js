import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '../views/HelloWorld.vue'
import index from '../views/index.vue'
import watchtime from '../views/watchtime.vue';
import login from '../views/login.vue'
import usermanage from '../views/usermanage.vue'
import Home from '../views/home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect:'/home',
    component: index,
    children:[
      {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component:HelloWorld
      },
      {
        path: '/watchtime',
        name: 'watchtime',
        component:watchtime
      },
      {
        path: '/usermanage',
        name: 'usermanage',
        component:usermanage
      },
      {
        path: '/home',
        name: 'home',
        component:Home
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component:login
  },
  
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      let token = localStorage.getItem('token')
      if (token) {
        next('/home')
      } else {
        next()
      }
    }
    else{
      let token = localStorage.getItem('token')
        if (!token) {
          next('/login')
        } else {
          next()
        }
    }
    if(to.path === '/usermanage'){
      if(sessionStorage.getItem('admin')){
        next()
      }else{
        next('/')
      }
    }
})


export default router
