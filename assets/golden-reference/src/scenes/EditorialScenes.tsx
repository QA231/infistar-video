import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {BrowserWindow, C, Cursor, FONT, Grain, MONO, OfficialImage, OfficialVideo, clamp, seg} from '../components/Common';

const Background: React.FC<{light?: boolean; children?: React.ReactNode}> = ({light = false, children}) => (
  <AbsoluteFill style={{background: light ? C.paper : C.bg, color: light ? C.ink : C.white, overflow: 'hidden'}}>
    {!light ? <AbsoluteFill style={{background: 'radial-gradient(circle at 78% 18%, rgba(52,81,178,.18), transparent 34%), radial-gradient(circle at 12% 80%, rgba(78,120,255,.10), transparent 32%)'}} /> : null}
    {children}
    <Grain light={light} />
  </AbsoluteFill>
);

const BigTitle: React.FC<{children: React.ReactNode; light?: boolean; style?: React.CSSProperties}> = ({children, light, style}) => (
  <div style={{position: 'absolute', left: 112, top: 130, maxWidth: 1380, ...style}}>
    <div style={{font: `850 88px/1.08 ${FONT}`, letterSpacing: -3.8, color: light ? C.ink : C.white}}>{children}</div>
  </div>
);

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const braceOn = frame >= 4 ? 1 : 0;
  const expand = seg(frame, 8, 32, Easing.out(Easing.back(1.25)));
  const scale = 0.62 + expand * 0.38;
  const x = 390 * expand * scale;
  const titleIn = seg(frame, 14, 36);
  const introOut = seg(frame, 74, 84, Easing.inOut(Easing.quad));
  const questionsIn = seg(frame, 80, 90, Easing.inOut(Easing.quad));
  const questionsOut = seg(frame, 148, 158, Easing.inOut(Easing.quad));
  const routeIn = seg(frame, 152, 164, Easing.inOut(Easing.quad));
  const routeMove = interpolate(frame, [152, 240], [0, 34], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear});
  const questions = [
    '它到底是什么？',
    '和 Codex 有什么区别？',
    '新手怎么安装？',
  ];
  const route = ['认识', '安装', '上手'];

  return (
    <Background light>
      <AbsoluteFill style={{opacity: 1 - introOut, transform: `scale(${1 + introOut * 0.045})`}}>
        <AbsoluteFill style={{background: 'linear-gradient(135deg,#FFFFFF 0%,#F4F7FF 54%,#EAF0FF 100%)'}} />
        <div style={{position: 'absolute', left: '50%', top: 218, width: 108, height: 108, transform: `translateX(-50%) scale(${0.72 + titleIn * 0.28})`, opacity: titleIn}}>
          <Img src={staticFile('media/product-favicon.svg')} style={{width: '100%', height: '100%'}} />
        </div>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-44px)'}}>
          <div style={{position: 'relative', width: 0, height: 0, color: C.blueDeep}}>
            <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(-50%,-50%) translateX(${-x}px) scale(${scale})`, font: `900 126px/1 ${MONO}`, opacity: braceOn}}>{'{'}</div>
            <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(-50%,-50%) translateX(${x}px) scale(${scale})`, font: `900 126px/1 ${MONO}`, opacity: braceOn}}>{'}'}</div>
            <div style={{position: 'absolute', left: 0, top: 0, width: Math.max(0, x * 2 - 92), height: 150, overflow: 'hidden', transform: 'translate(-50%,-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{font: `870 78px/1 ${FONT}`, whiteSpace: 'nowrap', letterSpacing: -2.4, color: C.ink, opacity: titleIn, transform: `scale(${scale})`}}>Agent Studio</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: questionsIn * (1 - questionsOut), background: 'linear-gradient(145deg,#F4F1E9 0%,#EEF2F8 52%,#E8EDF7 100%)', color: C.ink}}>
        <AbsoluteFill style={{background: 'radial-gradient(circle at 78% 18%,rgba(78,120,255,.12),transparent 42%)'}} />
        <div style={{position: 'absolute', left: 104, top: 126, font: `880 70px/1.06 ${FONT}`, letterSpacing: -2.5}}>先把这三件事讲清楚</div>
        <div style={{position: 'absolute', left: 104, right: 104, top: 300, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24}}>
          {questions.map((text, i) => {
            const enter = seg(frame, 88 + i * 12, 112 + i * 12, Easing.out(Easing.back(1.15)));
            return (
              <div key={text} style={{height: 280, borderRadius: 24, padding: '32px 34px', background: i === 1 ? '#E9EEFF' : '#FFFFFF', color: C.ink, border: i === 1 ? '2px solid #AFC0FF' : '2px solid #D8DEEA', boxShadow: '0 24px 60px rgba(52,65,95,.12)', opacity: enter, transform: `translateY(${(1 - enter) * 48}px)`, display: 'flex', alignItems: 'center'}}>
                <div style={{font: `860 48px/1.22 ${FONT}`}}>{text}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: routeIn, background: '#F7F9FC', color: C.ink}}>
        <div style={{position: 'absolute', left: 104, top: 146, font: `880 70px/1.08 ${FONT}`, letterSpacing: -2.5}}>从概念到上手，只走三步</div>
        <div style={{position: 'absolute', left: 104 - routeMove, right: 104 + routeMove, top: 355, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26}}>
          {route.map((title, i) => {
            const p = seg(frame, 160 + i * 13, 184 + i * 13, Easing.out(Easing.back(1.1)));
            return <div key={title} style={{height: 265, borderRadius: 24, border: '2px solid #DCE4F8', background: i === 1 ? '#3451B2' : '#FFFFFF', color: i === 1 ? '#FFFFFF' : C.ink, padding: '36px 38px', opacity: p, transform: `translateY(${(1 - p) * 32}px)`, display: 'flex', alignItems: 'center'}}><div style={{font: `900 72px/1 ${FONT}`}}>{title}</div></div>;
          })}
        </div>
      </AbsoluteFill>
    </Background>
  );
};

export const PromiseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const index = Math.min(2, Math.floor(frame / 60));
  const items = [
    '看懂它是什么',
    '从零完成安装',
    '选对工作模式',
  ];
  return (
    <Background light>
      <AbsoluteFill style={{background: 'linear-gradient(145deg,#FFFFFF,#EEF3FF)'}} />
      <div style={{position: 'absolute', left: 104, top: 140, font: `880 72px/1.08 ${FONT}`, color: C.ink}}>这条视频，从零带你走一遍</div>
      <div style={{position: 'absolute', left: 104, right: 104, top: 355, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24}}>
        {items.map((title, i) => {
          const active = i === index;
          const enter = seg(frame, 8 + i * 10, 30 + i * 10, Easing.out(Easing.back(1.1)));
          const pulse = active ? 1 + 0.012 * Math.sin((frame - i * 60) * 0.08) : 1;
          return <div key={title} style={{height: 340, borderRadius: 26, padding: '36px 38px', background: active ? '#3451B2' : '#FFFFFF', color: active ? '#FFFFFF' : C.ink, border: active ? '2px solid #3451B2' : '2px solid #DCE4F8', boxShadow: active ? '0 30px 80px rgba(52,81,178,.24)' : '0 16px 50px rgba(50,65,100,.08)', opacity: enter, transform: `scale(${pulse}) translateY(${active ? -14 : 0}px)`, display: 'flex', alignItems: 'center'}}><div style={{font: `870 48px/1.18 ${FONT}`}}>{title}</div></div>;
        })}
      </div>
      <div style={{position: 'absolute', left: 104, right: 104, bottom: 92, height: 8, borderRadius: 4, background: '#DCE4F8', overflow: 'hidden'}}><div style={{height: '100%', width: `${((frame + 1) / 180) * 100}%`, background: C.blueDeep}} /></div>
    </Background>
  );
};
export const NotModelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const first = seg(frame, 20, 54);
  const second = seg(frame, 74, 108);
  const productMark = seg(frame, 142, 176);
  const items = [
    {title: '新模型', sub: '像某个基础模型这样', p: first},
    {title: '浏览器插件', sub: '装上就能用的小扩展', p: second},
  ];
  return (
    <Background light>
      <BigTitle light>它不是这些</BigTitle>
      <div style={{position: 'absolute', left: 112, right: 112, top: 420, display: 'flex', gap: 36}}>
        {items.map((item) => (
          <div key={item.title} style={{flex: 1, height: 238, borderRadius: 22, background: '#fff', border: '1px solid rgba(15,18,24,.10)', padding: '42px 44px', position: 'relative', opacity: item.p, transform: `translateY(${(1 - item.p) * 36}px)`}}>
            <div style={{font: `850 54px/1 ${FONT}`}}>{item.title}</div>
            <div style={{position: 'absolute', left: 34, right: 34, top: 108, height: 8, borderRadius: 4, background: C.orange, transformOrigin: 'left', transform: `rotate(-3deg) scaleX(${item.p})`}} />
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: '50%', top: 790, transform: `translate(-50%,-50%) scale(${0.82 + productMark * 0.18})`, opacity: productMark, display: 'flex', alignItems: 'center', gap: 18}}>
        <Img src={staticFile('media/product-favicon.svg')} style={{width: 76, height: 76}} />
      </div>
    </Background>
  );
};

const HOST_NODES = [
  ['MODEL', '大模型', -380, -180],
  ['FILES', '文件', -440, 40],
  ['TERMINAL', '终端', -310, 250],
  ['SKILLS', 'Skills', 150, -210],
  ['WORKFLOW', '工作流', 220, 30],
  ['PERMISSION', '权限', 130, 250],
] as const;

export const HostMapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = seg(frame, 0, 24);
  const scale = interpolate(frame, [0, 420], [1, 1.035], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.linear,
  });
  return (
    <AbsoluteFill style={{background: '#FFFFFF', overflow: 'hidden'}}>
      <Img
        src={staticFile('media/product-map-white-16x9.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: reveal,
          transform: `scale(${scale})`,
          transformOrigin: '50% 52%',
        }}
      />
    </AbsoluteFill>
  );
};

