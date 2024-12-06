import type { Meta, StoryObj } from '@storybook/vue3'
import YsResizablePanel from './ResizablePanel.vue'

const meta = {
  title: '通用/YsResizablePanel',
  component: YsResizablePanel,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '调整方向'
    },
    defaultLayout: {
      control: { type: 'object' },
      description: '默认布局比例'
    },
    minSize: {
      control: 'number',
      description: '最小尺寸百分比'
    },
    maxSize: {
      control: 'number',
      description: '最大尺寸百分比'
    },
    collapsible: {
      control: 'boolean',
      description: '允许面板在达到 minSize 时折叠到 collapsedSize'
    },
    collapsedSize: {
      control: 'number',
      description: '折叠时的尺寸百分比'
    },
    autoSaveId: {
      control: 'text',
      description: '设置自动保存 ID，会将布局数据保存到 localStorage'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用调整'
    }
  }
} satisfies Meta<typeof YsResizablePanel>;

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: 'horizontal',
    defaultLayout: [50, 50],
    minSize: 15,
    maxSize: 85,
    collapsible: false,
    collapsedSize: 4
  },
  parameters: {
    docs: {
      source: {
        code: `<YsResizablePanel>
  <template #first>
    <div class="flex h-[200px] items-center justify-center bg-muted">
      第一个面板
    </div>
  </template>
  <template #second>
    <div class="flex h-[200px] items-center justify-center bg-muted">
      第二个面板
    </div>
  </template>
</YsResizablePanel>`
      }
    }
  },
  render: (args: any) => ({
    components: { YsResizablePanel },
    setup() {
      return { args }
    },
    template: `
      <YsResizablePanel v-bind="args">
        <template #first>
          <div class="flex h-[200px] items-center justify-center bg-muted">
            第一个面板
          </div>
        </template>
        <template #second>
          <div class="flex h-[200px] items-center justify-center bg-muted">
            第二个面板
          </div>
        </template>
      </YsResizablePanel>
    `
  })
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    defaultLayout: [30, 70],
    minSize: 15,
    maxSize: 85,
    collapsible: false,
    collapsedSize: 4
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="h-[400px]">
  <YsResizablePanel direction="vertical" :default-layout="[30, 70]">
    <template #first>
      <div class="flex h-full items-center justify-center bg-muted">
        上面板
      </div>
    </template>
    <template #second>
      <div class="flex h-full items-center justify-center bg-muted">
        下面板
      </div>
    </template>
  </YsResizablePanel>
</div>`
      }
    }
  },
  render: (args: any) => ({
    components: { YsResizablePanel },
    setup() {
      return { args }
    },
    template: `
      <div class="h-[400px]">
        <YsResizablePanel v-bind="args">
          <template #first>
            <div class="flex h-full items-center justify-center bg-muted">
              上面板
            </div>
          </template>
          <template #second>
            <div class="flex h-full items-center justify-center bg-muted">
              下面板
            </div>
          </template>
        </YsResizablePanel>
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    direction: 'horizontal',
    defaultLayout: [30, 70],
    disabled: true
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="h-[200px]">
  <YsResizablePanel :default-layout="[30, 70]" disabled>
    <template #first>
      <div class="flex h-full items-center justify-center bg-muted">
        左侧面板（已禁用调整）
      </div>
    </template>
    <template #second>
      <div class="flex h-full items-center justify-center bg-muted">
        右侧面板（已禁用调整）
      </div>
    </template>
  </YsResizablePanel>
