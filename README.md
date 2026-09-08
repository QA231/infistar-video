# infistar-video

把中文口播稿自动制作成 16:9 Infistar 风格横屏 AI 解说视频的 Codex/Claude Code 技能。

它不是只生成脚本或分镜，而是按口播稿连续完成：

- 拆稿与证据映射
- 分镜与素材口径
- Remotion 工程实现
- 中文旁白与 SFX/BGM
- 渲染、规格检查和独立终检

输出默认是 `1920×1080`、`30fps`、H.264 兼容 MP4。带 BGM 时会同时交付带 BGM 和无 BGM 两版。

## 命名

本技能名称如下：

```text
$infistar-video
```

## 安装

### Codex

把整个目录放到技能目录中：

```text
C:\Users\<你的用户名>\.codex\skills\infistar-video
```

或放到项目的 `.agents/skills/infistar-video`，让模型在项目内按技能路径读取。

### Claude Code

可以复制到项目级或用户级技能目录，例如：

```text
.claude/skills/infistar-video
```

具体以你使用的 Claude Code 版本和技能加载规则为准。

## 自包含规则

本技能已经把关键上游规则内置，不需要安装其他技能：

- `references/evidence-and-review.md`：隐私、真实证据、节奏、字幕和验收基线。
- `references/shotcraft-baseline.md`：自主自由创作路线、真实素材、镜头动效、声音设计和独立终检。
- `references/style-dna.md`、`references/production-workflow.md`、`references/qa-checklist.md`：本技能自身的风格、制作和验收规则。

精简规则的来源与许可见 `THIRD_PARTY_NOTICES.md`。

## 参考工程

`assets/golden-reference/` 是一个已验收的 Remotion 参考实现，用于复用：

- 色板、字体、字幕切分和确定性缓动
- 时间线计算与镜头注册
- 浅色编辑镜头、深色产品/录屏镜头
- Shotcraft 动效、真实操作呈现和 SFX 钉帧

它被刻意设计为参考实现，不是开箱即完整渲染的成品。仓库不包含 `public/audio/`、`public/media/` 中的实际音频和截图素材；使用时应替换为你自己的证据、界面、截图、音频和声音配置。

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

最终成片必须通过 `references/qa-checklist.md` 中的技术检查，并按需生成兼容版 H.264。

## 使用示例

```text
Use $infistar-video to turn my Chinese oral script into a complete 16:9 AI explainer video.
```

```text
把下面这段中文口播稿做成横屏 AI 解说视频，先不要配音。
```

## 安全与授权

- 不要公开 `.env`、密钥、个人数据、内部地址或声音样本。
- 真实页面、录屏和模型输出优先，证据不足时先列补录清单，不伪造结果。
- 付费素材生成、配音生成和发布操作必须在执行前获得用户明确授权。