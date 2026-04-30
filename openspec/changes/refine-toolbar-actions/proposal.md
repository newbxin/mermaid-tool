## 背景

当前预览工具栏已经支持缩放、最大化和 SVG/PNG 导出，但交互形态仍偏基础：部分按钮缺少清晰的悬停说明，导出格式由两个并列按钮承担，缩放输入的错误提示依赖普通文本展示，最大化按钮也没有通过图标状态直接表达“进入/退出”的差异。

引入 Radix Tooltip、Radix Select 与 `lucide-react` 可以让工具栏动作更一致、更可访问，并减少文字按钮占用的空间。导出格式改为先选择格式再点击下载，也能让导出动作更接近一个稳定的工具栏工作流。

## 变更内容

- 添加 `@radix-ui/react-tooltip`、`@radix-ui/react-select` 和 `lucide-react` 作为前端依赖。
- 预览工具栏下载动作、中间 Convert 动作使用 lucide 图标按钮，最大化动作使用进入/退出最大化图标。
- Editor 和 Preview 的最大化按钮根据当前状态切换对应图标，并通过 Tooltip 说明动作。
- 缩放百分比与缩放步长的错误提示改用提示组件展示，同时保留输入框与错误内容之间的无障碍关联。
- SVG/PNG 导出改为 Radix Select 选择导出格式，再点击下载按钮执行导出。
- 补充构建验证、手动交互验收和无障碍验收要求。

## 能力影响

### 修改的能力

- `mermaid-preview`: 预览工具栏动作使用 Radix Tooltip/Select 与 lucide 图标呈现；导出格式通过 Select 选择；缩放输入错误通过提示组件展示并保持无障碍错误关联；最大化按钮图标随状态切换。

### 新增能力

_无。_

## 影响范围

- 影响 `src/components/EditorPanel.tsx`、`src/components/PreviewPanel.tsx`、`src/App.tsx` 或承载最大化/工具栏按钮的等效组件。
- 影响 `src/styles/global.css` 和相关工具栏、Tooltip、Select、错误提示样式。
- 影响 `package.json` 与锁文件，需要安装 Radix Tooltip、Radix Select、lucide-react。
- 不改变 Mermaid 渲染、DOMPurify 清理、缩放范围配置、拖拽平移和本地导出实现。
- 不引入后端服务，图表源码仍只在浏览器本地处理。
