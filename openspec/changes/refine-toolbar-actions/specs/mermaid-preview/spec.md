## MODIFIED Requirements

### Requirement: Preview toolbar actions
预览工具栏 SHALL 使用可访问图标按钮和结构化控件呈现主要动作。仅使用图标的动作 MUST 使用 `lucide-react` 图标，提供可访问名称，并在悬停和键盘聚焦时显示 Radix Tooltip 或基于 Radix Tooltip 的等效封装。工具栏变更 MUST NOT 改变 Mermaid 渲染、DOMPurify 清理、本地处理、现有缩放范围、拖拽平移行为或 SVG/PNG 导出结果。

#### Scenario: Icon button exposes accessible name and tooltip
- **WHEN** 工具栏动作仅用图标呈现
- **THEN** 控件具有 `aria-label` 等可访问名称
- **AND** 控件在悬停或聚焦时通过 Tooltip 说明动作

#### Scenario: Toolbar remains keyboard usable
- **WHEN** 用户使用键盘在预览工具栏中导航
- **THEN** 图标按钮和结构化控件显示清晰焦点
- **AND** 用户无需鼠标也可以触发对应动作

#### Scenario: Convert action uses icon button
- **WHEN** 中间转换控件显示
- **THEN** Convert 动作用图标按钮呈现
- **AND** 控件具有描述转换动作的可访问名称和 Tooltip
- **AND** 渲染中状态使用加载图标并保持禁用

### Requirement: Maximize action state
Editor 和 Preview 最大化控件 SHALL 使用与状态匹配的图标。面板未最大化时，控件 MUST 显示表达进入最大化的图标。面板已最大化时，控件 MUST 显示表达退出最大化的图标。可访问名称和 Tooltip 文案 MUST 与当前可执行动作一致。

#### Scenario: Editor maximize icon switches
- **WHEN** 编辑区未最大化
- **THEN** 编辑区最大化控件显示进入最大化图标
- **AND** 其可访问名称和 Tooltip 描述进入最大化
- **WHEN** 编辑区已最大化
- **THEN** 同一控件显示退出最大化图标
- **AND** 其可访问名称和 Tooltip 描述退出最大化

#### Scenario: Preview maximize icon switches
- **WHEN** 预览区未最大化
- **THEN** 预览区最大化控件显示进入最大化图标
- **AND** 其可访问名称和 Tooltip 描述进入最大化
- **WHEN** 预览区已最大化
- **THEN** 同一控件显示退出最大化图标
- **AND** 其可访问名称和 Tooltip 描述退出最大化

### Requirement: Zoom validation hint presentation
预览面板 SHALL 通过提示组件展示缩放百分比和缩放步长校验错误。提示组件 MUST 保留每个非法输入与错误文本之间的无障碍关联。缩放百分比非法时，渲染图表 MUST 保持上一个合法缩放。缩放步长非法时，滚轮和按钮缩放 MUST 继续使用上一个合法步长。

#### Scenario: Invalid zoom percentage shows accessible hint
- **WHEN** 用户输入空值、非数字、非正数、非 `10` 的倍数、小于 `10` 或大于 `2000` 的缩放百分比
- **THEN** 缩放百分比输入显示提示样式的校验消息
- **AND** 输入框向辅助技术暴露非法状态
- **AND** 输入框通过 `aria-describedby` 或等效无障碍关系关联到校验消息
- **AND** 渲染图表保持上一个合法缩放

#### Scenario: Invalid zoom step shows accessible hint
- **WHEN** 用户输入空值、非数字、非正数或不是 `10` 的倍数的缩放步长
- **THEN** 缩放步长输入显示提示样式的校验消息
- **AND** 输入框向辅助技术暴露非法状态
- **AND** 输入框通过 `aria-describedby` 或等效无障碍关系关联到校验消息
- **AND** 滚轮和按钮缩放继续使用上一个合法步长

#### Scenario: Corrected zoom input clears hint
- **WHEN** 用户将缩放百分比或缩放步长修正为合法值
- **THEN** 对应输入的校验提示被移除
- **AND** 输入框不再暴露非法状态

### Requirement: Export format selection
预览面板 SHALL 提供 Radix Select 控件选择导出格式，并提供独立下载动作执行导出。Select MUST 包含 `SVG` 和 `PNG` 选项。默认选中格式 SHOULD 为 `SVG`。切换格式 MUST NOT 触发文件下载。点击下载动作时，MUST 使用现有本地 SVG 或 PNG 下载行为导出当前选中格式。

#### Scenario: Select defaults to SVG
- **WHEN** 预览工具栏首次显示
- **THEN** 导出格式 Select 将 `SVG` 显示为选中值

#### Scenario: Selecting format does not download
- **WHEN** 用户在 `SVG` 和 `PNG` 之间切换导出格式
- **THEN** 仅切换选项不会开始文件下载

#### Scenario: Download exports selected SVG format
- **WHEN** 导出格式为 `SVG`
- **AND** 用户触发下载动作
- **THEN** 当前已清理的 SVG 预览通过现有 SVG 导出行为下载

#### Scenario: Download exports selected PNG format
- **WHEN** 导出格式为 `PNG`
- **AND** 用户触发下载动作
- **THEN** 当前已清理的 SVG 预览通过现有 PNG 导出行为转换并下载

#### Scenario: Export controls are keyboard accessible
- **WHEN** 用户使用键盘操作导出格式 Select
- **THEN** 用户可以打开 Select、选择 `SVG` 或 `PNG` 并关闭 Select
- **AND** 下载动作仍可通过键盘到达并触发

## ADDED Requirements

### Requirement: Toolbar dependency adoption
实现 SHALL 只新增本次工具栏优化所需的 UI 依赖：Radix Tooltip、Radix Select 和 `lucide-react`。这些依赖 MUST 用于本变更描述的工具栏控件。

#### Scenario: Required dependencies are installed
- **WHEN** 实现完成后检查依赖
- **THEN** `@radix-ui/react-tooltip`、`@radix-ui/react-select` 和 `lucide-react` 已存在
- **AND** 本变更未引入无关 UI 框架依赖

### Requirement: Acceptance validation
实现 SHALL 通过生产构建以及聚焦工具栏行为、无障碍关联和导出结果的手动验收。

#### Scenario: Build validation passes
- **WHEN** 实现完成
- **THEN** `npm run build` 成功完成

#### Scenario: Manual acceptance covers refined toolbar
- **WHEN** 执行手动验收
- **THEN** 验收者确认 Mermaid 渲染仍可正常工作
- **AND** 缩放校验提示可正确出现和清除
- **AND** 最大化图标、Tooltip 和可访问名称与当前面板状态一致
- **AND** SVG 和 PNG 可通过 Select 加下载按钮的流程正常导出
