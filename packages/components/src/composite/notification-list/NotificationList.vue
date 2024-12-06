<script setup lang="ts">
import { computed } from 'vue'
import { YsCard } from '../../ui/card'
import { YsBadge } from '../../ui/badge'
import { YsButton } from '../../ui/button'

interface Notification {
  id: string | number
  title: string
  content: string
  time: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
}

interface Props {
  notifications: Notification[]
  loading?: boolean
  maxHeight?: string | number
  showHeader?: boolean
  showClearButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  maxHeight: '400px',
  showHeader: true,
  showClearButton: true
})

const emit = defineEmits<{
  read: [id: string | number]
  clear: []
  readAll: []
  click: [notification: Notification]
}>()

const unreadCount = computed(() => props.notifications.filter(n => !n.read).length)

const typeStyles = {
  info: {
    icon: 'i-heroicons-information-circle',
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  success: {
    icon: 'i-heroicons-check-circle',
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  warning: {
    icon: 'i-heroicons-exclamation-triangle',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50'
  },
  error: {
    icon: 'i-heroicons-x-circle',
    color: 'text-red-500',
    bg: 'bg-red-50'
  }
}

const handleRead = (id: string | number) => {
  emit('read', id)
}

const handleClear = () => {
  emit('clear')
}

const handleReadAll = () => {
  emit('readAll')
}

const handleClick = (notification: Notification) => {
  emit('click', notification)
}
</script>

<template>
  <YsCard class="w-full">
    <!-- 头部 -->
    <div
      v-if="showHeader"
      class="p-4 border-b flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-medium">通知</h3>
        <YsBadge
          v-if="unreadCount > 0"
          variant="secondary"
        >
          {{ unreadCount }} 条未读
        </YsBadge>
      </div>
      <div class="flex items-center gap-2">
        <YsButton
          v-if="unreadCount > 0"
          variant="ghost"
          size="sm"
          @click="handleReadAll"
        >
          全部已读
        </YsButton>
        <YsButton
          v-if="showClearButton"
          variant="ghost"
          size="sm"
          @click="handleClear"
        >
          清空
        </YsButton>
      </div>
    </div>

    <!-- 通知列表 -->
    <div
      class="divide-y overflow-auto"
      :style="{ maxHeight: maxHeight }"
    >
      <template v-if="notifications.length">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          :class="{ 'opacity-60': notification.read }"
          @click="handleClick(notification)"
        >
          <div class="flex gap-4">
            <!-- 图标 -->
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              :class="[typeStyles[notification.type].bg]"
            >
              <span
                class="text-xl"
                :class="[typeStyles[notification.type].icon, typeStyles[notification.type].color]"
              />
            </div>

            <!-- 内容 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ notification.title }}
                  </h4>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ notification.content }}
                  </p>
                </div>
                <div class="flex-shrink-0 flex flex-col items-end gap-2">
                  <span class="text-xs text-gray-400">{{ notification.time }}</span>
                  <YsButton
                    v-if="!notification.read"
                    variant="ghost"
                    size="sm"
                    @click.stop="handleRead(notification.id)"
                  >
                    标记已读
                  </YsButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div
        v-else
        class="p-8 text-center text-gray-500"
      >
        暂无通知
      </div>
    </div>
  </YsCard>
</template> 