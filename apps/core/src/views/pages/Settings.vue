<script setup lang="ts">
import { ref } from 'vue'

interface Setting {
  id: string
  title: string
  description: string
  enabled: boolean
}

// 通知设置
const notificationSettings = ref<Setting[]>([
  {
    id: 'email-notifications',
    title: '邮件通知',
    description: '接收重要更新和活动的邮件通知',
    enabled: true
  },
  {
    id: 'push-notifications',
    title: '推送通知',
    description: '接收实时推送通知',
    enabled: false
  },
  {
    id: 'weekly-digest',
    title: '每周摘要',
    description: '接收每周活动摘要邮件',
    enabled: true
  }
])

// 安全设置
const securitySettings = ref<Setting[]>([
  {
    id: 'two-factor-auth',
    title: '两步验证',
    description: '启用两步验证以提高账号安全性',
    enabled: false
  },
  {
    id: 'login-alerts',
    title: '登录提醒',
    description: '检测到异常登录时发送通知',
    enabled: true
  }
])

// 系统设置
const systemSettings = ref<Setting[]>([
  {
    id: 'dark-mode',
    title: '深色模式',
    description: '启用深色主题',
    enabled: false
  },
  {
    id: 'auto-update',
    title: '自动更新',
    description: '自动安装系统更新',
    enabled: true
  }
])

// 隐私设置
const privacySettings = ref<Setting[]>([
  {
    id: 'profile-visibility',
    title: '个人资料可见性',
    description: '允许其他用户查看您的个人资料',
    enabled: true
  },
  {
    id: 'activity-tracking',
    title: '活动追踪',
    description: '允许系统收集使用数据以改善服务',
    enabled: true
  }
])

const handleToggle = async (setting: Setting) => {
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))
    setting.enabled = !setting.enabled
  } catch (error) {
    console.error('更新设置失败:', error)
  }
}

const handleSavePassword = async (event: Event) => {
  event.preventDefault()
  // 这里添加修改密码的逻辑
}
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">系统设置</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="mt-8 space-y-6">
        <!-- 系统设置 -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">系统设置</h3>
            <div class="mt-4 space-y-4">
              <div
                v-for="setting in systemSettings"
                :key="setting.id"
                class="flex items-start justify-between"
              >
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900">{{ setting.title }}</div>
                  <div class="text-sm text-gray-500">{{ setting.description }}</div>
                </div>
                <button
                  type="button"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  :class="[setting.enabled ? 'bg-indigo-600' : 'bg-gray-200']"
                  @click="handleToggle(setting)"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    :class="[setting.enabled ? 'translate-x-5' : 'translate-x-0']"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 通知设置 -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">通知设置</h3>
            <div class="mt-4 space-y-4">
              <div
                v-for="setting in notificationSettings"
                :key="setting.id"
                class="flex items-start justify-between"
              >
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900">{{ setting.title }}</div>
                  <div class="text-sm text-gray-500">{{ setting.description }}</div>
                </div>
                <button
                  type="button"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  :class="[setting.enabled ? 'bg-indigo-600' : 'bg-gray-200']"
                  @click="handleToggle(setting)"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    :class="[setting.enabled ? 'translate-x-5' : 'translate-x-0']"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 安全设置 -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">安全设置</h3>
            <div class="mt-4 space-y-4">
              <div
                v-for="setting in securitySettings"
                :key="setting.id"
                class="flex items-start justify-between"
              >
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900">{{ setting.title }}</div>
                  <div class="text-sm text-gray-500">{{ setting.description }}</div>
                </div>
                <button
                  type="button"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  :class="[setting.enabled ? 'bg-indigo-600' : 'bg-gray-200']"
                  @click="handleToggle(setting)"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    :class="[setting.enabled ? 'translate-x-5' : 'translate-x-0']"
                  />
                </button>
              </div>

              <!-- 修改密码 -->
              <div class="mt-6 pt-6 border-t border-gray-200">
                <div class="text-sm font-medium text-gray-900">修改密码</div>
                <form class="mt-4 space-y-4" @submit="handleSavePassword">
                  <div>
                    <label for="current-password" class="block text-sm font-medium text-gray-700">
                      当前密码
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="new-password" class="block text-sm font-medium text-gray-700">
                      新密码
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="confirm-password" class="block text-sm font-medium text-gray-700">
                      确认新密码
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      保存新密码
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- 隐私设置 -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">隐私设置</h3>
            <div class="mt-4 space-y-4">
              <div
                v-for="setting in privacySettings"
                :key="setting.id"
                class="flex items-start justify-between"
              >
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900">{{ setting.title }}</div>
                  <div class="text-sm text-gray-500">{{ setting.description }}</div>
                </div>
                <button
                  type="button"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  :class="[setting.enabled ? 'bg-indigo-600' : 'bg-gray-200']"
                  @click="handleToggle(setting)"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    :class="[setting.enabled ? 'translate-x-5' : 'translate-x-0']"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 