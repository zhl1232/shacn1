<template>
  <Button
    ref="buttonRef"
    type="button"
    :class="[
      'relative inline-flex items-center justify-center select-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      '[&_svg]:size-4 [&_svg]:shrink-0',
      props.circle ? 'rounded-full aspect-square p-2' : 'rounded-md',
      typeClasses[props.type],
      props.disabled && 'opacity-50 cursor-not-allowed',
      props.loading && 'cursor-wait'
    ]"
    :disabled="props.disabled || props.loading"
    :size="props.size"
    @click="handleClick"
  >
    <span
      v-if="props.loading"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Icon icon="heroicons:arrow-path" class="size-5 animate-spin" />
    </span>
    <span 
      :class="[
        'flex items-center gap-2 relative z-10',
        props.loading && 'opacity-0'
      ]"
    >
      <Icon v-if="props.icon" :icon="props.icon" class="size-5" />
      <slot />
    </span>
    <span class="absolute inset-0 overflow-hidden pointer-events-none" />
  </Button>
</template>

<script lang="ts" setup>
import { Button } from '@ys/components/ui/button'
import { ref } from 'vue'

interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: "default" | "sm" | "lg" | "icon" | null
  circle?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  circle: false,
  loading: false,
  disabled: false,
  icon: undefined
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonRef = ref<InstanceType<typeof Button> | null>(null)

const typeClasses = {
  default: [
    'bg-background hover:bg-secondary/80',
    'text-secondary-foreground',
    'border border-input',
    'shadow-sm'
  ].join(' '),
  primary: [
    'bg-primary hover:bg-primary/90',
    'text-primary-foreground',
    'border-none',
    'shadow'
  ].join(' '),
  success: [
    'bg-success hover:bg-success/90',
    'text-success-foreground',
    'border-none',
    'shadow'
  ].join(' '),
  warning: [
    'bg-warning hover:bg-warning/90',
    'text-warning-foreground',
    'border-none',
    'shadow'
  ].join(' '),
  danger: [
    'bg-destructive hover:bg-destructive/90',
    'text-destructive-foreground',
    'border-none',
    'shadow'
  ].join(' ')
}

const getContrastColor = (type: Props['type']) => {
  const isDark = document.documentElement.classList.contains('dark')
  const colors = {
    default: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
    primary: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)',
    success: 'rgba(255,255,255,0.25)',
    warning: 'rgba(255,255,255,0.25)',
    danger: 'rgba(255,255,255,0.25)'
  }
  return colors[type || 'default']
}

const createRipple = (event: MouseEvent) => {
  const button = buttonRef.value?.$el || buttonRef.value
  if (!button) return

  const rippleContainer = button.querySelector('span:last-child')
  if (!rippleContainer) return

  const rect = button.getBoundingClientRect()
  const size = Math.max(button.clientWidth, button.clientHeight)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const ripple = document.createElement('span')
  ripple.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background-color: ${getContrastColor(props.type)};
    transform-origin: center;
    pointer-events: none;
    z-index: 0;
  `

  rippleContainer.appendChild(ripple)

  ripple.animate(
    [
      { transform: 'scale(0)', opacity: 0.5 },
      { transform: 'scale(2)', opacity: 0 }
    ],
    {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  ).onfinish = () => ripple.remove()
}

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    createRipple(event)
    emit('click', event)
  }
}
</script>

<style scoped>
</style>
