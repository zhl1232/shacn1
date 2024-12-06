<script setup lang="ts">
import { YsCard } from '../../ui/card'
import { YsAvatar } from '../../ui/avatar'
import { YsButton } from '../../ui/button'
import { YsBadge } from '../../ui/badge'

interface Props {
  name: string
  avatar?: string
  title?: string
  description?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
  tags?: string[]
  loading?: boolean
  showFollowButton?: boolean
  followed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  avatar: undefined,
  title: undefined,
  description: undefined,
  status: undefined,
  tags: () => [],
  loading: false,
  showFollowButton: true,
  followed: false
})

const emit = defineEmits<{
  follow: [followed: boolean]
  click: []
}>()

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  busy: 'bg-red-500',
  away: 'bg-yellow-500'
}

const handleFollow = () => {
  emit('follow', !props.followed)
}

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <YsCard
    class="w-[300px] cursor-pointer hover:shadow-lg transition-shadow duration-200"
    @click="handleClick"
  >
    <div class="p-4 space-y-4">
      <!-- 头像和状态 -->
      <div class="flex items-start justify-between">
        <div class="relative">
          <YsAvatar
            :src="avatar"
            :alt="name"
            :name="name"
            class="w-16 h-16"
          />
          <span
            v-if="status"
            class="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
            :class="statusColors[status]"
          />
        </div>
        <YsButton
          v-if="showFollowButton"
          :type="followed ? 'default' : 'primary'"
          size="sm"
          :loading="loading"
          @click.stop="handleFollow"
        >
          {{ followed ? '已关注' : '关注' }}
        </YsButton>
      </div>

      <!-- 用户信息 -->
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold">{{ name }}</h3>
          <YsBadge v-if="title" variant="secondary" class="text-xs">
            {{ title }}
          </YsBadge>
        </div>
        <p v-if="description" class="text-sm text-gray-500">
          {{ description }}
        </p>
      </div>

      <!-- 标签 -->
      <div v-if="tags.length" class="flex flex-wrap gap-2">
        <YsBadge
          v-for="tag in tags"
          :key="tag"
          variant="outline"
          class="text-xs"
        >
          {{ tag }}
        </YsBadge>
      </div>
    </div>
  </YsCard>
</template> 