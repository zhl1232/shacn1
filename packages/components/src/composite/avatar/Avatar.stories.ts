import type { Meta, StoryObj } from '@storybook/vue3'
import YsAvatar from './Avatar.vue'

const meta = {
  title: 'Composite/Avatar',
  component: YsAvatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text'
    },
    alt: {
      control: 'text'
    },
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    },
    imageClass: {
      control: 'text'
    }
  }
} satisfies Meta<typeof YsAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User Avatar'
  }
}

export const WithFallback: Story = {
  args: {
    src: '',
    alt: 'JD'
  }
}

export const CustomSize: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User Avatar',
    width: 64,
    height: 64
  }
} 