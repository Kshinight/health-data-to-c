import Vue from 'vue'
import Router from 'vue-router'
import qsFill from '@/components/QSfill'
import qslist from '@/components/QSlist'
import qsData from '@/components/QSdata'
import test from '@/components/test'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'qslist',
      component: qslist
    },
    // {
    //   path: '/',
    //   name: 'test',
    //   component: test
    // },
    {
      path: '/fill/:num',
      name: 'qsFill',
      component: qsFill
    },
    {
      path: '/data',
      name: 'qsData',
      component: qsData
    },
  ]
})
