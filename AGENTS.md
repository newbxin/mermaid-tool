# Mermaid Tool Agent Guide

## 项目概览

这是一个基于 React 18、TypeScript 和 Vite 的 Mermaid 图表编辑与预览工具。应用在浏览器端完成 Mermaid 代码编辑、渲染预览、缩放拖拽和 SVG/PNG 导出，不依赖后端服务。

核心体验：

- 左侧使用 CodeMirror 6 编辑 Mermaid 代码。
- 中间 `Convert` 按钮触发 Mermaid 渲染。
- 右侧显示清理后的 SVG 预览，并支持缩放、拖拽、导出。
- 支持编辑区和预览区最大化。
- 支持 Dark / Light 主题切换。

## 技术栈

- React 18
- TypeScript
- Vite
- Mermaid
- CodeMirror 6
- DOMPurify
- file-saver

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

说明：

- `npm run dev` 启动 Vite 开发服务，通常访问 `http://localhost:5173`。
- `npm run build` 先执行 TypeScript 构建，再打包生产版本。
- `npm run preview` 本地预览 `dist/` 构建产物。

## 重要目录与文件

- `src/App.tsx`：应用主布局，维护 Mermaid 代码、最大化面板状态，并串联编辑器、转换按钮、预览和状态栏。
- `src/components/EditorPanel.tsx`：CodeMirror 编辑器封装。
- `src/components/PreviewPanel.tsx`：预览区域、缩放输入、缩放按钮、Shift + 滚轮缩放、拖拽平移、SVG/PNG 导出入口。
- `src/components/CenterBar.tsx`：中间转换操作区。
- `src/components/Header.tsx`：标题与主题切换入口。
- `src/components/StatusBar.tsx`：渲染状态、图表类型和错误提示。
- `src/hooks/useMermaid.ts`：Mermaid 动态加载、解析、渲染和 DOMPurify 清理逻辑。
- `src/hooks/useTheme.tsx`：主题状态管理。
- `src/lib/download.ts`：SVG 文本下载和 SVG 转 PNG 下载。
- `src/config/preview.ts`：预览缩放全局配置，例如最小/最大缩放和默认步长。
- `src/styles/tokens.css`：设计变量。
- `src/styles/global.css`：全局布局和组件样式。
- `openspec/changes/`：OpenSpec 变更提案、设计、任务和规格。

## 当前 OpenSpec 上下文

仓库中存在 `configurable-preview-zoom` 变更，目标是让预览缩放更可配置、更易用：

- 全局配置缩放范围：`PREVIEW_MIN_ZOOM = 0.1`、`PREVIEW_MAX_ZOOM = 20`。
- 默认缩放步长：`PREVIEW_DEFAULT_ZOOM_STEP_PERCENT = 100`。
- `Shift` + 鼠标滚轮缩放图表，普通滚轮保留为预览区域滚动。
- 支持直接输入缩放百分比，合法范围为 `10` 到 `2000`，且必须是 `10` 的正整数倍。
- 支持输入缩放步长，必须是 `10` 的正整数倍。
- 缩放后的图表可拖拽平移。
- `Shift` + 滚轮缩放应阻止浏览器水平滚动，并尽量保持鼠标指向位置稳定。

修改相关能力时，应同步检查：

- `openspec/changes/configurable-preview-zoom/tasks.md`
- `openspec/changes/configurable-preview-zoom/design.md`
- `openspec/changes/configurable-preview-zoom/specs/mermaid-preview/spec.md`

## 开发约定

- 优先保持现有组件结构，不为小改动引入新架构。
- OpenSpec 工作流必须使用中文，包括提案、设计、任务、规格、归档说明以及与 OpenSpec 相关的协作沟通。
- 预览缩放相关常量放在 `src/config/preview.ts`，不要在组件中重复定义范围常量。
- Mermaid 渲染结果必须继续经过 DOMPurify 清理。
- 不要破坏客户端本地渲染和导出行为，图表代码不应上传到服务器。
- 处理滚轮缩放时，注意 React 合成事件可能无法可靠阻止某些浏览器默认横向滚动；当前实现使用原生非 passive `wheel` 监听。
- 拖拽平移时应避免选中文本。
- UI 文案目前混合英文标签和中文校验提示，新增提示应尽量与邻近代码风格一致。
- 注释在没有特别说明的情况下，必须使用中文

## 验证清单

代码变更后至少运行：

```bash
npm run build
```

涉及预览交互时，建议手动验证：

- 点击 `Convert` 后 Mermaid 图表可正常渲染。
- 不按 `Shift` 滚轮时，预览区域正常滚动，缩放不变。
- 按住 `Shift` 滚轮时，缩放在 `10%` 到 `2000%` 范围内变化。
- 缩放步长输入非法值时显示友好提示，并继续使用上一个合法步长。
- 缩放百分比输入非法值时显示友好提示，并保持上一个合法缩放。
- 缩放大于 `100%` 后拖拽可平移，且不会选中文本。
- SVG 和 PNG 导出行为保持正常。

## 注意事项

- `dist/` 是构建产物，通常不要手动编辑。
- `node_modules/` 不应纳入源码修改。
- 如果变更属于已存在的 OpenSpec change，先阅读对应 `proposal.md`、`design.md`、`tasks.md` 和规格文件，再改代码。
- 编写或更新 OpenSpec 文件时必须使用中文，除代码标识符、命令、路径、专有名词和必要英文 UI 文案外，不使用英文叙述。
- 如果新增较大功能，优先通过 OpenSpec 新建或更新 change，再实现。
