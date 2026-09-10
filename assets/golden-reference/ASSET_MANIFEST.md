# Golden Reference Asset Manifest

这是参考工程的运行时素材清单，不代表这些文件已经包含在仓库中，也不代表它们已经获得商业授权。当前参考工程没有 `public/` 目录，复制到实际项目时必须逐项补齐、替换或明确删掉对应场景。

## 媒体文件

默认放在 `public/media/`：

| 文件 | 类型 | 用途 |
|---|---|---|
| `demo.mp4` | MP4 | `OfficialVideo` 参考录屏 |
| `product-favicon.svg` | SVG | 产品图标 |
| `product-map-white-16x9.png` | PNG | 白底概念地图 |
| `product-fullpage.png` | PNG | 产品整页截图 |
| `home-fullpage.png` | PNG | 官网整页截图 |
| `quickstart-fullpage.png` | PNG | 快速开始页面 |
| `plugin-feature.png` | PNG | 插件页面或功能截图 |
| `demo-poster.jpg` | JPG | 浏览器弹窗场景 |
| `demo-frame-15.jpg` | JPG | 工作区导览帧 |
| `demo-frame-30.jpg` | JPG | 工作区导览帧 |
| `demo-frame-45.jpg` | JPG | 工作区导览帧 |
| `demo-frame-60.jpg` | JPG | 工作区导览帧 |

## 音频文件

默认放在 `public/audio/`：

| 文件 | 类型 | 用途 |
|---|---|---|
| `bgm-tech-house.mp3` | MP3 | BGM |
| `swoosh-quick.mp3` | MP3 | 快速转场 |
| `impact-deep-whoosh.mp3` | MP3 | 大动作落地 |
| `transition-soft.mp3` | MP3 | 柔和转场 |
| `whoosh-big.mp3` | MP3 | 大幅运镜 |
| `sparkle.mp3` | MP3 | 光效揭示 |
| `click-camera.mp3` | MP3 | 点击或快门拟音 |
| `keyboard.mp3` | MP3 | 打字拟音 |

## 使用前验证

- 文件存在且名称大小写完全一致。
- 图片分辨率满足 `asset-capture.md` 的 2x/4x 要求。
- 音频来源、授权、时长和峰值已记录。
- 样例中的 Agent Studio、Codex、Workspace 等文字和画面已经替换成当前项目内容。
- 没有把 `.env`、密钥、通知、内部地址、个人数据或声音样本放进 `public/`。

