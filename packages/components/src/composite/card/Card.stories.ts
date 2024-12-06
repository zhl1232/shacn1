import type { Meta, StoryObj } from '@storybook/vue3'
import YsCard from './Card.vue'

const meta = {
  title: '通用/YsCard',
  component: YsCard,
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'select',
      options: ['never', 'always', 'hover']
    },
    title: {
      control: 'text'
    },
    titleClass: {
      control: 'text'
    },
    bodyClass: {
      control: 'text'
    }
  }
} satisfies Meta<typeof YsCard>;

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: '卡片标题'
  },
  parameters: {
    docs: {
      source: {
        code: `<YsCard v-bind="args">
  <template #default>这是卡片的内容</template>
</YsCard>`
      }
    }
  },
  render: (args) => ({
    components: { YsCard },
    setup() {
      return { args }
    },
    template: `
      <YsCard v-bind="args">
        <template #default>这是卡片的内容</template>
      </YsCard>
    `
  })
}

export const WithExtra: Story = {
  args: {
    title: '带额外内容的卡片'
  },
  parameters: {
    docs: {
      source: {
        code: `<YsCard v-bind="args">
  <template #extra>
    <a href="#">更多</a>
  </template>
  <template #default>这是卡片的内容</template>
</YsCard>`
      }
    }
  },
  render: (args) => ({
    components: { YsCard },
    setup() {
      return { args }
    },
    template: `
      <YsCard v-bind="args">
        <template #extra>
          <a href="#">更多</a>
        </template>
        <template #default>这是卡片的内容</template>
      </YsCard>
    `
  })
}

export const WithFooter: Story = {
  args: {
    title: '带页脚的卡片'
  },
  parameters: {
    docs: {
      source: {
        code: `<YsCard v-bind="args">
  <template #default>这是卡片的内容</template>
  <template #footer>
    <div class="flex justify-end space-x-2">
      <button>取消</button>
      <button>确定</button>
    </div>
  </template>
</YsCard>`
      }
    }
  },
  render: (args) => ({
    components: { YsCard },
    setup() {
      return { args }
    },
    template: `
      <YsCard v-bind="args">
        <template #default>这是卡片的内容</template>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <button>取消</button>
            <button>确定</button>
          </div>
        </template>
      </YsCard>
    `
  })
}

export const AlwaysShadow: Story = {
  args: {
    title: '总是显示阴影',
    shadow: 'always'
  },
  parameters: {
    docs: {
      source: {
        code: `<YsCard v-bind="args">
  <template #default>这是卡片的内容</template>
</YsCard>`
      }
    }
  },
  render: (args) => ({
    components: { YsCard },
    setup() {
      return { args }
    },
    template: `
      <YsCard v-bind="args">
        <template #default>这是卡片的内容</template>
      </YsCard>
    `
  })
}

export const HoverShadow: Story = {
  args: {
    title: '悬浮显示阴影',
    shadow: 'hover'
  },
  parameters: {
    docs: {
      source: {
        code: `<YsCard v-bind="args">
  <template #default>这是卡片的内容</template>
</YsCard>`
      }
    }
  },
  render: (args) => ({
    components: { YsCard },
    setup() {
      return { args }
    },
    template: `
      <YsCard v-bind="args">
        <template #default>这是卡片的内容</template>
      </YsCard>
    `
  })
} 