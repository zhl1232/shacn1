import type { Meta, StoryObj } from '@storybook/vue3'
import NotificationList from './NotificationList.vue'

const meta = {
  title: 'Composite/NotificationList',
  component: NotificationList,
  tags: ['autodocs'],
  argTypes: {
    notifications: {
      control: 'object',
      description: '通知列表数据'
    },
    loading: {
      control: 'boolean',
      description: '加载状态'
    },
    maxHeight: {
      control: 'text',
      description: '最大高度'
    },
    showHeader: {
      control: 'boolean',
      description: '是否显示头部'
    },
    showClearButton: {
      control: 'boolean',
      description: '是否显示清空按钮'
    },
    onRead: {
      action: 'read',
      description: '标记已读事件'
    },
    onClear: {
      action: 'clear',
      description: '清空事件'
    },
    onReadAll: {
      action: 'readAll',
      description: '全部已读事件'
    },
    onClick: {
      action: 'click',
      description: '点击通知事件'
    }
  }
} satisfies Meta<typeof NotificationList>

export default meta
type Story = StoryObj<typeof meta>

const mockNotifications = [
  {
    id: 1,
    title: '系统通知',
    content: '您的账号已成功升级到高级会员',
    time: '刚刚',
    type: 'success',
    read: false
  },
  {
    id: 2,
    title: '安全提醒',
    content: '检测到您的账号在新设备上登录',
    time: '10分钟前',
    type: 'warning',
    read: false
  },
  {
    id: 3,
    title: '系统维护',
    content: '系统将于今晚23:00-24:00进行例行维护',
    time: '30分钟前',
    type: 'info',
    read: true
  },
  {
    id: 4,
    title: '错误报告',
    content: '您的上传任务失败，请重试',
    time: '1小时前',
    type: 'error',
    read: false
  }
] as const

export const Default: Story = {
  args: {
    notifications: mockNotifications,
    loading: false,
    maxHeight: '400px',
    showHeader: true,
    showClearButton: true
  }
}

export const Empty: Story = {
  args: {
    ...Default.args,
    notifications: []
  }
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true
  }
}

export const NoHeader: Story = {
  args: {
    ...Default.args,
    showHeader: false
  }
}

export const NoClearButton: Story = {
  args: {
    ...Default.args,
    showClearButton: false
  }
}

export const CustomHeight: Story = {
  args: {
    ...Default.args,
    maxHeight: '200px'
  }
}

export const AllRead: Story = {
  args: {
    ...Default.args,
    notifications: mockNotifications.map(n => ({ ...n, read: true }))
  }
}

export const ManyNotifications: Story = {
  args: {
    ...Default.args,
    notifications: Array.from({ length: 10 }, (_, i) => ({
      ...mockNotifications[i % mockNotifications.length],
      id: i + 1,
      time: `${i + 1}小时前`
    }))
  }
} 