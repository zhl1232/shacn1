<template>
  <Tabs :default-value="value">
    <div
      :class="cn(isVertical(orientation) ? 'flex' : 'flex flex-col space-y-2')"
    >
      <TabsList
        :class="
          cn(
            isVertical(orientation)
              ? 'flex flex-col h-full py-2 space-y-2' // Vertical: column layout
              : 'flex flex-row space-x-2 w-fit' // Horizontal: row layout
          )
        "
      >
        <slot name="default" />
      </TabsList>

      <div
        :class="
          cn(
            isVertical(orientation)
              ? 'flex-1 ml-4' // Vertical mode is on the right
              : 'flex-1 mt-2' // Horizontal mode is below
          )
        "
      >
        <slot name="content" />
      </div>
    </div>
  </Tabs>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref, useSlots } from 'vue'
import { Tabs, TabsList } from '@ys/components/ui/tabs'
import { cn } from '@ys/components/lib/utils'
import { isVertical } from '@ys/components/composite/tab/utils'
import type { PropType } from 'vue'

defineOptions({
  name: 'YsTab'
})

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  orientation: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  }
})

const emit = defineEmits(['update:value'])
const selectedValue = ref(props.value)

// Provide orientation and selected value
provide('tabsContext', {
  selectedValue,
  orientation: props.orientation,
  setSelectedValue: (val: string) => {
    selectedValue.value = val
    emit('update:value', val)
  }
})

// Slot type checking function
const validateSlots = () => {
  if (slots.default) {
    const defaultSlotChildren = slots.default()
    defaultSlotChildren.forEach((child) => {
      if (typeof child.type === 'object' && 'name' in child.type) {
        if (child.type.name !== 'ITab') {
          console.warn('The default slot can only contain ITab components')
        }
      }
    })
  }

  if (slots.content) {
    const contentSlotChildren = slots.content()
    contentSlotChildren.forEach((child) => {
      if (typeof child.type === 'object' && 'name' in child.type) {
        if (child.type.name !== 'ITabContent') {
          console.warn('The content slot can only contain ITabContent components')
        }
      }
    })
  }
}

// Check slot contents when component is mounted
onMounted(validateSlots)

const slots = useSlots()
</script>
