<template>
  <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="email" class="sr-only">邮箱地址</label>
        <input
          id="email"
          v-model="formData.email"
          name="email"
          type="email"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          :class="{ 'border-red-500': errors.email }"
          placeholder="邮箱地址"
        >
        <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
      </div>
      <div>
        <label for="password" class="sr-only">密码</label>
        <input
          id="password"
          v-model="formData.password"
          name="password"
          type="password"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          :class="{ 'border-red-500': errors.password }"
          placeholder="密码"
        >
        <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          v-model="rememberMe"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        >
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
          记住我
        </label>
      </div>

      <div class="text-sm">
        <router-link
          to="/auth/forgot-password"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          忘记密码？
        </router-link>
      </div>
    </div>

    <div>
      <button
        type="submit"
        :disabled="isLoading"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :class="{ 'opacity-75 cursor-not-allowed': isLoading }"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <span
            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            :class="isLoading ? 'i-heroicons-arrow-path animate-spin' : 'i-heroicons-lock-closed'"
          ></span>
        </span>
        {{ isLoading ? '登录中...' : '登录' }}
      </button>
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600">
        还没有账号？
        <router-link
          to="/auth/register"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          立即注册
        </router-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()

const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少6个字符')
})

const formData = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)
const rememberMe = ref(false)

const handleSubmit = async () => {
  try {
    // 重置错误
    errors.value = {
      email: '',
      password: ''
    }

    // 验证表单
    loginSchema.parse(formData.value)

    // 设置加载状态
    isLoading.value = true

    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 存储 token
    localStorage.setItem('token', 'dummy-token')

    // 获取重定向地址或默认跳转到首页
    const redirect = router.currentRoute.value.query.redirect as string || '/'
    router.push(redirect)
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        if (err.path[0]) {
          errors.value[err.path[0] as keyof typeof errors.value] = err.message
        }
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script> 