export const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const split = seg(frame, 10, 42);
  const focus = seg(frame, 188, 230);
  return (
    <Background light>
      <BigTitle light>相似的界面，不同的重点</BigTitle>
      <div style={{position: 'absolute', left: 100, right: 100, top: 380, height: 510, display: 'flex', gap: 30, opacity: split}}>
        <div style={{flex: 1, borderRadius: 22, overflow: 'hidden', background: '#101218', border: '1px solid rgba(0,0,0,.12)', transform: `scale(${1 - focus * 0.04})`, opacity: 1 - focus * 0.38}}>
          <div style={{height: 66, background: '#1B1E25', color: '#fff', font: `800 26px/66px ${MONO}`, paddingLeft: 30}}>CODEX</div>
          <div style={{padding: 34, color: '#DDE2EC', fontFamily: FONT}}>
            <div style={{fontSize: 28, fontWeight: 800}}>任务与代码工作区</div>
            {['读取文件', '执行命令', '应用修改', '持续协作'].map((t, i) => <div key={t} style={{marginTop: 22, height: 50, borderRadius: 12, background: i === 0 ? '#273861' : '#181B22', padding: '0 18px', lineHeight: '50px'}}>{t}</div>)}
          </div>
        </div>
        <div style={{flex: 1, borderRadius: 22, overflow: 'hidden', background: '#0F1116', border: `2px solid rgba(78,120,255,${0.3 + focus * 0.6})`, transform: `scale(${1 + focus * 0.035})`, boxShadow: `0 30px ${80 * focus}px rgba(52,81,178,.24)`}}>
          <div style={{height: 66, background: '#191B21', color: '#fff', font: `800 26px/66px ${MONO}`, paddingLeft: 30}}>AGENT STUDIO</div>
          <OfficialImage name="plugin-feature.png" style={{objectFit: 'contain', background: '#0B0D12'}} />
        </div>
      </div>
    </Background>
  );
};