</div>`
      }
    }
  },
  render: (args: any) => ({
    components: { YsResizablePanel },
    setup() {
      return { args }
    },
    template: `
      <div class="h-[200px]">
        <YsResizablePanel v-bind="args">
          <template #first>
            <div class="flex h-full items-center justify-center bg-muted">
              左侧面板（已禁用调整）
            </div>
          </template>
          <template #second>
            <div class="flex h-full items-center justify-center bg-muted">
              右侧面板（已禁用调整）
            </div>
          </template>
        </YsResizablePanel>
      </div>
    `
  })
}

export const ComplexLayout: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="h-[600px]">
  <YsResizablePanel :default-layout="[30, 70]">
    <!-- 左侧面板 -->
    <template #first>
      <div class="flex h-full flex-col bg-muted p-4">
        <h3 class="mb-4 text-lg font-semibold">导航菜单</h3>
        <div class="space-y-2">
          <div class="rounded bg-background p-2">首页</div>
          <div class="rounded bg-background p-2">设置</div>
          <div class="rounded bg-background p-2">用户</div>
        </div>
      </div>
    </template>
    
    <!-- 右侧面板 -->
    <template #second>
      <YsResizablePanel direction="vertical" :default-layout="[60, 40]">
        <!-- 上部内容区 -->
        <template #first>
          <YsResizablePanel :default-layout="[40, 60]">
            <!-- 左侧内容 -->
            <template #first>
              <div class="flex h-full flex-col bg-muted/50 p-4">
                <h3 class="mb-4 text-lg font-semibold">数据概览</h3>
                <div class="space-y-4">
                  <div class="rounded bg-background p-4">
                    <h4 class="mb-2 font-medium">访问统计</h4>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span>今日访问</span>
                        <span class="font-mono">1,234</span>
                      </div>
                      <div class="flex justify-between">
                        <span>总访问量</span>
                        <span class="font-mono">1,234,567</span>
                      </div>
                    </div>
                  </div>
                  <div class="rounded bg-background p-4">
                    <h4 class="mb-2 font-medium">系统状态</h4>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span>CPU 使用率</span>
                        <span class="font-mono text-success">32%</span>
                      </div>
                      <div class="flex justify-between">
                        <span>内存使用率</span>
                        <span class="font-mono text-warning">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            
            <!-- 右侧内容 -->
            <template #second>
              <div class="flex h-full flex-col bg-muted/30 p-4">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="text-lg font-semibold">实时监控</h3>
                  <div class="rounded bg-background px-2 py-1 text-sm">
                    实时更新中...
                  </div>
                </div>
                <div class="grid flex-1 grid-cols-2 gap-4">
                  <div class="rounded bg-background p-4">
                    <h4 class="mb-2 font-medium">服务器 A</h4>
                    <div class="space-y-1">
                      <div class="h-1 rounded bg-success/20">
                        <div class="h-1 w-1/3 rounded bg-success" />
                      </div>
                      <div class="text-right text-sm text-muted-foreground">
                        正常运行
                      </div>
                    </div>
                  </div>
                  <div class="rounded bg-background p-4">
                    <h4 class="mb-2 font-medium">服务器 B</h4>
                    <div class="space-y-1">
                      <div class="h-1 rounded bg-warning/20">
                        <div class="h-1 w-4/5 rounded bg-warning" />
                      </div>
                      <div class="text-right text-sm text-muted-foreground">
                        负载较高
                      </div>
                    </div>
                  </div>
                  <div class="rounded bg-background p-4">
                    <h4 class="mb-2 font-medium">服务器 C</h4>
                    <div class="space-y-1">
                      <div class="h-1 rounded bg-destructive/20">
                        <div class="h-1 w-[95%] rounded bg-destructive" />
                      </div>
                      <div class="text-right text-sm text-muted-foreground">
                        需要注意
                      </div>
                    </div>
                  </div>
                  <div class="rounded bg-background p-4">
                    <h4 class="mb-2 font-medium">服务器 D</h4>
                    <div class="space-y-1">
                      <div class="h-1 rounded bg-success/20">
                        <div class="h-1 w-2/3 rounded bg-success" />
                      </div>
                      <div class="text-right text-sm text-muted-foreground">
                        运行良好
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </YsResizablePanel>
        </template>
        
        <!-- 下部控制台区 -->
        <template #second>
          <div class="flex h-full flex-col bg-muted p-4">
            <div class="mb-2 flex items-center justify-between">
              <h3 class="text-lg font-semibold">系统日志</h3>
              <div class="flex space-x-2">
                <div class="h-3 w-3 rounded-full bg-warning" />
                <div class="h-3 w-3 rounded-full bg-success" />
                <div class="h-3 w-3 rounded-full bg-destructive" />
              </div>
            </div>
            <div class="flex-1 rounded bg-background p-2 font-mono text-sm">
              <div class="space-y-1">
                <div class="flex items-center text-success">
                  <span class="mr-2">✓</span>
                  <span>[10:24:31]</span>
                  <span class="ml-2">系统初始化完成</span>
                </div>
                <div class="flex items-center text-warning">
                  <span class="mr-2">⚠</span>
                  <span>[10:24:45]</span>
                  <span class="ml-2">检测到服务器 B 负载升高</span>
                </div>
                <div class="flex items-center text-destructive">
                  <span class="mr-2">⚡</span>
                  <span>[10:25:00]</span>
                  <span class="ml-2">服务器 C 内存使用率超过 95%</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">ℹ</span>
                  <span>[10:25:15]</span>
                  <span class="ml-2">开始执行自动优化...</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </YsResizablePanel>
    </template>
  </YsResizablePanel>
</div>`
      }
    }
  },
  render: () => ({
    components: { YsResizablePanel },
    template: `
      <div class="h-[600px]">
        <YsResizablePanel :default-layout="[30, 70]" collapsible>
          <!-- 左侧面板 -->
          <template #first>
            <div class="flex h-full flex-col bg-muted p-4">
              <h3 class="mb-4 text-lg font-semibold">导航菜单</h3>
              <div class="space-y-2">
                <div class="rounded bg-background p-2">首页</div>
                <div class="rounded bg-background p-2">设置</div>
                <div class="rounded bg-background p-2">用户</div>
              </div>
            </div>
          </template>
          
          <!-- 右侧面板 -->
          <template #second>
            <YsResizablePanel direction="vertical" :default-layout="[60, 40]">
              <!-- 上部内容区 -->
              <template #first>
                <YsResizablePanel :default-layout="[40, 60]">
                  <!-- 左侧内容 -->
                  <template #first>
                    <div class="flex h-full flex-col bg-muted/50 p-4">
                      <h3 class="mb-4 text-lg font-semibold">数据概览</h3>
                      <div class="space-y-4">
                        <div class="rounded bg-background p-4">
                          <h4 class="mb-2 font-medium">访问统计</h4>
                          <div class="space-y-2">
                            <div class="flex justify-between">
                              <span>今日访问</span>
                              <span class="font-mono">1,234</span>
                            </div>
                            <div class="flex justify-between">
                              <span>总访问量</span>
                              <span class="font-mono">1,234,567</span>
                            </div>
                          </div>
                        </div>
                        <div class="rounded bg-background p-4">
                          <h4 class="mb-2 font-medium">系统状态</h4>
                          <div class="space-y-2">
                            <div class="flex justify-between">
                              <span>CPU 使用率</span>
                              <span class="font-mono text-success">32%</span>
                            </div>
                            <div class="flex justify-between">
                              <span>内存使用率</span>
                              <span class="font-mono text-warning">78%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  
                  <!-- 右侧内容 -->
                  <template #second>
                    <div class="flex h-full flex-col bg-muted/30 p-4">
                      <div class="mb-4 flex items-center justify-between">
                        <h3 class="text-lg font-semibold">实时监控</h3>
                        <div class="rounded bg-background px-2 py-1 text-sm">
                          实时更新中...
                        </div>
                      </div>
                      <div class="grid flex-1 grid-cols-2 gap-4">
                        <div class="rounded bg-background p-4">
                          <h4 class="mb-2 font-medium">服务器 A</h4>
                          <div class="space-y-1">
                            <div class="h-1 rounded bg-success/20">
                              <div class="h-1 w-1/3 rounded bg-success" />
                            </div>
                            <div class="text-right text-sm text-muted-foreground">
                              正常运行
                            </div>
                          </div>
                        </div>
                        <div class="rounded bg-background p-4">
                          <h4 class="mb-2 font-medium">服务器 B</h4>
                          <div class="space-y-1">
                            <div class="h-1 rounded bg-warning/20">
                              <div class="h-1 w-4/5 rounded bg-warning" />
                            </div>
                            <div class="text-right text-sm text-muted-foreground">
                              负载较高
                            </div>
                          </div>
                        </div>
                        <div class="rounded bg-background p-4">
                          <h4 class="mb-2 font-medium">服务器 C</h4>
                          <div class="space-y-1">
                            <div class="h-1 rounded bg-destructive/20">
                              <div class="h-1 w-[95%] rounded bg-destructive" />
                            </div>
                            <div class="text-right text-sm text-muted-foreground">
                              需要注意
                            </div>
                          </div>
                        </div>
                        <div class="rounded bg-background p-4">
                          <h4 class="mb-2 font-medium">服务器 D</h4>
                          <div class="space-y-1">
                            <div class="h-1 rounded bg-success/20">
                              <div class="h-1 w-2/3 rounded bg-success" />
                            </div>
                            <div class="text-right text-sm text-muted-foreground">
                              运行良好
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </YsResizablePanel>
              </template>
              
              <!-- 下部控制台区 -->
              <template #second>
                <div class="flex h-full flex-col bg-muted p-4">
                  <div class="mb-2 flex items-center justify-between">
                    <h3 class="text-lg font-semibold">系统日志</h3>
                    <div class="flex space-x-2">
                      <div class="h-3 w-3 rounded-full bg-warning" />
                      <div class="h-3 w-3 rounded-full bg-success" />
                      <div class="h-3 w-3 rounded-full bg-destructive" />
                    </div>
                  </div>
                  <div class="flex-1 rounded bg-background p-2 font-mono text-sm">
                    <div class="space-y-1">
                      <div class="flex items-center text-success">
                        <span class="mr-2">✓</span>
                        <span>[10:24:31]</span>
                        <span class="ml-2">系统初始化完成</span>
                      </div>
                      <div class="flex items-center text-warning">
                        <span class="mr-2">⚠</span>
                        <span>[10:24:45]</span>
                        <span class="ml-2">检测到服务器 B 负载升高</span>
                      </div>
                      <div class="flex items-center text-destructive">
                        <span class="mr-2">⚡</span>
                        <span>[10:25:00]</span>
                        <span class="ml-2">服务器 C 内存使用率超过 95%</span>
                      </div>
                      <div class="flex items-center">
                        <span class="mr-2">ℹ</span>
                        <span>[10:25:15]</span>
                        <span class="ml-2">开始执行自动优化...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </YsResizablePanel>
          </template>
        </YsResizablePanel>
      </div>
    `
  })
};

