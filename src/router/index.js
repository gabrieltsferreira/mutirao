import Vue from 'vue'
import Router from 'vue-router'

//Views
import LoginPage from '@/views/LoginPage'
import GroupOptionsPage from '@/views/GroupOptionsPage'
import CreateGroupPage from '@/views/CreateGroupPage'
import JoinGroupPage from '@/views/JoinGroupPage'
import MainTabs from '@/views/MainTabs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/groupOptions',
      name: 'GroupOptionsPage',
      component: GroupOptionsPage
    },
    {
      path: '/createGroup',
      name: 'CreateGroupPage',
      component: CreateGroupPage
    },
    {
      path: '/joinGroup',
      name: 'JoinGroupPage',
      component: JoinGroupPage
    },
    {
      path: '/main/:id',
      name: 'MainTabs',
      component: MainTabs,
      props: true 
    }
  ]
})