export const PluginWhiteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const englishIn = seg(frame, 14, 42);
  const englishOut = seg(frame, 104, 116, Easing.inOut(Easing.quad));
  const chineseIn = seg(frame, 114, 128, Easing.inOut(Easing.quad));
  const englishTracking = interpolate(frame, [42, 100], [0, 5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const chineseTracking = interpolate(frame, [128, 239], [12, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const chineseScale = interpolate(frame, [128, 239], [0.985, 1.04], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  return (
    <AbsoluteFill style={{background: '#fff', color: '#0E1015', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
      <div style={{position: 'absolute', font: `850 96px/1 ${FONT}`, letterSpacing: englishTracking, opacity: englishIn * (1 - englishOut), transform: `scale(${0.96 + englishIn * 0.04 + englishOut * 0.02})`}}>Everything is a Plugin</div>
      <div style={{position: 'absolute', font: `850 112px/1 ${FONT}`, letterSpacing: chineseTracking, opacity: chineseIn, transform: `scale(${chineseScale})`}}>一切皆插件</div>
    </AbsoluteFill>
  );
};

export const WarningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const img = seg(frame, 0, 35);
  return (
    <Background>
      <div style={{position: 'absolute', left: 840, top: -380, width: 1020, height: 1760, opacity: 0.28 + img * 0.25, transform: `translateY(${-frame * 0.32}px) rotate(2deg)`, filter: 'saturate(.8)'}}>
        <Img src={staticFile('media/product-fullpage.png')} style={{width: '100%', height: 'auto'}} />
      </div>
      <BigTitle>现在仍是<br /><span style={{color: C.orange}}>开发者预览版</span></BigTitle>
    </Background>
  );
};

export const WebsiteEntryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [0, 245], [0, -520], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const click = seg(frame, 260, 286);
  return (
    <Background>
      <BrowserWindow style={{left: 170, top: 86, width: 1580, height: 850}} url="agent-studio.example">
        <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#0A0A0A'}}>
          <Img src={staticFile('media/home-fullpage.png')} style={{position: 'absolute', left: 0, top: scroll, width: '100%', height: 'auto'}} />
          <Cursor x={1390} y={690} click={click} />
        </div>
      </BrowserWindow>
    </Background>
  );
};

export const PreviewDialogScene: React.FC = () => {
  const frame = useCurrentFrame();
  const popup = seg(frame, 28, 62, Easing.out(Easing.back(1.25)));
  const click = seg(frame, 190, 214);
  const exit = seg(frame, 214, 242);
  return (
    <Background>
      <BrowserWindow style={{left: 180, top: 94, width: 1560, height: 840}} url="终端输出的本地地址">
        <OfficialImage name="demo-poster.jpg" style={{filter: `blur(${popup * 4}px) brightness(${1 - popup * 0.45})`}} />
        <div style={{position: 'absolute', left: '50%', top: '50%', width: 690, borderRadius: 24, padding: '38px 42px', background: '#F7F8FB', color: '#181A20', transform: `translate(-50%,-50%) scale(${0.84 + popup * 0.16 - exit * 0.04})`, opacity: popup * (1 - exit)}}>
          <div style={{font: `850 36px/1.2 ${FONT}`}}>Agent Studio</div>
          <div style={{font: `500 22px/1.55 ${FONT}`, color: '#626A77', marginTop: 26}}>核心插件与 API 仍可能变化。建议优先理解工作流，不要依赖某个按钮的固定位置。</div>
          <div style={{marginTop: 34, display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{padding: '14px 30px', borderRadius: 999, background: C.blueDeep, color: '#fff', font: `750 21px/1 ${FONT}`}}>继续</div>
          </div>
        </div>
        <Cursor x={1118} y={616} click={click} />
      </BrowserWindow>
    </Background>
  );
};

export const ApiKeyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const step = Math.min(2, Math.floor(frame / 140));
  const keyProgress = clamp((frame - 208) / 70);
  const cursor = 14 + Math.floor(keyProgress * 15);
  return (
    <Background light>
      <BigTitle light>配置模型 API Key</BigTitle>
      <div style={{position: 'absolute', left: 106, top: 370, width: 760, height: 500, borderRadius: 22, overflow: 'hidden', background: '#fff', border: '1px solid rgba(0,0,0,.1)', boxShadow: '0 30px 80px rgba(20,30,60,.10)'}}>
        <Img src={staticFile('media/quickstart-fullpage.png')} style={{width: '100%', height: 'auto', transform: `translateY(${-120 - step * 310}px)`}} />
      </div>
      <div style={{position: 'absolute', right: 106, top: 370, width: 830, height: 500, borderRadius: 22, background: '#101218', color: '#fff', padding: '34px 40px', boxShadow: '0 30px 80px rgba(20,30,60,.16)'}}>
        <div style={{font: `850 36px/1 ${FONT}`}}>Settings / Models</div>
        <div style={{marginTop: 30, font: `700 32px/1 ${MONO}`, color: '#AAB4C7'}}>PROVIDER</div>
        <div style={{marginTop: 10, height: 58, borderRadius: 12, border: '1px solid rgba(255,255,255,.14)', padding: '0 18px', font: `700 32px/58px ${FONT}`}}>示例模型</div>
        <div style={{marginTop: 20, font: `700 32px/1 ${MONO}`, color: '#AAB4C7'}}>API KEY</div>
        <div style={{marginTop: 10, height: 58, borderRadius: 12, border: `1px solid rgba(78,120,255,${0.35 + keyProgress * 0.45})`, padding: '0 18px', font: `700 32px/58px ${MONO}`, color: '#D7DEEE'}}>{`sk-${'•'.repeat(cursor)}`}</div>
        <div style={{marginTop: 22, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <div style={{padding: '14px 24px', borderRadius: 999, background: C.blue, font: `750 32px/1 ${FONT}`}}>保存</div>
        </div>
      </div>
    </Background>
  );
};

export const UiOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 220], [1.02, 1.10], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  return (
    <Background>
      <BrowserWindow style={{left: 140, top: 84, width: 1640, height: 850}} url="Agent Studio · workspace">
        <OfficialVideo start={8} style={{transform: `scale(${zoom})`}} />
      </BrowserWindow>
    </Background>
  );
};

export const WorkspaceBoundaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const folder = seg(frame, 18, 48, Easing.out(Easing.back(1.2)));
  const border = seg(frame, 64, 112);
  const breathe = interpolate(frame, [112, 450], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear});
  const actions = ['读取内容', '创建文件', '执行命令'];
  return (
    <Background light>
      <BigTitle light>工作区，就是 AI 的项目边界</BigTitle>
      <div style={{position: 'absolute', left: 225, top: 420, width: 560, height: 400, transform: `scale(${0.82 + folder * 0.18 + breathe * 0.03})`, transformOrigin: '50% 50%', opacity: folder}}>
        <div style={{position: 'absolute', left: 54, top: 0, width: 218, height: 66, borderRadius: '20px 20px 0 0', background: '#E1E7FA'}} />
        <div style={{position: 'absolute', inset: '48px 0 0', borderRadius: 28, background: '#EFF2FB', border: '2px solid #C8D2EF', boxShadow: '0 36px 90px rgba(52,81,178,.15)'}}>
          <div style={{font: `850 40px/1 ${FONT}`, margin: '74px 54px 0'}}>MyProject</div>
          {['README.md', 'src/', 'assets/', 'notes.md'].map((t, i) => <div key={t} style={{font: `600 22px/1 ${MONO}`, color: '#68738A', margin: `${i ? 20 : 36}px 54px 0`}}>▹ {t}</div>)}
        </div>
        <svg width="660" height="500" style={{position: 'absolute', left: -50, top: -50}}>
          <rect x="4" y="4" width="652" height="492" rx="36" fill="none" stroke={C.blue} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - border} />
        </svg>
      </div>
      <div style={{position: 'absolute', right: 240, top: 450, display: 'flex', flexDirection: 'column', gap: 24, transform: `scale(${1 + breathe * 0.02})`, transformOrigin: '50% 50%'}}>
        {actions.map((action, i) => {
          const p = seg(frame, 142 + i * 48, 170 + i * 48);
          return <div key={action} style={{width: 520, height: 94, borderRadius: 18, background: '#fff', border: '1px solid rgba(0,0,0,.09)', display: 'flex', alignItems: 'center', padding: '0 30px', gap: 20, opacity: p, transform: `translateX(${(1 - p) * 34}px)`}}><span style={{width: 32, height: 32, borderRadius: 16, background: C.blue, color: '#fff', textAlign: 'center', font: `800 20px/32px ${FONT}`}}>✓</span><span style={{font: `800 32px/1 ${FONT}`}}>{action}</span></div>;
        })}
      </div>
    </Background>
  );
};

export const ProjectFoldersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const panelScale = interpolate(frame, [120, 300], [1, 1.03], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear});
  const rows = [
    {depth: 0, name: 'ai-video-project/', type: 'folder'},
    {depth: 1, name: 'research/', type: 'folder'},
    {depth: 2, name: 'sources.md', type: 'file'},
    {depth: 1, name: 'assets/', type: 'folder'},
    {depth: 2, name: 'screenshots/', type: 'folder'},
    {depth: 1, name: 'outputs/', type: 'folder'},
  ];
  return (
    <Background>
      <BigTitle>文件夹不用复杂，清楚就行</BigTitle>
      <div style={{position: 'absolute', left: 370, top: 410, width: 1180, borderRadius: 24, background: '#11141A', border: '1px solid rgba(255,255,255,.14)', padding: '36px 0', boxShadow: '0 35px 90px rgba(0,0,0,.42)', transform: `scale(${panelScale})`}}>
        {rows.map((row, i) => {
          const p = seg(frame, 24 + i * 30, 48 + i * 30);
          return <div key={`${row.depth}-${row.name}`} style={{height: 68, display: 'flex', alignItems: 'center', paddingLeft: 48 + row.depth * 76, opacity: p, transform: `translateY(${(1 - p) * 14}px)`, font: `650 27px/1 ${MONO}`, color: row.type === 'folder' ? '#BFD0FF' : '#D1D5DE'}}><span style={{width: 34, color: row.type === 'folder' ? C.blue : '#7C8594'}}>{row.type === 'folder' ? '▾' : '·'}</span>{row.name}</div>;
        })}
      </div>
    </Background>
  );
};

