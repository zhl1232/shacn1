<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()

const registerSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少6个字符'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "两次输入的密码不一致",
  path: ["confirmPassword"]
})

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const agreeToTerms = ref(false)

const handleSubmit = async () => {
  try {
    // 重置错误
    errors.value = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    // 验证表单
    registerSchema.parse(formData.value)

    if (!agreeToTerms.value) {
      throw new Error('请同意服务条款和隐私政策')
    }

    // 设置加载状态
    isLoading.value = true

    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 存储 token
    localStorage.setItem('token', 'dummy-token')

    // 注册成功后跳转到首页
    router.push('/')
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        if (err.path[0]) {
          errors.value[err.path[0] as keyof typeof errors.value] = err.message
        }
      })
    } else if (error instanceof Error) {
      errors.value.confirmPassword = error.message
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
    <div class="rounded-md shadow-sm -space-y-px">
      <!-- 姓名 -->
      <div>
        <label for="name" class="sr-only">姓名</label>
        <input
          id="name"
          v-model="formData.name"
          name="name"
          type="text"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          :class="{ 'border-red-500': errors.name }"
          placeholder="姓名"
        >
        <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
      </div>

      <!-- 邮箱 -->
      <div>
        <label for="email" class="sr-only">邮箱地址</label>
        <input
          id="email"
          v-model="formData.email"
          name="email"
          type="email"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          :class="{ 'border-red-500': errors.email }"
          placeholder="邮箱地址"
        >
        <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
      </div>

      <!-- 密码 -->
      <div>
        <label for="password" class="sr-only">密码</label>
        <input
          id="password"
          v-model="formData.password"
          name="password"
          type="password"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          :class="{ 'border-red-500': errors.password }"
          placeholder="密码"
        >
        <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
      </div>

      <!-- 确认密码 -->
      <div>
        <label for="confirm-password" class="sr-only">确认密码</label>
        <input
          id="confirm-password"
          v-model="formData.confirmPassword"
          name="confirm-password"
          type="password"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          :class="{ 'border-red-500': errors.confirmPassword }"
          placeholder="确认密码"
        >
        <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-500">
          {{ errors.confirmPassword }}
        </p>
      </div>
    </div>

    <div class="flex items-center">
      <input
        id="agree-terms"
        v-model="agreeToTerms"
        name="agree-terms"
        type="checkbox"
        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      >
      <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
        我已阅读并同意
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          服务条款
        </a>
        和
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          隐私政策
        </a>
      </label>
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
            :class="isLoading ? 'i-heroicons-arrow-path animate-spin' : 'i-heroicons-user-plus'"
          ></span>
        </span>
        {{ isLoading ? '注册中...' : '注册' }}
      </button>
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600">
        已有账号？
        <router-link
          to="/auth/login"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          立即登录
        </router-link>
      </p>
    </div>
  </form>
</template> 