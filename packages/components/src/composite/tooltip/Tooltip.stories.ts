import type { Meta, StoryObj } from '@storybook/vue3'
import YsTooltip from './Tooltip.vue'

const meta = {
  title: '通用/YsTooltip',
  component: YsTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text'
    },
    duration: {
      control: 'number'
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    }
  }
} satisfies Meta<typeof YsTooltip>;

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    content: '这是一个提示'
  },
  parameters: {
    docs: {
      source: {
        code: `<YsTooltip content="这是一个提示">
  <button>悬浮查看提示</button>
</YsTooltip>`
      }
    }
  },
  render: (args) => ({
    components: { YsTooltip },
    setup() {
      return { args }
    },
    template: `
      <YsTooltip v-bind="args">
        <button>悬浮查看提示</button>
      </YsTooltip>
    `
  })
}

export const WithDelay: Story = {
  args: {
    content: '延迟显示的提示',
    duration: 500
  },
  parameters: {
    docs: {
      source: {
        code: `<YsTooltip content="延迟显示的提示" :duration="500">
  <button>延迟显示提示</button>
</YsTooltip>`
      }
    }
  },
  render: (args) => ({
    components: { YsTooltip },
    setup() {
      return { args }
    },
    template: `
      <YsTooltip v-bind="args">
        <button>延迟显示提示</button>
      </YsTooltip>
    `
  })
}

export const DifferentSides: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex space-x-4">
  <YsTooltip content="顶部提示" side="top">
    <button>上</button>
  </YsTooltip>
  <YsTooltip content="右侧提示" side="right">
    <button>右</button>
  </YsTooltip>
  <YsTooltip content="底部提示" side="bottom">
    <button>下</button>
  </YsTooltip>
  <YsTooltip content="左侧提示" side="left">
    <button>左</button>
  </YsTooltip>
</div>`
      }
    }
  },
  render: () => ({
    components: { YsTooltip },
    template: `
      <div class="flex space-x-4">
        <YsTooltip content="顶部提示" side="top">
          <button>上</button>
        </YsTooltip>
        <YsTooltip content="右侧提示" side="right">
          <button>右</button>
        </YsTooltip>
        <YsTooltip content="底部提示" side="bottom">
          <button>下</button>
        </YsTooltip>
        <YsTooltip content="左侧提示" side="left">
          <button>左</button>
        </YsTooltip>
      </div>
    `
  })
}

export const CustomContent: Story = {
  parameters: {
    docs: {
      source: {
        code: `<YsTooltip>
  <button>自定义内容</button>
  <template #content>
    <div class="p-2">
      <h4 class="font-bold">自定义标题</h4>
      <p class="text-red-500">这是一段自定义内容</p>
    </div>
  </template>
</YsTooltip>`
      }
    }
  },
  render: () => ({
    components: { YsTooltip },
    template: `
      <YsTooltip>
        <button>自定义内容</button>
        <template #content>
          <div class="p-2">
            <h4 class="font-bold">自定义标题</h4>
            <p class="text-red-500">这是一段自定义内容</p>
          </div>
        </template>
      </YsTooltip>
    `
  })
} 