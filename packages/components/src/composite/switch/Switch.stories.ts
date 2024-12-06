import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import YsSwitch from './Switch.vue';

const meta = {
  title: '数据录入/YsSwitch',
  component: YsSwitch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '开关状态'
    },
    type: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: '开关类型'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    }
  }
} satisfies Meta<typeof YsSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    modelValue: false
  },
  parameters: {
    docs: {
      source: {
        code: `<YsSwitch v-model="checked" />`
      }
    }
  },
  render: (args) => ({
    components: { YsSwitch },
    setup() {
      const checked = ref(args.modelValue);
      return { checked };
    },
    template: '<YsSwitch v-model="checked" />'
  })
};

export const Types: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex items-center space-x-4">
  <YsSwitch v-model="checked1" type="default" />
  <YsSwitch v-model="checked2" type="primary" />
  <YsSwitch v-model="checked3" type="success" />
  <YsSwitch v-model="checked4" type="warning" />
  <YsSwitch v-model="checked5" type="danger" />
</div>`
      }
    }
  },
  render: () => ({
    components: { YsSwitch },
    setup() {
      const checked1 = ref(true);
      const checked2 = ref(true);
      const checked3 = ref(true);
      const checked4 = ref(true);
      const checked5 = ref(true);
      return { checked1, checked2, checked3, checked4, checked5 };
    },
    template: `
      <div class="flex items-center space-x-4">
        <YsSwitch v-model="checked1" type="default" />
        <YsSwitch v-model="checked2" type="primary" />
        <YsSwitch v-model="checked3" type="success" />
        <YsSwitch v-model="checked4" type="warning" />
        <YsSwitch v-model="checked5" type="danger" />
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="flex items-center space-x-4">
  <YsSwitch v-model="checked" disabled />
  <YsSwitch v-model="checked2" disabled />
</div>`
      }
    }
  },
  render: () => ({
    components: { YsSwitch },
    setup() {
      const checked = ref(false);
      const checked2 = ref(true);
      return { checked, checked2 };
    },
    template: `
      <div class="flex items-center space-x-4">
        <YsSwitch v-model="checked" disabled />
        <YsSwitch v-model="checked2" disabled />
      </div>
    `
  })
};

export const WithText: Story = {
  args: {
    checkedText: '开',
    uncheckedText: '关'
  },
  parameters: {
    docs: {
      source: {
        code: `<YsSwitch v-model="checked" checkedText="开" uncheckedText="关" />`
      }
    }
  },
  render: (args) => ({
    components: { YsSwitch },
    setup() {
      const checked = ref(false);
      return { checked, args };
    },
    template: '<YsSwitch v-model="checked" v-bind="args" />'
  })
};

export const CustomText: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="flex flex-col gap-4">
  <div class="flex items-center space-x-4">
    <YsSwitch v-model="checked1" checkedText="ON" uncheckedText="OFF" type="primary" />
    <YsSwitch v-model="checked2" checkedText="是" uncheckedText="否" type="success" />
    <YsSwitch v-model="checked3" checkedText="同意" uncheckedText="拒绝" type="warning" />
  </div>
  <div class="flex items-center space-x-4">
    <YsSwitch v-model="checked4" checkedText="已启用" uncheckedText="未启用" type="primary" />
    <YsSwitch v-model="checked5" checkedText="允许访问" uncheckedText="禁止访问" type="success" />
    <YsSwitch v-model="checked6" checkedText="开启推送超长文字" uncheckedText="关闭推送超长文字" type="warning" />
  </div>
</div>
      `
      }
    }
  },
  render: () => ({
    components: { YsSwitch },
    setup() {
      const checked1 = ref(true);
      const checked2 = ref(true);
      const checked3 = ref(true);
      const checked4 = ref(true);
      const checked5 = ref(true);
      const checked6 = ref(true);
      return {
        checked1,
        checked2,
        checked3,
        checked4,
        checked5,
        checked6
      };
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center space-x-4">
          <YsSwitch v-model="checked1" checkedText="ON" uncheckedText="OFF" type="primary" />
          <YsSwitch v-model="checked2" checkedText="是" uncheckedText="否" type="success" />
          <YsSwitch v-model="checked3" checkedText="同意" uncheckedText="拒绝" type="warning" />
        </div>
        <div class="flex items-center space-x-4">
          <YsSwitch v-model="checked4" checkedText="已启用" uncheckedText="未启用" type="primary" />
          <YsSwitch v-model="checked5" checkedText="允许访问" uncheckedText="禁止访问" type="success" />
          <YsSwitch v-model="checked6" checkedText="开启推送超长文字" uncheckedText="关闭推送超长文字" type="warning" />
        </div>
      </div>
    `
  })
};
