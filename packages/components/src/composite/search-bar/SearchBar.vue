<script setup lang="ts">
import { ref, watch } from 'vue'
import { YsInput } from '../../ui/input'
import { YsButton } from '../../ui/button'

interface Props {
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  clearable?: boolean
  searchButtonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '搜索...',
  loading: false,
  disabled: false,
  clearable: true,
  searchButtonText: '搜索'
})

const emit = defineEmits<{
  search: [value: string]
  clear: []
  'update:modelValue': [value: string]
}>()

const searchValue = ref('')

watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleSearch = () => {
  emit('search', searchValue.value)
}

const handleClear = () => {
  searchValue.value = ''
  emit('clear')
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="flex gap-2">
    <YsInput
      v-model="searchValue"
      :placeholder="placeholder"
      :disabled="disabled || loading"
      class="min-w-[200px]"
      @keydown="handleKeyDown"
    >
      <template #prefix>
        <span class="i-heroicons-magnifying-glass text-gray-400" />
      </template>
      <template v-if="clearable && searchValue" #suffix>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-500"
          @click="handleClear"
        >
          <span class="i-heroicons-x-mark" />
        </button>
      </template>
    </YsInput>
    <YsButton
      type="primary"
      :loading="loading"
      :disabled="disabled"
      @click="handleSearch"
    >
      <span
        :class="loading ? 'i-heroicons-arrow-path animate-spin' : 'i-heroicons-magnifying-glass'"
        class="mr-1"
      />
      {{ searchButtonText }}
    </YsButton>
  </div>
</template> 