import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../views/layouts/DefaultLayout.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/pages/Home.vue')
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/pages/dashboard/Example.vue'),
          meta: {
            title: '仪表盘',
            requiresAuth: true
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/pages/Profile.vue'),
          meta: {
            title: '个人中心',
            requiresAuth: true
          }
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/pages/Settings.vue'),
          meta: {
            title: '系统设置',
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('../views/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/Login.vue'),
          meta: {
            title: '登录'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/Register.vue'),
          meta: {
            title: '注册'
          }
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPassword.vue'),
          meta: {
            title: '忘记密码'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/pages/NotFound.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - 管理系统` || '管理系统'
  
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    // 这里添加你的认证逻辑
    const isAuthenticated = localStorage.getItem('token')
    if (!isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router 