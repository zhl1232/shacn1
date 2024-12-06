import type { Meta, StoryObj } from '@storybook/vue3'
import UserCard from './UserCard.vue'

const meta = {
  title: 'Composite/UserCard',
  component: UserCard,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '用户名'
    },
    avatar: {
      control: 'text',
      description: '头像URL'
    },
    title: {
      control: 'text',
      description: '职位/头衔'
    },
    description: {
      control: 'text',
      description: '描述'
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away'],
      description: '在线状态'
    },
    tags: {
      control: 'array',
      description: '标签列表'
    },
    loading: {
      control: 'boolean',
      description: '加载状态'
    },
    showFollowButton: {
      control: 'boolean',
      description: '是否显示关注按钮'
    },
    followed: {
      control: 'boolean',
      description: '是否已关注'
    },
    onFollow: {
      action: 'follow',
      description: '关注/取消关注事件'
    },
    onClick: {
      action: 'click',
      description: '点击事件'
    }
  }
} satisfies Meta<typeof UserCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    title: '高级工程师',
    description: '热爱技术，专注于前端开发和用户体验设计',
    status: 'online',
    tags: ['Vue', 'TypeScript', 'UI/UX'],
    loading: false,
    showFollowButton: true,
    followed: false
  }
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true
  }
}

export const Followed: Story = {
  args: {
    ...Default.args,
    followed: true
  }
}

export const NoAvatar: Story = {
  args: {
    ...Default.args,
    avatar: undefined
  }
}

export const WithDifferentStatus: Story = {
  render: (args) => ({
    components: { UserCard },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-4 flex-wrap">
        <UserCard v-bind="args" status="online" name="在线用户" />
        <UserCard v-bind="args" status="offline" name="离线用户" />
        <UserCard v-bind="args" status="busy" name="忙碌用户" />
        <UserCard v-bind="args" status="away" name="离开用户" />
      </div>
    `
  })
}

export const NoFollowButton: Story = {
  args: {
    ...Default.args,
    showFollowButton: false
  }
}

export const WithLongDescription: Story = {
  args: {
    ...Default.args,
    description: '这是一段很长的描述文本，用来测试文本溢出时的显示效果。可以看到文本会自动换行，并且保持良好的布局。'
  }
}

export const WithManyTags: Story = {
  args: {
    ...Default.args,
    tags: ['Vue', 'React', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Webpack']
  }
} 