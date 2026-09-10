# 镜头索引与复用规则

本仓库当前只包含少量已验收的参考场景，不包含 `video-shotcraft` 的完整 152 张镜头卡、Gallery、音频库或采集脚本。不要把 `assets/golden-reference/` 误认为完整镜头库。

## 选择顺序

1. 先从旁白和证据确定镜头任务。
2. 再选择一个主要动效：推近、翻页、堆叠、滚动、聚焦、输入、对比或结构展开。
3. 查本文件和 `assets/golden-reference/SHOT_INDEX.md`，确认是否有匹配的参考实现。
4. 如果没有匹配项，新增镜头前记录动效性格、时值、风险和验证帧，不凭名称复制一个“看起来差不多”的动画。
5. 同一种显眼动效全片只让一个镜头当主角，其他镜头用更轻的变体。

## 参考场景家族

| 叙事任务 | 参考场景 | 适用素材 |
|---|---|---|
| 单一钩子或大结论 | `HookScene` | 产品图标、核心结果或大标题 |
| 纠正误解 | `NotModelScene` | 两张对比卡片或删除动作 |
| 概念关系 | `HostMapScene` | 节点、文件、工具和流程 |
| 产品对比 | `CompareScene` | 两个真实界面或状态 |
| 结构地图 | `PluginEcosystemScene` | 能力、模块或连接关系 |
| 官网和滚动 | `WebsiteEntryScene` | 真实官网截图或录屏 |
| 输入和安装 | `InstallScene` | 脱敏终端录屏或真实命令过程 |
| 浏览器弹窗 | `PreviewDialogScene` | 真实页面状态 |
| API 配置 | `ApiKeyScene` | 脱敏配置界面 |
| 主界面导览 | `UiOverviewScene` / `WorkspaceTourScene` | 真实产品录屏 |
| 文件和工作区 | `WorkspaceBoundaryScene` / `ProjectFoldersScene` | 真实项目结构或脱敏示意 |
| 模式对比 | `ModeIntroScene` / `StandardModeScene` / `PtcModeScene` / `MinimalModeScene` / `CreatorScene` | 真实模式界面 |
| 设置和插件 | `SettingsScene` | 真实设置页和插件页 |
| 自然收尾 | `OutroScene` | 真实产品状态或大结论 |

## 适配规则

- 复刻真实产品页面时必须换成真实截图或录屏，不能只改卡片文字。
- 参考场景里的文本、URL、产品名、图标和页面截图全部视为示例资产。
- 3D 透视、推近和局部放大要复用已验证的相对时值，但按目标画幅重新计算坐标。
- 每个镜头至少检查入场中、动作峰值和落定帧。
- 将选用的场景、源文件、改动范围和验证帧写入 `storyboard.md`。

