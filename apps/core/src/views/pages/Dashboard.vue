<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">仪表盘</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- 最近活动 -->
        <div class="bg-white shadow rounded-lg">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">最近活动</h2>
            <div class="mt-6 flow-root">
              <ul class="-mb-8">
                <li v-for="(activity, index) in activities" :key="activity.id">
                  <div class="relative pb-8">
                    <span
                      v-if="index !== activities.length - 1"
                      class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span
                          class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          :class="{
                            'bg-blue-500': activity.type === 'comment',
                            'bg-green-500': activity.type === 'task',
                            'bg-red-500': activity.type === 'alert'
                          }"
                        >
                          <span
                            class="text-white"
                            :class="{
                              'i-heroicons-chat-bubble-left-ellipsis': activity.type === 'comment',
                              'i-heroicons-check': activity.type === 'task',
                              'i-heroicons-exclamation-triangle': activity.type === 'alert'
                            }"
                          ></span>
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="text-sm text-gray-500">
                          <span class="font-medium text-gray-900">{{ activity.user }}</span>
                          {{ activity.content }}
                        </div>
                        <div class="mt-1 text-sm text-gray-500">
                          {{ activity.time }}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 任务列表 -->
        <div class="bg-white shadow rounded-lg">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">任务列表</h2>
            <div class="mt-6">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        任务
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        状态
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        优先级
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        截止日期
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="task in tasks" :key="task.id">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {{ task.title }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                          :class="getStatusColor(task.status)"
                        >
                          {{ task.status }}
                        </span>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span :class="getPriorityColor(task.priority)">
                          {{ task.priority }}
                        </span>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ task.dueDate }}
                      </td>
                    </tr>
                  </tbody>
                </table>
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

interface Activity {
  id: number
  type: 'comment' | 'task' | 'alert'
  user: string
  content: string
  time: string
}

interface Task {
  id: number
  title: string
  status: string
  priority: string
  dueDate: string
}

const activities = ref<Activity[]>([
  {
    id: 1,
    type: 'comment',
    user: '张三',
    content: '在"产品反馈"中发表了评论',
    time: '5分钟前'
  },
  {
    id: 2,
    type: 'task',
    user: '李四',
    content: '完成了任务"更新用户界面"',
    time: '2小时前'
  },
  {
    id: 3,
    type: 'alert',
    user: '系统',
    content: '检测到服务器负载过高',
    time: '4小时前'
  }
])

const tasks = ref<Task[]>([
  {
    id: 1,
    title: '优化首页性能',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2023-12-10'
  },
  {
    id: 2,
    title: '修复登录页面bug',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-12-15'
  },
  {
    id: 3,
    title: '更新文档',
    status: 'completed',
    priority: 'low',
    dueDate: '2023-12-08'
  }
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600'
    case 'medium':
      return 'text-yellow-600'
    default:
      return 'text-green-600'
  }
}
</script> 