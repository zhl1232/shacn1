import type { Meta, StoryObj } from '@storybook/vue3';
import { Input } from '.';
import Button from '@ys/components/composite/button';
import { ref } from 'vue';
import {
  Search,
  Link,
  DollarSign,
  Calendar,
  Mail,
  User
} from 'lucide-vue-next';

const meta = {
  title: '数据录入/YsInput',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg']
    }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '请输入内容'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: '小尺寸输入框'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: '大尺寸输入框'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '禁用状态'
  }
};



export const WithSuffix = {
  render: () => ({
    components: { Input, Button, Search, Link, DollarSign, Calendar, Mail, User },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex">
          <Input placeholder="请输入搜索内容">
            <template #suffix>
              <Button type="primary">搜索</Button>
            </template>
          </Input>
        </div>
        <div class="flex">
          <Input
            placeholder="输入网址"
            prefixText="https://"
            suffixText=".com"
          />
        </div>
        <div class="flex">
          <Input placeholder="搜索...">
            <template #prefix>
                <Search class="h-4 w-4 text-muted-foreground" />
            </template>
          </Input>
        </div>
        <div class="flex">
          <Input placeholder="输入链接">
            <template #prefix>
                <Link class="h-4 w-4 text-muted-foreground" />
            </template>
          </Input>
        </div>
        <div class="flex">
          <Input placeholder="输入金额" type="number">
            <template #prefix>
                <DollarSign class="h-4 w-4 text-muted-foreground" />
            </template>
          </Input>
        </div>
        <div class="flex">
          <Input placeholder="选择日期">
            <template #suffix>
                <Calendar class="h-4 w-4 text-muted-foreground" />
            </template>
          </Input>
        </div>
      </div>
    `
  })
};

export const TwoWayBinding = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <div class="space-y-4">
        <div class="text-sm text-slate-500">当前输入的内容：{{ value || '暂无内容' }}</div>
        <Input v-model="value" placeholder="请输入任意内容" />
      </div>
    `
  })
};
