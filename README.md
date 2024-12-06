
### 1. 目录结构规范

`apps/core`
```
src/
├── assets/         # 静态资源文件
├── components/     # 全局通用组件
├── data/          # 数据模拟和初始化
├── i18n/          # 国际化配置
│   └── langs/     # 语言包
├── lib/           # 工具库
├── model/         # 数据模型/接口定义
├── router/        # 路由配置
├── services/      # 服务层
├── ui/            # UI基础组件
└── views/         # 页面视图
    ├── components/  # 页面级组件
    ├── layouts/    # 布局组件
    └── pages/      # 具体页面
```
`packages/components`
├── .storybook/                    // Storybook配置目录，用于组件文档和开发预览
├── src/                          // 源代码目录
│   ├── assets/                   // 静态资源目录（主题样式）
│   ├── lib/                      // 基础库文件目录（shadcn 依赖）
│   ├── ui/                       // 基础UI组件目录（shadcn 原子组件）
│   ├── composite/                // 复合组件目录（由多个基础组件组合而成的复杂组件）
│   ├── utils/                    // 工具函数目录（通用辅助函数）
│   └── index.ts                  // 组件库入口文件，统一导出所有组件
├── components.json               // shadcn 组件配置文件，定义组件的基本信息和配置

### 2. 命名规范

除了入口 main.ts、router/index.ts 等根文件夹下，禁止使用 index、main 命名（重复太多，debug 很难找到对应文件。）

1. **文件命名**:
- 组件文件: Pascal Case (如 `CardGit.vue`, `ChatContent.vue`)
- 工具类文件: Camel Case (如 `utils.ts`)
- 样式文件: Kebab Case (如 `base.css`)

2. **组件命名**:
- 组件名使用 Pascal Case
```vue
export default defineComponent({
  name: 'ChatContent',
})
```

3. **目录命名**:
- 全部小写
- 多个单词用连字符连接 (如 `card-components/`)


### 3. 国际化规范

1. **翻译文件组织**:
```
i18n/
└── langs/
    ├── zhCn/
    │   ├── Common.ts
    │   └── index.ts
    └── en/
```

2. **翻译 key 命名**:
- 按模块划分
- 使用点号分隔层级
```typescript
{
  common: {
    button: '按钮',
    search: '搜索'
  }
}
```

### 4. 使用依赖
1. **icon**
- [@iconify/vue](https://icon-sets.iconify.design/)