export const Collapsible: Story = {
  args: {
    direction: 'horizontal',
    defaultLayout: [25, 75],
    minSize: 30,
    maxSize: 70,
    collapsible: true,
    collapsedSize: 4
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="h-[400px]">
  <YsResizablePanel
    :collapsible="true"
    :default-layout="[25, 75]"
    :collapsed-size="4"
  >
    <template #first>
      <div class="flex h-full flex-col gap-4 p-6">
        <div class="flex items-center justify-between">
          <span class="font-semibold">导航菜单</span>
        </div>
        <nav class="space-y-2">
          <div class="rounded-md bg-secondary/50 p-2">仪表盘</div>
          <div class="rounded-md bg-secondary/50 p-2">用户管理</div>
          <div class="rounded-md bg-secondary/50 p-2">系统设置</div>
        </nav>
      </div>
    </template>
    <template #second>
      <div class="flex h-full flex-col gap-4 p-6">
        <h3 class="text-lg font-semibold">主内容区域</h3>
        <div class="rounded-lg border bg-card p-4">
          <p class="text-sm text-muted-foreground">
            这是一个可折叠侧边栏的示例，你可以：
            <br/>1. 拖动分隔线调整两个面板的宽度
            <br/>2. 双击分隔线可以折叠/展开侧边栏
          </p>
        </div>
      </div>
    </template>
  </YsResizablePanel>
</div>`
      }
    }
  },
  render: (args: any) => ({
    components: { YsResizablePanel },
    setup() {
      return { args }
    },
    template: `
      <div class="h-[400px]">
        <YsResizablePanel v-bind="args">
          <template #first>
            <div class="flex h-full flex-col gap-4 p-6">
              <div class="flex items-center justify-between">
                <span class="font-semibold">导航菜单</span>
              </div>
              <nav class="space-y-2">
                <div class="rounded-md bg-secondary/50 p-2">仪表盘</div>
                <div class="rounded-md bg-secondary/50 p-2">用户管理</div>
                <div class="rounded-md bg-secondary/50 p-2">系统设置</div>
              </nav>
            </div>
          </template>
          <template #second>
            <div class="flex h-full flex-col gap-4 p-6">
              <h3 class="text-lg font-semibold">主内容区域</h3>
              <div class="rounded-lg border bg-card p-4">
                <p class="text-sm text-muted-foreground">
                  这是一个可折叠侧边栏的示例，你可以：
                  <br/>1. 拖动分隔线调整两个面板的宽度
                  <br/>2. 当小于最小尺寸时，面板会折叠
                </p>
              </div>
            </div>
          </template>
        </YsResizablePanel>
      </div>
    `
  })
}