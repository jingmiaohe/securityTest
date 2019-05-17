import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: resolve => require(['@/view/login/index.vue'], resolve)
    },
    {
      name:'data',
      path: '/data',
      component: resolve => require(['../view/data/index.vue'], resolve),
      meta: { role: 'student'}
    },
    {
      name:'notice',
      path: '/notice',
      component: resolve => require(['../view/test/notice.vue'], resolve),
      meta: { role: 'student'}
    },
    {
      name:'test',
      path: '/test',
      component: resolve => require(['../view/test/index.vue'], resolve),
      meta: { role: 'student'}
    },
    {
      name:'wrongPage',
      path: '/wrongPage',
      component: resolve => require(['../view/test/wrongPage.vue'], resolve),
      meta: { role: 'student'}
    },
    {
      name:'score',
      path: '/score',
      component: resolve => require(['../view/test/score.vue'], resolve),
      meta: { role: 'student'}
    },
    {
      name:'teacher',
      path: '/teacher',
      component: resolve => require(['../view/teacher/index.vue'], resolve),
      meta: { role: 'admin'}
    },
    {
      name:'studentBank',
      path: '/studentBank',
      component: resolve => require(['../view/teacher/studentBank.vue'], resolve),
      meta: { role: 'admin'}
    },
    {
      name:'questionBank',
      path: '/questionBank',
      component: resolve => require(['../view/teacher/questionBank.vue'], resolve),
      meta: { role: 'admin'}
    },
    {
      name:'noticeBank',
      path: '/noticeBank',
      component: resolve => require(['../view/teacher/noticeBank.vue'], resolve),
      meta: { role: 'admin'}
    },
    {
      name:'404',
      path: '/404',
      component: resolve => require(['../view/errorPage/404.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