export const ModeIntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const gridScale = interpolate(frame, [110, 240], [1, 1.025], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear});
  const modes = ['Standard', 'PTC / Code', 'Minimal', 'Creator'];
  return (
    <Background light>
      <BigTitle light>四种模式，怎么选？</BigTitle>
      <div style={{position: 'absolute', left: 112, right: 112, top: 430, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, transform: `scale(${gridScale})`}}>
        {modes.map((mode, i) => {
          const p = seg(frame, 28 + i * 22, 52 + i * 22, Easing.out(Easing.back(1.25)));
          return <div key={mode} style={{height: 300, borderRadius: 22, background: i === 0 ? '#101218' : '#fff', color: i === 0 ? '#fff' : C.ink, border: i === 0 ? 'none' : '1px solid rgba(0,0,0,.1)', padding: '38px 32px', opacity: p, transform: `translateY(${(1 - p) * 32}px)`}}><div style={{font: `800 20px/1 ${MONO}`, color: i === 0 ? '#9CB3FF' : C.blue}}>{String(i + 1).padStart(2, '0')}</div><div style={{font: `850 41px/1.08 ${FONT}`, marginTop: 80}}>{mode}</div><div style={{marginTop: 24, height: 5, width: i === 0 ? '100%' : '38%', background: i === 0 ? C.blue : '#D8DDE7'}} /></div>;
        })}
      </div>
    </Background>
  );
};

