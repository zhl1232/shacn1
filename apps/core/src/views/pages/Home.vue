<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">首页</h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <!-- 统计卡片 -->
      <div class="mt-8">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="item in stats"
            :key="item.name"
            class="bg-white overflow-hidden shadow rounded-lg"
          >
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-1">
                  <div class="text-sm font-medium text-gray-500 truncate">
                    {{ item.name }}
                  </div>
                  <div class="mt-1 text-3xl font-semibold text-gray-900">
                    {{ item.value }}
                  </div>
                </div>
                <div class="ml-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium"
                    :class="{
                      'bg-green-100 text-green-800': item.changeType === 'increase',
                      'bg-red-100 text-red-800': item.changeType === 'decrease'
                    }"
                  >
                    {{ item.change }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 欢迎卡片 -->
      <div class="mt-8">
        <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div class="px-6 py-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              欢迎使用管理系统
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              这是一个基于 Vue 3 + TypeScript + Tailwind CSS 构建的现代化管理系统。
            </p>
          </div>
          <div class="px-6 py-5">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="group relative rounded-lg p-6 bg-gray-50 hover:bg-gray-100">
                <h4 class="text-base font-semibold text-gray-900">
                  <span class="i-heroicons-document-text mr-2"></span>
                  查看文档
                </h4>
                <p class="mt-2 text-sm text-gray-500">
                  了解系统的使用方法和最佳实践。
                </p>
              </div>
              <div class="group relative rounded-lg p-6 bg-gray-50 hover:bg-gray-100">
                <h4 class="text-base font-semibold text-gray-900">
                  <span class="i-heroicons-academic-cap mr-2"></span>
                  开始教程
                </h4>
                <p class="mt-2 text-sm text-gray-500">
                  跟随教程一步步学习系统功能。
                </p>
              </div>
              <div class="group relative rounded-lg p-6 bg-gray-50 hover:bg-gray-100">
                <h4 class="text-base font-semibold text-gray-900">
                  <span class="i-heroicons-chat mr-2"></span>
                  获取帮助
                </h4>
                <p class="mt-2 text-sm text-gray-500">
                  遇到问题？我们随时为您提供帮助。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { name: '总用户', value: '8,000+', change: '+12%', changeType: 'increase' },
  { name: '活跃用户', value: '2,300', change: '+5.4%', changeType: 'increase' },
  { name: '转化率', value: '28.5%', change: '-2.3%', changeType: 'decrease' },
  { name: '平均停留时间', value: '12m 30s', change: '+3.2%', changeType: 'increase' }
])
</script>
