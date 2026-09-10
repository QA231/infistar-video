# Golden Reference Shot Index

当前目录是 Agent Studio 主题的示例工程，不是通用成片。下面的索引只说明每个场景的叙事用途和源文件位置；复制时必须替换文本、素材和页面状态。

| 场景 ID | 叙事用途 | 源文件 | 主要注意事项 |
|---|---|---|---|
| `hook` | 单一钩子 | `src/scenes/EditorialScenes.tsx` | 只保留一个主角 |
| `promise` | 路线承诺 | `src/scenes/EditorialScenes.tsx` | 不增加装饰副行 |
| `not-model` | 纠正误解 | `src/scenes/EditorialScenes.tsx` | 两个概念要可区分 |
| `host-map` | 概念关系图 | `src/scenes/EditorialScenes.tsx` | 关系必须有证据或明确是概念图 |
| `codex-compare` | 产品对比 | `src/scenes/EditorialScenes.tsx` | 不把相似外观说成同一产品 |
| `plugin-white` | 大结论 | `src/scenes/EditorialScenes.tsx` | 文案换成当前主题 |
| `plugin-ecosystem` | 能力组合 | `src/scenes/ShotcraftScenes.tsx` | 只保留有叙事价值的节点 |
| `preview-warning` | 风险提醒 | `src/scenes/EditorialScenes.tsx` | 风险必须具体 |
| `website-entry` | 官网入口 | `src/scenes/EditorialScenes.tsx` | 使用真实官网素材 |
| `install` | 终端安装 | `src/scenes/ShotcraftScenes.tsx` | 命令和输出必须真实或明确标为示意 |
| `preview-dialog` | 弹窗操作 | `src/scenes/EditorialScenes.tsx` | 不伪造不存在的产品状态 |
| `api-key` | 凭据配置 | `src/scenes/EditorialScenes.tsx` | 只能使用脱敏示意值 |
| `ui-overview` | 主界面导览 | `src/scenes/EditorialScenes.tsx` | 真实 UI 优先 |
| `workspace-tour` | 工作区选择 | `src/scenes/ShotcraftScenes.tsx` | 需要真实录屏或冻结截图 |
| `workspace-boundary` | 权限边界 | `src/scenes/EditorialScenes.tsx` | 说明可访问范围 |
| `project-folders` | 文件组织 | `src/scenes/EditorialScenes.tsx` | 不泄露本地路径 |
| `mode-intro` | 模式引入 | `src/scenes/EditorialScenes.tsx` | 按当前产品重写 |
| `standard-mode` | 标准模式 | `src/scenes/EditorialScenes.tsx` | 不把示例能力当成产品事实 |
| `ptc-mode` | 程序化模式 | `src/scenes/EditorialScenes.tsx` | 需绑定真实证据 |
| `minimal-mode` | 极简模式 | `src/scenes/EditorialScenes.tsx` | 只展示实际存在的功能 |
| `creator-mode` | 高级模式 | `src/scenes/ShotcraftScenes.tsx` | 画面里的文案也要替换 |
| `settings` | 设置和插件 | `src/scenes/EditorialScenes.tsx` | 原生 UI 与作者文字分开 |
| `outro` | 自然结尾 | `src/scenes/EditorialScenes.tsx` | 不添加模板化“下期再见” |

## 复用记录

每次使用参考场景时，在 `storyboard.md` 记录：

- 场景 ID 和源文件。
- 保留的动作语法与关键时值。
- 替换的素材和来源。
- 目标画幅的坐标重排。
- 入场中、动作峰值和落定帧。

