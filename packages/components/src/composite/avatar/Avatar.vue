<template>
  <Avatar>
    <AvatarImage :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" :class="props.imageClass"/>
    <AvatarFallback>{{ props.alt }}</AvatarFallback>
  </Avatar>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@ys/components/ui/avatar'

defineOptions({
  name: 'YsAvatar'
})

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 32
  },
  height: {
    type: Number,
    default: 32
  },
  imageClass: {
    type: String,
    default: ''
  }
})
</script>
