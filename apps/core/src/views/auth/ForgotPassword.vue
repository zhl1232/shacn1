<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址')
})

const formData = ref({
  email: ''
})

const error = ref('')
const isLoading = ref(false)
const isEmailSent = ref(false)

const handleSubmit = async () => {
  try {
    error.value = ''
    
    // 验证邮箱
    emailSchema.parse(formData.value)
    
    // 设置加载状态
    isLoading.value = true
    
    // 模拟发送重置密码邮件
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新状态
    isEmailSent.value = true
  } catch (err) {
    if (err instanceof z.ZodError) {
      error.value = err.errors[0].message
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="!isEmailSent">
      <div class="text-sm text-gray-600 mt-2 mb-8">
        请输入您的邮箱地址，我们将向您发送重置密码的链接。
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="sr-only">邮箱地址</label>
          <input
            id="email"
            v-model="formData.email"
            name="email"
            type="email"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            :class="{ 'border-red-500': error }"
            placeholder="邮箱地址"
          >
          <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
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
                :class="isLoading ? 'i-heroicons-arrow-path animate-spin' : 'i-heroicons-envelope'"
              ></span>
            </span>
            {{ isLoading ? '发送中...' : '发送重置链接' }}
          </button>
        </div>
      </form>
    </div>

    <div v-else class="text-center">
      <span class="i-heroicons-check-circle text-5xl text-green-500"></span>
      <h3 class="mt-4 text-lg font-medium text-gray-900">重置链接已发送</h3>
      <p class="mt-2 text-sm text-gray-600">
        我们已向 {{ formData.email }} 发送了重置密码的链接，请查收邮件并按照提示操作。
      </p>
      <div class="mt-6">
        <router-link
          to="/auth/login"
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          返回登录
        </router-link>
      </div>
    </div>

    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        记起密码了？
        <router-link
          to="/auth/login"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          立即登录
        </router-link>
      </p>
    </div>
  </div>
</template> 