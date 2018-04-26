import Vue from 'vue'
import Router from 'vue-router'
import QSfill from '@/components/QSfill'
import QSlist from '@/components/QSlist'
import QSdata from '@/components/QSdata'
import QSvaluelist from '@/components/QSvaluelist'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'QSlist',
      component: QSlist
    },
    {
      path: '/fill/:num',
      name: 'QSfill',
      component: QSfill
    },
    {
      path: '/data/:num',
      name: 'QSdata',
      component: QSdata
    },
    {
      path: '/data',
      name: 'QSvaluelist',
      component: QSvaluelist
    }
  ]
})
