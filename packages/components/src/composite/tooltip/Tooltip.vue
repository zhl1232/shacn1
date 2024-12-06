<template>
  <TooltipProvider :delay-duration="props.duration">
    <Tooltip>
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent :side="props.side" class="bg-secondary text-secondary-foreground px-3 py-1.5 text-sm rounded-md shadow-md border border-border">
        <p v-if="props.content">{{ props.content }}</p>
        <slot v-else name="content" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ys/components/ui/tooltip'

defineOptions({
  name: 'YsTooltip'
})

const props = defineProps({
  content: {
    type: String
  },
  duration: {
    type: Number,
    default: 0
  },
  side: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'top'
  }
});
</script>

