## 1. 依赖

- [x] 1.1 安装 `@radix-ui/react-tooltip`。
- [x] 1.2 安装 `@radix-ui/react-select`。
- [x] 1.3 安装 `lucide-react`。
- [x] 1.4 确认 `package.json` 和锁文件只包含本变更需要的依赖更新。

## 2. UI 基础组件

- [x] 2.1 新增 Tooltip 封装组件，用于图标说明和错误提示。
- [x] 2.2 新增图标按钮封装，支持 lucide 图标、可访问名称、按下状态和禁用状态。
- [x] 2.3 新增导出格式 Select 组件，选项包含 `SVG` 和 `PNG`。
- [x] 2.4 补充 Tooltip、Select、图标按钮和焦点态样式，并复用现有主题变量。

## 3. 最大化控件

- [x] 3.1 为 Editor 最大化按钮接入 `Maximize2` / `Minimize2` 图标。
- [x] 3.2 为 Preview 最大化按钮接入 `Maximize2` / `Minimize2` 图标。
- [x] 3.3 最大化按钮 Tooltip、`aria-label`、`aria-pressed` 和 `title` 随状态同步切换。
- [x] 3.4 将中间 Convert 按钮改为 lucide 图标，并保留 Tooltip、`aria-label` 和加载状态。

## 4. 缩放输入错误提示

- [x] 4.1 将缩放百分比输入的错误展示改为 Tooltip 提示组件。
- [x] 4.2 将缩放步长输入的错误展示改为 Tooltip 提示组件。
- [x] 4.3 错误状态下输入框继续设置 `aria-invalid`。
- [x] 4.4 错误内容继续通过 `aria-describedby` 关联到对应输入。
- [x] 4.5 错误内容变化时通过 `aria-live` 保持可被辅助技术感知。

## 5. 导出格式选择

- [x] 5.1 使用 Radix Select 新增导出格式选择控件。
- [x] 5.2 Select 选项包含 `SVG` 和 `PNG`，默认值为 `SVG`。
- [x] 5.3 移除并列的 SVG/PNG 下载按钮，改为格式 Select 加单一下载图标按钮。
- [x] 5.4 点击下载按钮时根据当前 Select 值调用既有 SVG 或 PNG 下载逻辑。
- [x] 5.5 切换 Select 值时不触发下载。

## 6. 验证

- [x] 6.1 运行 `npm run build`。
- [ ] 6.2 手动确认 Mermaid 图表可渲染，缩放、拖拽和平移行为不回退。
- [ ] 6.3 手动确认缩放百分比非法值显示提示组件，且图表保持上一个合法缩放。
- [ ] 6.4 手动确认缩放步长非法值显示提示组件，且按钮/滚轮继续使用上一个合法步长。
- [ ] 6.5 手动确认 Editor/Preview 最大化图标、Tooltip 和 `aria-label` 随状态切换。
- [ ] 6.6 手动确认通过 Select 选择 `SVG` 后点击下载可导出 SVG。
- [ ] 6.7 手动确认通过 Select 选择 `PNG` 后点击下载可导出 PNG。
- [ ] 6.8 手动确认键盘可访问 Tooltip 触发元素、Select 和下载按钮。
