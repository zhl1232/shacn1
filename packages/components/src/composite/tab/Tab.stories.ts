import type { Meta, StoryObj } from '@storybook/vue3'
import YsTab from './Index.vue'
import { ref } from 'vue'

const meta = {
  title: 'Composite/Tab',
  component: YsTab,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  }
} satisfies Meta<typeof YsTab>;

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    value: 'tab1',
    orientation: 'horizontal'
  },
  render: (args) => ({
    components: { YsTab },
    setup() {
      const value = ref(args.value)
      return { value }
    },
    template: `
      <YsTab v-model:value="value" :orientation="args.orientation">
        <template #default>
          <div>Tab 1</div>
          <div>Tab 2</div>
          <div>Tab 3</div>
        </template>
        <template #content>
          <div v-if="value === 'tab1'">内容 1</div>
          <div v-if="value === 'tab2'">内容 2</div>
          <div v-if="value === 'tab3'">内容 3</div>
        </template>
      </YsTab>
    `
  })
}

export const Vertical: Story = {
  args: {
    value: 'tab1',
    orientation: 'vertical'
  },
  render: (args) => ({
    components: { YsTab },
    setup() {
      const value = ref(args.value)
      return { value }
    },
    template: `
      <YsTab v-model:value="value" :orientation="args.orientation">
        <template #default>
          <div>Tab 1</div>
          <div>Tab 2</div>
          <div>Tab 3</div>
        </template>
        <template #content>
          <div v-if="value === 'tab1'">内容 1</div>
          <div v-if="value === 'tab2'">内容 2</div>
          <div v-if="value === 'tab3'">内容 3</div>
        </template>
      </YsTab>
    `
  })
} 