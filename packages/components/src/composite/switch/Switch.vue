<template>
  <SwitchRoot
    ref="switchRef"
    :checked="modelValue"
    :disabled="disabled"
    :class="[
      'peer inline-flex h-6 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 relative isolate overflow-hidden',
      props.checkedText || props.uncheckedText ? 'min-w-[4.5rem]' : 'w-11',
      typeClasses[props.type]
    ]"
    :style="switchStyle"
    @update:checked="handleChange"
  >
    <div
      v-if="props.checkedText || props.uncheckedText"
      class="absolute inset-0 flex items-center overflow-hidden"
    >
      <div
        class="flex items-center justify-between transition-transform duration-200 w-full px-2"
        :class="
          modelValue ? '-translate-x-[calc(100%-4.5rem)]' : 'translate-x-0'
        "
      >
        <span
          ref="uncheckedTextRef"
          :class="[
            'transition-opacity duration-200 z-20 whitespace-nowrap text-xs font-medium ml-4',
            !modelValue
              ? 'opacity-100 text-gray-600 dark:text-gray-300'
              : 'opacity-0'
          ]"
          >{{ props.uncheckedText }}</span
        >
        <span
          ref="checkedTextRef"
          :class="[
            'transition-opacity duration-200 z-20 whitespace-nowrap text-xs font-medium mr-4',
            modelValue ? 'opacity-100 text-white' : 'opacity-0'
          ]"
          >{{ props.checkedText }}</span
        >
      </div>
    </div>
    <SwitchThumb
      :class="[
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-all duration-200 absolute z-30',
        'top-0',
        modelValue ? 'left-0' : 'right-0'
      ]"
    >
      <slot name="thumb" />
    </SwitchThumb>
    <span class="absolute inset-0 overflow-hidden pointer-events-none z-0" />
  </SwitchRoot>
</template>

<script lang="ts" setup>
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { ref, computed } from 'vue';

defineOptions({
  name: 'YsSwitch'
});

interface Props {
  modelValue?: boolean;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  checkedText?: string;
  uncheckedText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  type: 'primary',
  disabled: false,
  checkedText: '',
  uncheckedText: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const switchRef = ref<InstanceType<typeof SwitchRoot> | null>(null);
const checkedTextRef = ref<HTMLSpanElement | null>(null);
const uncheckedTextRef = ref<HTMLSpanElement | null>(null);

const typeClasses = {
  default: 'data-[state=unchecked]:bg-input data-[state=checked]:bg-secondary',
  primary: 'data-[state=unchecked]:bg-input data-[state=checked]:bg-primary',
  success: 'data-[state=unchecked]:bg-input data-[state=checked]:bg-success',
  warning: 'data-[state=unchecked]:bg-input data-[state=checked]:bg-warning',
  danger: 'data-[state=unchecked]:bg-input data-[state=checked]:bg-destructive'
} as const;

const switchStyle = computed(() => {
  if (!props.checkedText && !props.uncheckedText) return {};
  const padding = 40;
  const maxTextWidth = Math.max(
    checkedTextRef.value?.offsetWidth || 0,
    uncheckedTextRef.value?.offsetWidth || 0
  );
  const width = maxTextWidth + padding + 20;
  return {
    width: `${width}px`
  };
});

const rippleColors = {
  default: 'rgba(0, 0, 0, 0.15)',
  primary: 'rgba(255, 255, 255, 0.35)',
  success: 'rgba(255, 255, 255, 0.35)',
  warning: 'rgba(255, 255, 255, 0.35)',
  danger: 'rgba(255, 255, 255, 0.35)'
};

const createRipple = (event: MouseEvent) => {
  const button = switchRef.value?.$el;
  if (!button) return;

  const rippleContainer = button.querySelector('span:last-child');
  if (!rippleContainer) return;

  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ripple = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight) * 1.5; // 增大水波纹尺寸

  ripple.style.cssText = `
    position: absolute;
    left: ${x - diameter / 2}px;
    top: ${y - diameter / 2}px;
    width: ${diameter}px;
    height: ${diameter}px;
    border-radius: 50%;
    background-color: ${rippleColors[props.type || 'default']};
    transform: scale(0);
    pointer-events: none;
    will-change: transform;
    contain: strict;
  `;

  ripple.animate(
    [
      { transform: 'scale(0)', opacity: 0.8 }, // 增加初始透明度
      { transform: 'scale(2)', opacity: 0 }
    ],
    {
      duration: 800, // 增加动画时长
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)' // 使用更平滑的缓动函数
    }
  );

  rippleContainer.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 800);
};

const handleChange = (value: boolean) => {
  if (!props.disabled) {
    createRipple(event as MouseEvent);
    emit('update:modelValue', value);
  }
};
</script>

<style scoped>
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  transform: scale(0);
  animation: ripple 0.5s ease-out;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
