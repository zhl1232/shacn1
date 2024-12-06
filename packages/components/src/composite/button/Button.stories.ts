import type { Meta, StoryObj } from '@storybook/vue3';
import YsButton from './Button.vue';

const meta = {
  title: '通用/YsButton',
  component: YsButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: '按钮类型'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '按钮大小'
    },
    circle: {
      control: 'boolean',
      description: '是否为圆形按钮'
    },
    loading: {
      control: 'boolean',
      description: '加载状态'
    },
    disabled: {
      control: 'boolean',
      description: '禁用状态'
    },
    icon: {
      control: 'text',
      description: '图标类名'
    },
    onClick: {
      action: 'click',
      description: '点击事件'
    }
  }
} satisfies Meta<typeof YsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'default',
    size: 'default',
    circle: false,
    loading: false,
    disabled: false,
    icon: ''
  },
  parameters: {
    docs: {
      source: {
        code: '<YsButton v-bind="args">按钮</YsButton>'
      }
    }
  },
  render: (args) => ({
    components: { YsButton },
    setup() {
      return { args };
    },
    template: '<YsButton v-bind="args">按钮</YsButton>'
  })
};

export const Types: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex gap-4">
  <YsButton>默认按钮</YsButton>
  <YsButton type="primary">主要按钮</YsButton>
  <YsButton type="success">成功按钮</YsButton>
  <YsButton type="warning">警告按钮</YsButton>
  <YsButton type="danger">危险按钮</YsButton>
</div>`
      }
    }
  },
  render: () => ({
    components: { YsButton },
    template: `
      <div class="flex gap-4">
        <YsButton>默认按钮</YsButton>
        <YsButton type="primary">主要按钮</YsButton>
        <YsButton type="success">成功按钮</YsButton>
        <YsButton type="warning">警告按钮</YsButton>
        <YsButton type="danger">危险按钮</YsButton>
      </div>
    `
  })
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex items-center gap-4">
  <YsButton size="sm">小按钮</YsButton>
  <YsButton size="default">中按钮</YsButton>
  <YsButton size="lg">大按钮</YsButton>
</div>`
      }
    }
  },
  render: () => ({
    components: { YsButton },
    template: `
      <div class="flex items-center gap-4">
        <YsButton size="sm">小按钮</YsButton>
        <YsButton size="default">中按钮</YsButton>
        <YsButton size="lg">大按钮</YsButton>
      </div>
    `
  })
};

export const Circle: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex items-center gap-4">
  <YsButton circle icon="mdi:plus" />
  <YsButton circle type="primary" icon="mdi:pencil" />
  <YsButton circle type="success" icon="mdi:check" />
  <YsButton circle type="warning" icon="mdi:alert" />
  <YsButton circle type="danger" icon="mdi:delete" />
</div>`
      }
    }
  },
  render: () => ({
    components: { YsButton },
    template: `
      <div class="flex items-center gap-4">
        <YsButton circle icon="mdi:plus" />
        <YsButton circle type="primary" icon="mdi:pencil" />
        <YsButton circle type="success" icon="mdi:check" />
        <YsButton circle type="warning" icon="mdi:alert" />
        <YsButton circle type="danger" icon="mdi:delete" />
      </div>
    `
  })
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex gap-4">
  <YsButton icon="mdi:plus">新增</YsButton>
  <YsButton type="primary" icon="mdi:pencil">编辑</YsButton>
  <YsButton type="success" icon="mdi:check">确认</YsButton>
  <YsButton type="warning" icon="mdi:alert">警告</YsButton>
  <YsButton type="danger" icon="mdi:delete">删除</YsButton>
</div>`
      }
    }
  },
  render: () => ({
    components: { YsButton },
    template: `
      <div class="flex gap-4">
        <YsButton icon="mdi:plus">新增</YsButton>
        <YsButton type="primary" icon="mdi:pencil">编辑</YsButton>
        <YsButton type="success" icon="mdi:check">确认</YsButton>
        <YsButton type="warning" icon="mdi:alert">警告</YsButton>
        <YsButton type="danger" icon="mdi:delete">删除</YsButton>
      </div>
    `
  })
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: {
        code: '<YsButton loading>加载中</YsButton>'
      }
    }
  },
  render: () => ({
    components: { YsButton },
    template: '<YsButton loading>加载中</YsButton>'
  })
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex gap-4">
  <YsButton disabled>默认按钮</YsButton>
  <YsButton disabled type="primary">主要按钮</YsButton>
  <YsButton disabled type="success">成功按钮</YsButton>
  <YsButton disabled type="warning">警告按钮</YsButton>
  <YsButton disabled type="danger">危险按钮</YsButton>
</div>`
      }
    }
  },
  render: () => ({
    components: { YsButton },
    template: `
      <div class="flex gap-4">
        <YsButton disabled>默认按钮</YsButton>
        <YsButton disabled type="primary">主要按钮</YsButton>
        <YsButton disabled type="success">成功按钮</YsButton>
        <YsButton disabled type="warning">警告按钮</YsButton>
        <YsButton disabled type="danger">危险按钮</YsButton>
      </div>
    `
  })
};
