<script lang="ts" setup>
import type { Mail } from '../data/mails';
import { accounts, mails } from '../data/mails';

import { Separator } from '@ys/components/ui/separator';

import { cn } from '@ys/components/lib/utils';
import {  ref } from 'vue';
import AccountSwitcher from './AccountSwitcher.vue';
import Nav, { type LinkProp } from './Nav.vue';
import { TooltipProvider } from '@ys/components/ui/tooltip'

interface MailProps {
  accounts?: {
    label: string;
    email: string;
    icon: string;
  }[];
  mails?: Mail[];
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

const props = withDefaults(defineProps<MailProps>(), {
  accounts: () => accounts,
  mails: () => mails,
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655],
  navCollapsedSize: 4
});

const isCollapsed = ref(props.defaultCollapsed);

const links: LinkProp[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'default',
    to: '/'
  },
  {
    title: 'Dashboard',
    label: '',
    icon: 'material-symbols:dashboard-outline',
    variant: 'ghost',
    to: '/dashboard'
  },
  {
    title: 'Sent',
    label: '',
    icon: 'lucide:send',
    variant: 'ghost',
    to: '/sent'
  },
  {
    title: 'Junk',
    label: '23',
    icon: 'lucide:archive',
    variant: 'ghost'
  },
  {
    title: 'Trash',
    label: '',
    icon: 'lucide:trash',
    variant: 'ghost'
  },
  {
    title: 'Archive',
    label: '',
    icon: 'lucide:archive',
    variant: 'ghost'
  }
];

const links2: LinkProp[] = [
  {
    title: 'Social',
    label: '972',
    icon: 'lucide:user-2',
    variant: 'ghost',
    to: '/social'
  },
  {
    title: 'Updates',
    label: '342',
    icon: 'lucide:alert-circle',
    variant: 'ghost'
  },
  {
    title: 'Forums',
    label: '128',
    icon: 'lucide:message-square',
    variant: 'ghost'
  },
  {
    title: 'Shopping',
    label: '8',
    icon: 'lucide:shopping-cart',
    variant: 'ghost'
  },
  {
    title: 'Promotions',
    label: '21',
    icon: 'lucide:archive',
    variant: 'ghost'
  }
];

function onCollapse() {
  isCollapsed.value = true;
}

function onExpand() {
  isCollapsed.value = false;
}
</script>

<template>
  <div class="h-screen w-full">
    <TooltipProvider>
      <YsResizablePanel
        class="h-full"
        :default-layout="[20, 80]"
        collapsible
        :collapsed-size="navCollapsedSize"
        @collapse="onCollapse"
        @expand="onExpand"
      >
        <!-- 左侧导航面板 -->
        <template #first>
          <div class="flex h-full flex-col">
            <div
              :class="
                cn(
                  'flex h-[52px] items-center justify-center',
                  isCollapsed ? 'h-[52px]' : 'px-2'
                )
              "
            >
              <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
            </div>
            <Separator />
            <div class="flex-1 overflow-auto">
              <Nav :is-collapsed="isCollapsed" :links="links" />
              <Separator />
              <Nav :is-collapsed="isCollapsed" :links="links2" />
            </div>
          </div>
        </template>

        <!-- 右侧内容区 -->
        <template #second>
          <div class="h-full overflow-auto">
            <RouterView />
          </div>
        </template>
      </YsResizablePanel>
    </TooltipProvider>
  </div>
</template>