export const StandardModeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tools = ['编辑文件', '运行命令', '搜索资料', 'Skills / 工作流'];
  return (
    <Background>
      <BrowserWindow style={{left: 90, top: 84, width: 1120, height: 820}} url="Agent Studio / Standard mode">
        <OfficialVideo start={14} />
      </BrowserWindow>
      <div style={{position: 'absolute', right: 100, top: 126, width: 560}}>
        <div style={{font: `850 68px/1.08 ${FONT}`, marginTop: 24}}>新手直接选它</div>
        <div style={{marginTop: 58, display: 'flex', flexDirection: 'column', gap: 17}}>
          {tools.map((tool, i) => {
            const p = seg(frame, 55 + i * 48, 82 + i * 48);
            return <div key={tool} style={{height: 78, borderRadius: 16, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', opacity: p, transform: `translateX(${(1 - p) * 26}px)`}}><span style={{width: 10, height: 10, borderRadius: 5, background: C.blue}} /><span style={{font: `750 28px/1 ${FONT}`}}>{tool}</span></div>;
          })}
        </div>
      </div>
    </Background>
  );
};

export const PtcModeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = seg(frame, 36, 72);
  const merge = seg(frame, 142, 198, Easing.inOut(Easing.cubic));
  const zoom = interpolate(frame, [0, 420], [1.02, 1.09], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const steps = ['读取文件', '搜索代码', '生成修改', '运行检查'];
  return (
    <Background light>
      <BigTitle light>把多轮操作组合成一段程序</BigTitle>
      <BrowserWindow style={{left: 92, top: 350, width: 820, height: 540}} url="Agent Studio · official demo">
        <OfficialVideo start={28} style={{transform: `scale(${zoom})`}} />
      </BrowserWindow>
      <div style={{position: 'absolute', right: 92, top: 350, width: 860, height: 540, borderRadius: 22, background: '#FFFFFF', border: '1px solid rgba(0,0,0,.10)', padding: '34px 38px', boxShadow: '0 30px 80px rgba(20,30,60,.12)', opacity: reveal}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{font: `850 40px/1 ${FONT}`}}>PTC 的执行逻辑</div>
        </div>
        <div style={{marginTop: 34, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16}}>
          {steps.map((step, i) => {
            const p = seg(frame, 72 + i * 28, 96 + i * 28);
            return <div key={step} style={{height: 98, borderRadius: 16, background: '#F7F8FB', border: '1px solid rgba(0,0,0,.09)', padding: '0 22px', display: 'flex', alignItems: 'center', opacity: p, transform: `translateY(${(1 - p) * 14}px)`}}><span style={{width: 42, height: 42, borderRadius: 21, background: C.blue, color: '#fff', textAlign: 'center', font: `800 28px/42px ${FONT}`, marginRight: 16}}>{i + 1}</span><span style={{font: `800 34px/1 ${FONT}`}}>{step}</span></div>;
          })}
        </div>
        <div style={{marginTop: 30, height: 96, borderRadius: 18, background: '#101218', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `850 38px/1 ${FONT}`, transform: `scale(${0.94 + merge * 0.06})`, boxShadow: `0 22px ${60 * merge}px rgba(52,81,178,.20)`}}>多步编排 → 一次执行</div>
      </div>
    </Background>
  );
};

export const MinimalModeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const simplify = seg(frame, 70, 150, Easing.inOut(Easing.cubic));
  const breathe = interpolate(frame, [150, 390], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear});
  const focusPulse = frame < 150 ? 0 : 0.5 + 0.5 * Math.sin((frame - 150) * Math.PI / 60);
  const modules = [
    ['文件', 240, 380], ['终端', 720, 380], ['搜索', 1200, 380],
    ['Skills', 240, 650], ['工作流', 720, 650], ['Subagents', 1200, 650],
  ] as const;
  return (
    <Background>
      <BigTitle>只留下两件工具</BigTitle>
      {modules.map(([name, x, y], i) => {
        const keep = i === 0 || i === 1;
        const focusAmount = keep ? (i === 0 ? focusPulse : 1 - focusPulse) : 0;
        const moveX = keep ? (i === 0 ? 620 : 380) * simplify : 0;
        const moveY = keep ? 90 * simplify : 0;
        return <div key={name} style={{position: 'absolute', left: x + moveX, top: y + moveY, width: 420, height: 180, borderRadius: 22, background: keep ? 'rgba(78,120,255,.14)' : 'rgba(255,255,255,.055)', border: `1px solid ${keep ? 'rgba(78,120,255,.48)' : 'rgba(255,255,255,.14)'}`, boxShadow: keep ? `0 0 ${18 + focusAmount * 42}px rgba(78,120,255,${0.08 + focusAmount * 0.12})` : 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', font: `850 42px/1 ${FONT}`, opacity: keep ? 1 : 1 - simplify, transform: `translateY(${keep ? -breathe * 12 : 0}px) scale(${keep ? 1 + simplify * 0.08 + breathe * 0.04 + focusAmount * 0.025 : 1 - simplify * 0.15})`}}>{name}</div>;
      })}
    </Background>
  );
};

export const SettingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 360], [1, 1.055], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const modelIn = seg(frame, 54, 88);
  const providerIn = seg(frame, 126, 160);
  const pluginIn = seg(frame, 198, 232);
  return (
    <Background>
      <div style={{position: 'absolute', left: 104, top: 76, font: `850 72px/1 ${FONT}`}}>模型与插件设置</div>
      <BrowserWindow style={{left: 104, top: 250, width: 1050, height: 700}} url="Agent Studio / Plugins">
        <OfficialImage name="plugin-feature.png" style={{objectFit: 'contain', background: '#0B0D12', transform: `scale(${zoom})`}} />
      </BrowserWindow>
      <div style={{position: 'absolute', right: 104, top: 250, width: 610, height: 700, borderRadius: 22, background: '#12151B', border: '1px solid rgba(255,255,255,.12)', padding: '38px 36px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
          <div style={{height: 142, borderRadius: 18, background: '#1A1E27', border: '2px solid rgba(78,120,255,.72)', padding: '28px 30px', opacity: modelIn, transform: `translateY(${(1 - modelIn) * 18}px)`}}><div style={{font: `850 40px/1 ${FONT}`}}>示例模型</div><div style={{font: `650 32px/1 ${FONT}`, color: '#AAB4C7', marginTop: 20}}>默认接入</div></div>
          <div style={{height: 142, borderRadius: 18, background: '#1A1E27', border: '1px solid rgba(255,255,255,.12)', padding: '28px 30px', opacity: providerIn, transform: `translateY(${(1 - providerIn) * 18}px)`}}><div style={{font: `850 40px/1 ${FONT}`}}>其他模型</div><div style={{font: `650 32px/1 ${FONT}`, color: '#AAB4C7', marginTop: 20}}>按需配置 Provider</div></div>
          <div style={{height: 142, borderRadius: 18, background: '#1A1E27', border: '1px solid rgba(255,255,255,.12)', padding: '28px 30px', opacity: pluginIn, transform: `translateY(${(1 - pluginIn) * 18}px)`}}><div style={{font: `850 40px/1 ${FONT}`}}>Plugins</div><div style={{font: `650 32px/1 ${FONT}`, color: '#AAB4C7', marginTop: 20}}>入口、配置与列表</div></div>
        </div>
      </div>
    </Background>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const text = seg(frame, 28, 68);
  return (
    <Background>
      <OfficialVideo start={61} style={{filter: 'brightness(.55) saturate(.75)', transform: `scale(${1.05 + frame * 0.00022})`}} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg,rgba(5,7,10,.94) 0%,rgba(5,7,10,.72) 45%,rgba(5,7,10,.16) 80%)'}} />
      <div style={{position: 'absolute', left: 116, top: 250, width: 980, opacity: text, transform: `translateY(${(1 - text) * 26}px)`}}>
        <div style={{font: `880 75px/1.16 ${FONT}`, marginTop: 30}}>普通人也能上手的<br />AI 工具与真实工作流</div>
      </div>
    </Background>
  );
};