import type { Meta, StoryObj } from '@storybook/vue3'
import SearchBar from './SearchBar.vue'

const meta = {
  title: 'Composite/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '搜索框占位文本'
    },
    loading: {
      control: 'boolean',
      description: '加载状态'
    },
    disabled: {
      control: 'boolean',
      description: '禁用状态'
    },
    clearable: {
      control: 'boolean',
      description: '是否可清除'
    },
    searchButtonText: {
      control: 'text',
      description: '搜索按钮文本'
    },
    onSearch: {
      action: 'search',
      description: '搜索事件'
    },
    onClear: {
      action: 'clear',
      description: '清除事件'
    }
  }
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '搜索...',
    loading: false,
    disabled: false,
    clearable: true,
    searchButtonText: '搜索'
  }
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true
  }
}

export const CustomPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: '请输入关键词搜索'
  }
}

export const CustomButtonText: Story = {
  args: {
    ...Default.args,
    searchButtonText: '查询'
  }
}

export const NotClearable: Story = {
  args: {
    ...Default.args,
    clearable: false
  }
} 