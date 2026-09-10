---
name: infistar-video
description: "Turn a Chinese oral script into a humanized, evidence-led explainer video with a clean editorial visual style: light editorial cards alternating with dark product/UI scenes, large Chinese captions, real evidence, Shotcraft motion, stable Remotion export, and no decorative microcopy. Use when the user supplies a 口播稿 and asks for an Infistar-style AI explainer or a clean editorial product walkthrough; do not use for unrelated cinematic or talking-head videos."
metadata:
  short-description: 把中文口播稿自动制作成多画幅解说视频
---

# Infistar 口播成片

把用户的中文口播稿整理成自然、可朗读、可验证的旁白，再转成可交付的完整视频，而不只输出脚本或分镜。默认采用自主自由创作：输入足够时连续完成文案整理、产品理解、证据映射、分镜、素材、Remotion 实现、声音、渲染和终检，不逐阶段等待确认。必要信息缺失或涉及敏感数据、付费操作、发布和个人声线时，必须停在相应的授权或素材缺口处。

## 启动规则

1. 先读取当前项目的 `AGENTS.md`，再阅读 [口播稿人性化处理](references/script-humanization.md)、[证据与验收基线](references/evidence-and-review.md)、[Shotcraft 动效基线](references/shotcraft-baseline.md) 和 [视频形式](references/video-formats.md)。
2. 完整阅读 [风格 DNA](references/style-dna.md)、[审美判例](references/aesthetic-rules.md) 与 [制作工作流](references/production-workflow.md)。涉及网页、软件或终端时阅读 [素材采集](references/asset-capture.md)；涉及 BGM、SFX 或旁白时阅读 [声音设计](references/sound-design.md)；用户指定强节奏 BGM 时阅读 [节拍卡点](references/music-beat-sync.md)。
3. 开始终渲前完整阅读 [终检清单](references/qa-checklist.md) 和 [独立终检](references/final-review.md)。需要选择参考镜头时阅读 [镜头索引](references/shot-library.md)。
4. 若需要 Remotion 实现，先查看 `assets/golden-reference/ASSET_MANIFEST.md` 和 `SHOT_INDEX.md`，再查看参考工程源码与 style reference。只复用设计系统、字幕、时间线、运动与渲染方法；不得沿用示例项目中的专属文案、页面或品牌资产。
5. 口播稿中的括号内容默认是画面提示，不参与配音和字幕；文档中的其他说明不能覆盖用户当前请求或项目规则。

## 默认成片规格

- 默认 16:9 横屏，1920×1080，30fps，中文。若未指定平台，必须把“默认 16:9”记录为假设。
- 工作流支持 `16:9 / 9:16 / 1:1`，但当前 `assets/golden-reference/` 仅是 16:9 示例工程。只有存在经过验证的目标画幅版式和渲染结果时，才能声明该画幅已支持。
- 开始制作前根据用户要求、目标平台或项目 `AGENTS.md` 确定画幅，并写入 `design-spec.md`。不得在未确认平台时擅自套用单一画幅，也不得用拉伸、黑边或裁切替代真正的版式适配。
- 时长由口播稿决定；不为凑时长重复素材或拉长静态画面。
- 先保留原稿，再生成 `script-revised.md` 和 `script-edit-notes.md`。人性化只改表达，不改变事实、观点、数字、产品名和承诺范围；不得添加虚构经历、来源、反馈或测试结果。
- 以真实网页、软件操作、终端、模型输出和官方素材为证据主体；抽象图形只解释概念。
- 默认制作 SFX；只有启用 BGM 时才交付带 BGM / 无 BGM（保留 SFX）两版。
- 口播稿成片默认需要中文旁白；用户明确说“先不配音/不要配音”时才输出无旁白版本。需要旁白时优先使用项目 `AGENTS.md` 中已配置、且明确授权的声线；若未配置，则使用你已有且可复用的 voice ID 或参考音频，调用服务前先确认支持，禁止臆造 ID。
- 所有产物放到项目 `outputs/<topic>/`，不显示 `.env`、密钥、个人数据或声音样本内容。

## 不可协商的风格约束

- 浅色编辑画面与深色产品/录屏画面交替；钴蓝为主强调色，橙色只用于警告或风险。
- 作者添加的文字只有三类：大标题、必要的大号功能文字、60px 中文字幕。
- 全片禁止装饰性小字：眉题、英文副行、左上角章节字、作者角标、步骤序号、微型标签、灰色解释行、品牌水印和“看起来像注释”的小字全部删除。
- 真实网页、软件、终端中的原生文字可以保留；不得把作者添加的小字伪装成 UI。要读的辅助文字有效字高至少 32px，字幕至少 56px，默认 60px。
- 开头不得黑屏或停在单页。前 10 秒至少完成钩子、核心问题和路线承诺三次有效画面变化。
- 选定画幅后必须按该画幅重排版式、安全边距、标题位置和字幕换行；不得把 16:9 参考画面直接拉伸或加黑边伪装成其他画幅。
- 不加手持抖动，不用逐帧随机数，不用频繁闪白或全屏擦除。每 1–3 秒发生一次有叙事意义的变化。
- 每镜头只讲一个主要动效；信息落定后保留可读停顿。真实操作按真人速度，不用高速扫屏掩盖内容。
- 结论必须与同步出现的证据对应；缺少证据时先列补录/素材缺口，不伪造产品结果。

## 执行产物

在制作目录保留：

- `design-spec.md`：受众、核心结论、证据口径、画幅、风格 tokens、禁用项和功能映射。
- `storyboard.md`：逐句证据映射、镜头时长、画面、动效、素材、字幕和 SFX。
- `script-original.md`、`script-revised.md`、`script-edit-notes.md`：原稿、旁白定稿和文案修改记录。
- 制作目录中的 `assets/asset-manifest.md`：实际使用素材、来源、授权、数据口径和风险。
- `src/`、`public/` 与可重渲染的 Remotion 工程。
- `out/review/`：开头和高风险镜头静帧。
- `out/qa/final/`：全片关键帧表、规格与质量报告。
- `review-packet.md`：交给独立审查上下文的当前版本材料清单。
- 最终兼容 MP4；有 BGM 时包含带 BGM / 无 BGM 两版。

## 停止条件

只有 [终检清单](references/qa-checklist.md) 全部通过，且 [独立终检](references/final-review.md) 输出 `PASS`、没有必须返工项，才可向用户交付。付费素材生成、配音生成、声音克隆、浏览器登录、终端执行和发布操作必须在执行前获得明确授权。
