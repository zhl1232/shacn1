<script setup lang="ts">
import { computed, useSlots, type HTMLAttributes } from 'vue';
import { cn } from '@ys/components/lib/utils';
import { useVModel } from '@vueuse/core';

// 类型定义
type InputSize = 'default' | 'sm' | 'lg'
type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url'

interface Props {
  size?: InputSize;
  placeholder?: string;
  disabled?: boolean;
  type?: InputType;
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes['class'];
  prefixText?: string;
  suffixText?: string;
}

// 默认值配置
const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  type: 'text'
});

// 基础样式常量
const BASE_INPUT_CLASSES = [
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
  'transition-colors duration-200',
  'placeholder:text-muted-foreground',
  'focus:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/20',
  'hover:shadow-[0_0_10px_rgba(0,0,0,0.05)]',
  'disabled:cursor-not-allowed disabled:opacity-50'
] as const;

const BASE_ADDON_CLASSES = [
  'flex h-full items-center border border-1 border-input bg-background px-3',
  'text-sm text-muted-foreground',
  'whitespace-nowrap',
  'border'
] as const;

// 尺寸映射
const SIZE_CLASSES: Record<InputSize, string> = {
  default: 'h-9',
  sm: 'h-8 text-xs',
  lg: 'h-10'
};

// 计算属性
const inputClass = computed(() => SIZE_CLASSES[props.size]);

const slots = useSlots();

const textClass = computed(() => {
  return cn(BASE_ADDON_CLASSES, inputClass.value);
});

const finalInputClass = computed(() => {
  return cn(
    BASE_INPUT_CLASSES,
    {
      'rounded-l-none': props.prefixText || slots.prefix,
      'rounded-r-none': props.suffixText || slots.suffix,
    },
    props.class,
    inputClass.value
  );
});

// 事件
const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

// 双向绑定
const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
});
</script>

<template>
  <div class="group relative flex">
    <!-- 前缀 -->
    <div
      v-if="prefixText || $slots.prefix"
      :class="[
        textClass,
        'border-r-0 rounded-l-md',
        '[&>button]:rounded-r-none [&>button]:border-r-0',
        '[&>button]:-mx-3'
      ]"
    >
      <slot name="prefix">
        {{ prefixText }}
      </slot>
    </div>

    <!-- 输入框 -->
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="modelValue"
      v-on="$attrs"
      :class="finalInputClass"
    />

    <!-- 后缀 -->
    <div
      v-if="suffixText || $slots.suffix"
      :class="[
        textClass,
        'border-l-0 rounded-r-md',
        '[&>button]:rounded-l-none [&>button]:border-l-0',
        '[&>button]:-mx-3'
      ]"
    >
      <slot name="suffix">
        {{ suffixText }}
      </slot>
    </div>
  </div>
</template>
