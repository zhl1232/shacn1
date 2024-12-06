<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
  department: z.string().min(1, '请选择部门'),
  position: z.string().min(1, '请输入职位')
})

const userInfo = ref({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  department: '技术部',
  position: '高级工程师',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan'
})

const isEditing = ref(false)
const editForm = ref({ ...userInfo.value })
const errors = ref<Record<string, string>>({})

const departments = [
  '技术部',
  '产品部',
  '设计部',
  '运营部',
  '市场部',
  '人力资源部'
]

const handleEdit = () => {
  isEditing.value = true
  editForm.value = { ...userInfo.value }
}

const handleCancel = () => {
  isEditing.value = false
  errors.value = {}
}

const handleSave = async () => {
  try {
    errors.value = {}
    userSchema.parse(editForm.value)
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    userInfo.value = { ...editForm.value }
    isEditing.value = false
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        if (err.path[0]) {
          errors.value[err.path[0] as string] = err.message
        }
      })
    }
  }
}
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">个人中心</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="mt-8">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">个人信息</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">您的个人信息和账号设置</p>
            </div>
            <div>
              <template v-if="!isEditing">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="handleEdit"
                >
                  <span class="i-heroicons-pencil-square mr-2"></span>
                  编辑信息
                </button>
              </template>
              <template v-else>
                <div class="space-x-3">
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="handleSave"
                  >
                    <span class="i-heroicons-check mr-2"></span>
                    保存
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="handleCancel"
                  >
                    <span class="i-heroicons-x-mark mr-2"></span>
                    取消
                  </button>
                </div>
              </template>
            </div>
          </div>

          <div class="border-t border-gray-200">
            <dl>
              <!-- 头像 -->
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">头像</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="flex items-center">
                    <img
                      :src="userInfo.avatar"
                      alt="User avatar"
                      class="h-20 w-20 rounded-full"
                    />
                    <button
                      v-if="isEditing"
                      type="button"
                      class="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      更换头像
                    </button>
                  </div>
                </dd>
              </div>

              <!-- 姓名 -->
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">姓名</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template v-if="!isEditing">{{ userInfo.name }}</template>
                  <template v-else>
                    <input
                      type="text"
                      v-model="editForm.name"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      :class="{ 'border-red-500': errors.name }"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
                  </template>
                </dd>
              </div>

              <!-- 邮箱 -->
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">邮箱</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template v-if="!isEditing">{{ userInfo.email }}</template>
                  <template v-else>
                    <input
                      type="email"
                      v-model="editForm.email"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      :class="{ 'border-red-500': errors.email }"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                  </template>
                </dd>
              </div>

              <!-- 手机号 -->
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">手机号</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template v-if="!isEditing">{{ userInfo.phone }}</template>
                  <template v-else>
                    <input
                      type="tel"
                      v-model="editForm.phone"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      :class="{ 'border-red-500': errors.phone }"
                    />
                    <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
                  </template>
                </dd>
              </div>

              <!-- 部门 -->
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">部门</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template v-if="!isEditing">{{ userInfo.department }}</template>
                  <template v-else>
                    <select
                      v-model="editForm.department"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      :class="{ 'border-red-500': errors.department }"
                    >
                      <option value="">请选择部门</option>
                      <option v-for="dept in departments" :key="dept" :value="dept">
                        {{ dept }}
                      </option>
                    </select>
                    <p v-if="errors.department" class="mt-1 text-sm text-red-500">
                      {{ errors.department }}
                    </p>
                  </template>
                </dd>
              </div>

              <!-- 职位 -->
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">职位</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template v-if="!isEditing">{{ userInfo.position }}</template>
                  <template v-else>
                    <input
                      type="text"
                      v-model="editForm.position"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      :class="{ 'border-red-500': errors.position }"
                    />
                    <p v-if="errors.position" class="mt-1 text-sm text-red-500">
                      {{ errors.position }}
                    </p>
                  </template>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 