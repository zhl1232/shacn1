import { Icon } from '@iconify/vue';
import './assets/index.css';
import type { App } from 'vue';

// 导入所有组件
import YsButton from './composite/button';
import YsCard from './composite/card';
import YsAvatar from './composite/avatar';
import YsTab from './composite/tab';
import YsTooltip from './composite/tooltip';

// 组件列表
const components = {
  YsButton,
  YsCard,
  YsAvatar,
  YsTab,
  YsTooltip,
  Icon
};

// 插件安装函数
export function install(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}

// 默认导出
export default { install };

// UI Components
export * from './ui/separator'
export * from './ui/tooltip'

// Utils
export * from './lib/utils'
