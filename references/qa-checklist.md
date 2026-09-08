# 终检清单

## 内容与风格

- 每句结论都有同步证据，括号画面提示未进入配音或字幕。
- 大标题、主卡片文字和字幕之外，没有作者添加的装饰性小字。
- 没有眉题、英文副行、章节编号、步骤序号、说明角标、微型 chip、作者水印。
- 真实 UI 原生文字与作者文字已明确区分；没有借 UI 外壳塞入小号说明。
- 字幕有效字高至少 56px，默认 60px；必要辅助文字至少 32px。
- 开头 10 秒有至少三次有效变化；没有开头黑屏、单页长停、闪烁或抖动。
- 正常段落每 1–3 秒有叙事意义的视觉变化，真实操作按真人速度。
- 没有密钥、个人数据、通知、内部地址或用户声音样本泄露。

## 逐镜头检查

每镜头至少检查入场中、动作峰值和落定帧，输出 contact sheet。重点放大检查：

- 字体锐度、字幕越界、卡片阴影、圆角裁切。
- 真实页面是否加载完整，鼠标与点击位置是否合理。
- 转场前后是否出现空白帧、重复帧或单帧闪烁。
- 3D 纹理是否因缩放而模糊。
- 深色镜头是否仍有清楚主体，不是整屏近黑。
- 画面中的小字是否属于真实 UI；若不是，删除。

## 技术检查

两版最终视频都必须满足：

- 1920×1080、30fps、总帧数与时间线一致。
- H.264 Main、yuv420p、BT.709 limited、CFR、无 B 帧、AAC 48kHz 双声道。
- 完整解码无错误；首尾音频无截断、爆音或意外静音。
- `blackdetect` 结果逐一看帧确认。场景转接可短暂变暗，但不能出现非叙事黑屏。
- 带 BGM / 无 BGM 两版的视频流 MD5 必须相同。
- 开头 0–15 秒额外检查黑帧、重复帧、冻结、闪烁和卡顿。

建议使用：

```powershell
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=codec_name,profile,width,height,pix_fmt,color_range,color_space,color_transfer,color_primaries,r_frame_rate,avg_frame_rate,has_b_frames,nb_read_frames -show_entries format=duration -of json <video.mp4>

ffmpeg -v error -i <video.mp4> -map 0:v:0 -map 0:a:0 -f null NUL

ffmpeg -hide_banner -i <video.mp4> -vf "blackdetect=d=0.10:pix_th=0.10" -an -f null NUL

ffmpeg -v error -i <video.mp4> -map 0:v:0 -c copy -f md5 -
```

兼容版编码需明确设置：`-r 30 -fps_mode cfr -profile:v main -bf 0 -g 30 -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart`。

## 独立终检

交付前使用不参与制作的独立 subagent。只提供最新版成片、关键帧、口播稿、设计 spec、分镜、素材口径和本清单，不提供“应该通过”的暗示。

审查必须明确给出 `PASS` 或 `FAIL`，并重点回答：

1. 是否仍有作者添加的小号眉题、英文副行、说明角标或步骤标签？
2. 开头是否黑屏、停在单页、闪烁、重复帧或卡顿？
3. 真实 UI 原生文字是否被误删，作者小字是否被误当成 UI 保留？
4. 两版技术规格与画面是否完全一致？

任何 `FAIL` 都先返工、完整重渲并重新终检；不能把失败报告与成片一起交给用户。