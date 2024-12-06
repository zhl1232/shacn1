<template>
  <Card :class="cn('rounded-sm', computedShadow)">
    <CardHeader v-if="$slots.title || title" :class="`flex flex-row items-center justify-between border-b p-4 ${titleClass}`">
      <div class="grid gap-2">
        <CardTitle>
          <span v-if="title">{{ title }}</span>
          <slot v-else name="title"/>
        </CardTitle>
      </div>
      <div>
        <slot name="extra"/>
      </div>
    </CardHeader>
    <CardContent :class="`${bodyClass}`">
      <slot/>
    </CardContent>
    <CardFooter class="border-t p-4" v-if="$slots.footer">
      <slot name="footer"/>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ys/components/ui/card'
import { cn } from '@ys/components/lib/utils'
import { Shadow } from '@ys/components/composite/enum/Shadow'

defineOptions({
  name: 'YsCard'
})

const props = defineProps({
  title: {
    type: String
  },
  titleClass: {
    type: String
  },
  bodyClass: {
    type: String
  },
  shadow: {
    type: String,
    default: 'never'
  }
})

const computedShadow = ref<string>('never')

watchEffect(() => {
  computedShadow.value = Shadow[props.shadow as keyof typeof Shadow]
})
</script>