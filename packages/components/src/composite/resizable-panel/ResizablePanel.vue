<script setup lang="ts">
import { cn } from '@ys/components/lib/utils';
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel
} from '@ys/components/ui/resizable';
import { computed, type HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
  direction?: 'horizontal' | 'vertical';
  defaultLayout?: number[];
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  disabled?: boolean;
  autoSaveId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  defaultLayout: () => [50, 50],
  minSize: 15,
  maxSize: 85,
  collapsible: false,
  collapsedSize: 4,
  disabled: false
});

const emit = defineEmits<{
  collapse: [];
  expand: [];
}>();

const handleCollapse = () => {
  emit('collapse');
};

const handleExpand = () => {
  emit('expand');
};

const groupClass = computed(() => {
  return cn(
    'h-full items-stretch',
    props.direction === 'vertical' ? 'flex-col' : '',
    props.class
  );
});

const firstPanelProps = computed(() => ({
  defaultSize: props.defaultLayout[0],
  collapsedSize: props.collapsedSize,
  collapsible: !props.disabled && props.collapsible,
  minSize: props.minSize,
  maxSize: props.maxSize
}));

const secondPanelProps = computed(() => ({
  defaultSize: props.defaultLayout[1],
  minSize: props.minSize
}));

const handleClass = computed(() => {
  return cn(
    'relative flex items-center justify-center',
    props.direction === 'vertical' ? 'h-px w-full' : 'h-full w-px',
    props.disabled
      ? 'cursor-default bg-border'
      : 'cursor-col-resize bg-border hover:bg-primary/20'
  );
});
</script>

<template>
  <ResizablePanelGroup :direction="direction" :class="groupClass" :auto-save-id="autoSaveId">
    <ResizablePanel
      v-bind="firstPanelProps"
      @collapse="handleCollapse"
      @expand="handleExpand"
    >
      <slot name="first" />
    </ResizablePanel>
    <div :class="handleClass">
      <ResizableHandle v-if="!props.disabled" with-handle />
    </div>
    <ResizablePanel v-bind="secondPanelProps">
      <slot name="second" />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
