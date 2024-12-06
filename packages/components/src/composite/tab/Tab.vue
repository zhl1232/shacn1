<template>
  <TabsTrigger
    :value="value"
    :class="cn(isVertical(orientation) && 'vertical-text p-1.5')"
    @click="handleClick"
  >
    <slot />
  </TabsTrigger>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { cn } from '@ys/components/lib/utils'
import { isVertical } from '@ys/components/composite/tab/utils'
import { TabsTrigger } from '@ys/components/ui/tabs'

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

// Specify the type when injecting the context and provide a default value
const tabsContext = inject<TabsContext>('tabsContext', {
  selectedValue: { value: '' },
  orientation: 'horizontal',
  setSelectedValue: () => {}
})

// Get direction value
const orientation = tabsContext.orientation

const handleClick = () => {
  if (tabsContext) {
    tabsContext.setSelectedValue(props.value)
  }
}
</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: nowrap;
}
</style>
