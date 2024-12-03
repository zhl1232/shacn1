import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Button },
    template: '<Button>按钮</Button>'
  })
}

export const Secondary: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="secondary">次要按钮</Button>'
  })
}

export const Destructive: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="destructive">危险按钮</Button>'
  })
}

export const Outline: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="outline">边框按钮</Button>'
  })
}

export const Ghost: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="ghost">幽灵按钮</Button>'
  })
}

export const Link: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="link">链接按钮</Button>'
  })
}

export const Small: Story = {
  render: () => ({
    components: { Button },
    template: '<Button size="sm">小按钮</Button>'
  })
}

export const Large: Story = {
  render: () => ({
    components: { Button },
    template: '<Button size="lg">大按钮</Button>'
  })
}

export const Icon: Story = {
  render: () => ({
    components: { Button },
    template: '<Button size="icon">🔍</Button>'
  })
} 