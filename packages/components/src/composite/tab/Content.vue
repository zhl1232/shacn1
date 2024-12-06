<template>
  <div v-if="isActive" class="flex-1">
    <TabsContent :value="value">
      <slot />
    </TabsContent>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { TabsContent } from '@ys/components/ui/tabs'

interface TabsContext {
  selectedValue: { value: string }
  orientation: 'horizontal' | 'vertical'
  setSelectedValue: (val: string) => void
}

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

// Add types to inject and provide default values
const tabsContext = inject<TabsContext>('tabsContext', {
  selectedValue: { value: '' },
  orientation: 'horizontal',
  setSelectedValue: () => {}
})

// Compare selectedValue
const isActive = computed(() => tabsContext.selectedValue.value === props.value)
</script>
