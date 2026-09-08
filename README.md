# infistar-video

把中文口播稿自动制作成无真人出镜 AI 产品解说视频的 Codex / Claude Code 技能。视觉上采用浅色编辑卡片与深色产品/录屏画面交替，配合大号中文字幕和克制动效。

支持横屏 `16:9`、竖屏 `9:16`、方形 `1:1`，不把成片锁死在单一比例。

[![Node 22+](https://img.shields.io/badge/Node-22%2B-339933)]()
[![Remotion 4.0.484](https://img.shields.io/badge/Remotion-4.0.484-3451B2)]()
[![Formats](https://img.shields.io/badge/Formats-16%3A9%20%2F%209%3A16%20%2F%201%3A1-4E78FF)]()

## 这是什么

`$infistar-video` 是一个面向 Codex / Claude Code 的技能。它不是只生成脚本或分镜，而是按中文口播稿连续完成从拆稿到终检的完整视频制作。

## 它能做什么

- 自动拆稿，把口播稿映射成钩子、承诺、概念、证据、操作、比较、提醒和结论。
- 以真实操作与官方素材为证据主体，用网页、软件、终端和模型输出支撑结论，不伪造产品结果。
- 生成 Remotion 工程，使用确定性动画和可复现渲染。
- 制作中文旁白、SFX 和可选 BGM，并交付带 BGM / 无 BGM 两版。
- 执行逐镜头静帧检查、技术规格检查和独立终检。
- 根据用户要求或目标平台选择横屏、竖屏或方形画幅。

## 支持画幅

| 形式 | 比例 | 建议分辨率 | 常见平台 |
| --- | --- | --- | --- |
| 横屏 | `16:9` | `1920×1080` | B站、YouTube、官网、知识区 |
| 竖屏 | `9:16` | `1080×1920` | 抖音、快手、视频号、Reels、Shorts |
| 方形 | `1:1` | `1080×1080` | 小红书、信息流、部分电商社媒 |

未指定画幅时默认使用横屏 `16:9`，但技能会在制作前先确认或推断目标画幅，并写入 `design-spec.md`。

## 安装

### Codex

把整个目录放到技能目录中：

```text
C:\Users\<你的用户名>\.codex\skills\infistar-video
```

也可以放到项目的 `.agents/skills/infistar-video`，让模型在项目内按技能路径读取。

### Claude Code

复制到项目级或用户级技能目录，例如：

```text
.claude/skills/infistar-video
```

具体以你使用的 Claude Code 版本和技能加载规则为准。

## 自包含规则

本技能已经把关键上游规则内置，不需要安装其他技能：

- `references/video-formats.md`：横屏、竖屏和方形画幅的选择、分辨率与版式适配。
- `references/evidence-and-review.md`：隐私、真实证据、节奏、字幕和验收基线。
- `references/shotcraft-baseline.md`：自主自由创作路线、真实素材、镜头动效、声音设计和独立终检。
- `references/style-dna.md`：色板、字体、字幕、版式和微文案禁令。
- `references/production-workflow.md`：从拆稿、分镜、素材、Remotion 实现到渲染交付的完整流程。
- `references/qa-checklist.md`：内容、逐镜头、技术规格和独立终检清单。

精简规则的来源与许可见 `THIRD_PARTY_NOTICES.md`。

## 目录结构

```text
infistar-video/
├─ SKILL.md
├─ README.md
├─ agents/openai.yaml
├─ references/
│  ├─ video-formats.md
│  ├─ evidence-and-review.md
│  ├─ shotcraft-baseline.md
│  ├─ style-dna.md
│  ├─ production-workflow.md
│  └─ qa-checklist.md
├─ assets/
│  ├─ golden-reference/       # 已验收的 Remotion 参考工程
│  └─ style-reference/        # 画面校准图
├─ LICENSES/
└─ THIRD_PARTY_NOTICES.md
```

## 使用示例

```text
Use $infistar-video to turn my Chinese oral script into a complete 16:9 AI explainer video.
```

```text
把下面这段中文口播稿做成竖屏 9:16 AI 解说视频，先不要配音。
```

```text
请用 $infistar-video 把这段口播稿做成小红书方形 1:1 视频。
```

## 配置项

| 配置 | 说明 |
| --- | --- |
| 画幅 | `16:9`、`9:16` 或 `1:1`；默认 `16:9` |
| 旁白 | 默认生成中文旁白；明确说不要配音时只做字幕、SFX 和 BGM |
| 声线 | 从项目 `AGENTS.md` 或已授权 voice ID / 参考音频读取，不内置个人声线 |
| BGM | 使用 BGM 时交付带 BGM / 无 BGM 两版 |
| 证据 | 优先真实截图、录屏、终端、模型输出和官方素材 |
| 输出目录 | 项目 `outputs/<topic>/` |

## 参考工程

`assets/golden-reference/` 是一个已验收的 Remotion 参考实现，用于复用色板、字体、字幕切分、确定性缓动、时间线计算、镜头注册、浅色编辑镜头、深色产品/录屏镜头、Shotcraft 动效、真实操作呈现和 SFX 钉帧。

它被刻意设计为参考实现，不是开箱即完整渲染的成品。仓库不包含 `public/audio/`、`public/media/` 中的实际音频和截图素材；使用时应替换为你自己的证据、界面、截图、音频和声音配置。制作竖屏或方形视频时，参考工程只复用方法与 tokens，不直接复用绝对坐标，版式必须重排。

## 声音配置

本技能默认需要中文旁白，但不会内置任何个人声线、参考音频路径或 voice ID。

请在你的项目 `AGENTS.md` 中配置已获授权的 voice ID 或参考音频。模型调用配音服务前必须确认服务支持该配置，禁止臆造 ID。用户明确说“先不配音/不要配音”时，只制作字幕、SFX 和可选 BGM。

## 环境要求

- Node.js 22 或更高版本
- FFmpeg，并加入 `PATH`
- Remotion `4.0.484`
- React `19.2.7`

参考工程脚本：

```bash
npm install
npm run dev
npm run render:bgm
npm run render:nobgm
```

## 交付规格

最终成片必须通过 `references/qa-checklist.md` 中的内容、逐镜头和技术检查。所有画幅统一使用：

- H.264 Main、yuv420p、BT.709 limited
- 30fps CFR、无 B 帧、AAC 48kHz 双声道
- faststart，兼容主流播放器和平台上传

## 安全与授权

- 不要公开 `.env`、密钥、个人数据、内部地址或声音样本。
- 真实页面、录屏和模型输出优先，证据不足时先列补录清单，不伪造结果。
- 付费素材生成、配音生成和发布操作必须在执行前获得用户明确授权。

## 第三方来源

本仓库把部分上游技能规则进行了精简、改写和内置，来源与许可证见 `THIRD_PARTY_NOTICES.md` 和 `LICENSES/`。