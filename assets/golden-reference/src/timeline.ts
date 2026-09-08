export type ShotId =
  | 'hook'
  | 'promise'
  | 'not-model'
  | 'host-map'
  | 'codex-compare'
  | 'plugin-white'
  | 'plugin-ecosystem'
  | 'preview-warning'
  | 'website-entry'
  | 'install'
  | 'preview-dialog'
  | 'api-key'
  | 'ui-overview'
  | 'workspace-tour'
  | 'workspace-boundary'
  | 'project-folders'
  | 'mode-intro'
  | 'standard-mode'
  | 'ptc-mode'
  | 'minimal-mode'
  | 'creator-mode'
  | 'settings'
  | 'outro';

export type Shot = {
  id: ShotId;
  from: number;
  duration: number;
  text: string;
  label: string;
};

const raw: Array<Omit<Shot, 'from'>> = [
  {
    id: 'hook', duration: 240, label: '01 / 问题',
    text: 'Agent Studio 到底是什么？它和 Codex 有什么区别？一个完全不懂代码的人，又该怎么把它装到电脑上？',
  },
  {
    id: 'promise', duration: 180, label: '02 / 从零上手',
    text: '这条视频，我从零带你走一遍。',
  },
  {
    id: 'not-model', duration: 300, label: '03 / 先纠正误解',
    text: '先把最容易误解的地方说清楚。Agent Studio 不是一个新模型，也不是给浏览器装的小插件。',
  },
  {
    id: 'host-map', duration: 420, label: '04 / 它是什么',
    text: '它是一个开源的 Agent 框架。你可以把大模型、文件、终端、Skills、工作流和权限管理都接进来，再让 AI 在这个环境里连续完成任务。',
  },
  {
    id: 'codex-compare', duration: 360, label: '05 / 与 Codex 的关系',
    text: '如果你用过 Codex、Claude Code 这类工具，会觉得它们长得很像。这个理解可以帮助你快速上手，但它们不是同一个产品。Agent Studio 更强调开放的宿主和插件架构。',
  },
  {
    id: 'plugin-white', duration: 240, label: '06 / 核心理念',
    text: 'Everything is a Plugin，也就是“一切皆插件”。',
  },
  {
    id: 'plugin-ecosystem', duration: 330, label: '07 / 插件化宿主',
    text: '模型、工具、Skills、会话、沙箱、存储、循环调度和界面，都可以被替换、组合或扩展。',
  },
  {
    id: 'preview-warning', duration: 330, label: '08 / 使用前提醒',
    text: '还有一点要提前提醒：现在的 Agent Studio 仍然是开发者预览版，更新很快。后面出现界面变化、插件不兼容，甚至配置需要迁移，都不奇怪。所以这期教程会尽量讲稳定的操作逻辑，不去死记某个按钮的位置。',
  },
  {
    id: 'website-entry', duration: 330, label: '09 / 找到官网入口',
    text: '好，下面让我们打开 Agent Studio 官网，滑到最下面，找到 Agent Studio，点进去。',
  },
  {
    id: 'install', duration: 450, label: '10 / 一条命令安装',
    text: '然后打开你的终端，复制这个命令，回车，等它自动安装。安装好了之后会出现一个地址，复制打开。',
  },
  {
    id: 'preview-dialog', duration: 300, label: '11 / 进入预览版',
    text: '打开地址后会弹出来一个内测提示，我们直接点击继续。',
  },
  {
    id: 'api-key', duration: 420, label: '12 / 配置模型',
    text: '第一次使用需要配置模型 API Key。点击模型服务开放平台，创建一个 API Key，然后复制到这里，我们就已经可以使用了。',
  },
  {
    id: 'ui-overview', duration: 300, label: '13 / 主界面',
    text: '进去以后，你会看到一个类似于 Codex 的界面。',
  },
  {
    id: 'workspace-tour', duration: 450, label: '14 / 选择工作区',
    text: '接下来选择工作区。没有选中工作区之前，对话输入框通常不能使用。',
  },
  {
    id: 'workspace-boundary', duration: 450, label: '15 / 工作区是什么',
    text: '工作区可以理解成这次任务允许 AI 接触的项目文件夹。选中以后，它才能读取里面的内容、创建文件和执行命令。',
  },
  {
    id: 'project-folders', duration: 300, label: '16 / 文件组织',
    text: '你也可以直接按照自己的项目创建文件目录，根据自己的工作习惯来。',
  },
  {
    id: 'mode-intro', duration: 240, label: '17 / 选择模式',
    text: '然后，我们来选择一下模式，比较常用的是标准模式。',
  },
  {
    id: 'standard-mode', duration: 420, label: '18 / Standard',
    text: '标准模式，是功能最完整的日常模式。它可以编辑文件、运行命令、搜索资料，也能调用 Skills 和工作流。新手直接选它。',
  },
  {
    id: 'ptc-mode', duration: 420, label: '19 / PTC / Code',
    text: 'PTC 模式，能力和标准模式差不多。区别是它会把多个操作组合成一段程序，再一次跑完，更适合步骤多、需要自动编排的任务。',
  },
  {
    id: 'minimal-mode', duration: 390, label: '20 / Minimal',
    text: '极简模式只保留终端和文件编辑器。功能更少，但过程也更直接，适合简单的编码任务。',
  },
  {
    id: 'creator-mode', duration: 390, label: '21 / Creator',
    text: '创造模式是给进阶用户用的。如果你想制作自己的 Agent 预设，或者测试插件，就选它。',
  },
  {
    id: 'settings', duration: 360, label: '22 / 模型与插件',
    text: '然后是模型。最开始这里只有示例模型，也就是你刚刚配置的那个 API Key。你也可以在设置里按需接入其他模型；画面中的模型卡只是自定义示意。左侧是官方插件页面，可以看到插件入口、配置和列表，后续还能继续查看和扩展。',
  },
  {
    id: 'outro', duration: 300, label: '23 / 结尾',
    text: '我是这期教程的作者，专注分享普通人也能上手的 AI 工具和真实工作流。我们下期再见。',
  },
];

let cursor = 0;
export const SHOTS: Shot[] = raw.map((shot) => {
  const value = {...shot, from: cursor};
  cursor += shot.duration;
  return value;
});

export const TOTAL_FRAMES = cursor;
export const FPS = 30;

export const shotById = Object.fromEntries(SHOTS.map((shot) => [shot.id, shot])) as Record<ShotId, Shot>;