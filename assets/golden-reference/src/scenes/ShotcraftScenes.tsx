import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, Cursor, FONT, Grain, MONO, OfficialVideo, clamp, seg} from '../components/Common';

export const PluginEcosystemScene: React.FC = () => {
  const frame = useCurrentFrame();
  // video-shotcraft integration-hub-map timing: 35f fast flip, 2f edge flash,
  // icons same frame, pipes +10f, pipes grow in 9f, then continuous 4.6px/f flow.
  const rot = interpolate(frame, [14, 49], [0, 180], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const zoom = interpolate(frame, [0, 14, 82], [1.75, 1.62, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const flash = interpolate(frame, [19, 21, 23, 27], [0, 1, 0.24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const breathe = frame > 75 ? 0.5 + 0.5 * Math.sin((frame - 75) * 0.055) : 0;
  return (
    <AbsoluteFill style={{background: '#08090D', overflow: 'hidden', color: '#fff'}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 52%,rgba(54,78,165,.26),transparent 36%),radial-gradient(circle at 18% 78%,rgba(96,64,152,.16),transparent 30%)'}} />
      <div style={{position: 'absolute', left: 240, top: 230, width: 310, height: 310, borderRadius: '50%', border: '2px solid rgba(112,151,255,.18)', boxShadow: `0 0 ${46 + breathe * 34}px rgba(112,151,255,.12)`}} />
      <div style={{position: 'absolute', right: 210, bottom: 160, width: 390, height: 390, borderRadius: '50%', border: '2px solid rgba(166,108,255,.16)', boxShadow: `0 0 ${54 + breathe * 38}px rgba(166,108,255,.10)`}} />
      <div style={{position: 'absolute', left: 960, top: 520, width: 590, height: 330, transform: `translate(-50%,-50%) rotateY(${rot}deg) scale(${zoom})`, transformStyle: 'preserve-3d', perspective: 1500}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 28, background: '#F8F9FC', color: '#171A21', backfaceVisibility: 'hidden', padding: '50px 54px', boxShadow: `0 0 ${40 + flash * 140}px rgba(255,255,255,${0.28 + flash * 0.55})`}}>
          <div style={{font: `850 44px/1.1 ${FONT}`}}>能力被写死在系统里</div>
          <div style={{height: 11, width: 330, borderRadius: 6, background: '#D9DDE6', marginTop: 44}} />
          <div style={{height: 11, width: 420, borderRadius: 6, background: '#E2E5EB', marginTop: 20}} />
        </div>
        <div style={{position: 'absolute', inset: 0, borderRadius: 28, background: '#F8F9FC', color: '#171A21', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', padding: '48px 54px', boxShadow: `0 0 ${50 + breathe * 30}px rgba(78,120,255,.30)`}}>
          <div style={{font: `850 48px/1.1 ${FONT}`}}>Everything is a Plugin</div>
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};

type Pose = {x: number; y: number; z: number; ry: number};
const TERMINALS: Array<{pose: Pose; title: string; cmd: string; out: string[]}> = [
  {pose: {x: -610, y: -35, z: -130, ry: 24}, title: 'Agent Studio · official quick start', cmd: '$ npx @example/agent-studio web', out: ['Downloading @example/agent-studio…', 'Starting Web UI…', 'The terminal prints its local URL']},
  {pose: {x: 120, y: 84, z: 95, ry: -15}, title: 'terminal output · example', cmd: 'Web UI started', out: ['✓ Agent Studio is running', '✓ Copy the URL printed below', 'Local: http://127.0.0.1:[port]']},
  {pose: {x: 740, y: -100, z: -70, ry: -29}, title: 'next step', cmd: 'Open the printed URL in your browser', out: ['Use the address from your terminal', 'Choose a workspace after opening', 'Do not reuse a fixed port']},
];
const STEPS = [[0, 0.02], [0.30, 0.44], [0.64, 0.78]];
const TYPE_AT = [0.05, 0.47, 0.81];

const cubic = (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const accumPose = (t: number): Pose => {
  const out = {...TERMINALS[0].pose};
  let prev = TERMINALS[0].pose;
  for (let i = 1; i < TERMINALS.length; i++) {
    const u = cubic(clamp((t - STEPS[i][0]) / (STEPS[i][1] - STEPS[i][0])));
    const target = TERMINALS[i].pose;
    out.x += u * (target.x - prev.x);
    out.y += u * (target.y - prev.y);
    out.z += u * (target.z - prev.z);
    out.ry += u * (target.ry - prev.ry);
    prev = target;
  }
  return out;
};

export const InstallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 450;
  const cam = accumPose(t);
  let pull = 0;
  for (let i = 1; i < 3; i++) {
    const u = clamp((t - STEPS[i][0]) / (STEPS[i][1] - STEPS[i][0]));
    pull += Math.sin(u * Math.PI) * 280;
  }
  return (
    <AbsoluteFill style={{background: '#07080E', overflow: 'hidden', perspective: 1600}}>
      <AbsoluteFill style={{background: 'radial-gradient(100% 80% at 50% 0%,#18213B,#07080E 70%)'}} />
      <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translateZ(${420 - pull}px) rotateY(${-cam.ry}deg) translate3d(${-cam.x}px,${-cam.y}px,${-cam.z}px)`}}>
        {TERMINALS.map((item, i) => {
          const focus = 1 - Math.min(1, Math.abs(cam.x - item.pose.x) / 760);
          const ty = clamp((t - TYPE_AT[i]) / 0.10);
          const count = Math.floor(ty * item.cmd.length + 0.0001);
          return (
            <div key={item.title} style={{position: 'absolute', left: '50%', top: '50%', width: 840, height: 500, margin: '-250px 0 0 -420px', borderRadius: 24, background: '#0E1118', border: '2px solid #283047', boxShadow: '0 40px 120px rgba(0,0,0,.72)', overflow: 'hidden', transform: `translate3d(${item.pose.x}px,${item.pose.y}px,${item.pose.z}px) rotateY(${item.pose.ry}deg)`, opacity: 0.28 + focus * 0.72, filter: `blur(${(1 - focus) * 3}px) brightness(${0.68 + focus * 0.32})`}}>
              <div style={{height: 64, background: 'linear-gradient(#252B3A,#1B202C)', borderBottom: '2px solid #2B3345', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 13}}>
                {['#FF6058','#FFBD2E','#28CA42'].map((color) => <span key={color} style={{width: 14, height: 14, borderRadius: 7, background: color}} />)}
                <div style={{position: 'absolute', left: 0, right: 0, textAlign: 'center', font: `650 18px/64px ${MONO}`, color: '#7C869E'}}>{item.title}</div>
              </div>
              <div style={{padding: '44px 42px', fontFamily: MONO}}>
                <div style={{fontSize: 26, fontWeight: 700, color: '#9DFFCF', whiteSpace: 'pre'}}>{item.cmd.slice(0, count)}<span style={{opacity: Math.floor(frame / 8) % 2 ? 0.28 : 1}}>▋</span></div>
                <div style={{marginTop: 34}}>
                  {item.out.map((line, k) => {
                    const lineIn = seg(t * 1000, (TYPE_AT[i] + 0.12 + k * 0.025) * 1000, (TYPE_AT[i] + 0.165 + k * 0.025) * 1000);
                    return <div key={line} style={{font: `550 22px/1.7 ${MONO}`, color: k === 0 ? '#D5DCEC' : '#7F8AA5', opacity: lineIn, transform: `translateX(${(1 - lineIn) * -15}px)`}}>{line}</div>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Grain />
    </AbsoluteFill>
  );
};

const TOUR_POINTS = [
  {x: 1080, y: 350, label: '项目 / 工作区'},
  {x: 1410, y: 515, label: '任务输入框'},
  {x: 1160, y: 650, label: 'Workspace Write'},
  {x: 470, y: 470, label: '未选工作区前输入不可用'},
  {x: 470, y: 330, label: 'Choose a workspace'},
];
const TOUR_WINS = [[54, 96], [138, 180], [222, 264], [306, 348]];

const tourPointAt = (frame: number) => {
  const out = {...TOUR_POINTS[0]};
  let prev = TOUR_POINTS[0];
  for (let i = 0; i < TOUR_WINS.length; i++) {
    const u0 = clamp((frame - TOUR_WINS[i][0]) / (TOUR_WINS[i][1] - TOUR_WINS[i][0]));
    const u = cubic(u0);
    const to = TOUR_POINTS[i + 1];
    out.x += u * (to.x - prev.x);
    out.y += u * (to.y - prev.y);
    prev = to;
  }
  const tail = clamp((frame - 348) / 102);
  out.x += tail * 24;
  out.y -= tail * 10;
  return out;
};

export const WorkspaceTourScene: React.FC = () => {
  const frame = useCurrentFrame();
  const point = tourPointAt(frame);
  const tailZoom = interpolate(frame, [300, 450], [1, 1.03], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear});
  let ripple = 0;
  for (const win of TOUR_WINS) {
    const p = clamp((frame - win[1]) / 22);
    if (p > 0 && p < 1) ripple = p;
  }
  return (
    <AbsoluteFill style={{background: '#080910', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 72, top: 150, width: 650, height: 760, borderRadius: 22, overflow: 'hidden', background: '#fff', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 36px 100px rgba(0,0,0,.45)'}}>
        <Img src={staticFile('media/quickstart-fullpage.png')} style={{position: 'absolute', left: -125, top: -38, width: 900, height: 'auto'}} />
        <div style={{position: 'absolute', left: 170, top: 235, width: 430, height: 122, borderRadius: 14, border: '4px solid #4E78FF', boxShadow: '0 0 0 999px rgba(255,255,255,.12) inset'}} />
      </div>
      <div style={{position: 'absolute', left: 760, top: 190, width: 1080, height: 720, borderRadius: 22, overflow: 'hidden', background: '#0D0F14', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 36px 100px rgba(0,0,0,.55)'}}>
        <Img src={staticFile('media/demo-frame-15.jpg')} style={{width: '100%', height: '100%', objectFit: 'contain', background: '#050608', transform: `scale(${tailZoom})`, transformOrigin: '50% 50%'}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 999px rgba(0,0,0,.04)'}} />
      </div>
      <Cursor x={point.x} y={point.y} click={ripple} scale={1.1} />
      <Grain />
    </AbsoluteFill>
  );
};

const FILM_FRAMES = ['demo-frame-15.jpg', 'demo-frame-30.jpg', 'demo-frame-45.jpg', 'demo-frame-60.jpg'];
const FILM_WORDS = ['Agent 预设', '运行时检查', '插件实验'];
const SWITCHES = [38, 152, 266];

export const CreatorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cardH = 470;
  const gap = 48;
  const step = cardH + gap;
  let scrollSteps = 0;
  SWITCHES.forEach((s) => {
    const p = clamp((frame - s) / 24);
    scrollSteps += cubic(p);
  });
  const scroll = scrollSteps * step;
  const active = Math.min(2, Math.max(0, Math.floor((frame + 20) / 114)));
  return (
    <AbsoluteFill style={{background: '#F7F5EF', overflow: 'hidden', color: C.ink}}>
      <div style={{position: 'absolute', left: 86, top: -200, width: 900, height: 1500, overflow: 'hidden'}}>
        {[-1, 0, 1].flatMap((rep) => FILM_FRAMES.map((name, i) => {
          const y = 330 + i * step + rep * FILM_FRAMES.length * step - scroll;
          if (y < -550 || y > 1150) return null;
          return <div key={`${rep}-${name}`} style={{position: 'absolute', left: 0, top: y, width: 860, height: cardH, borderRadius: 20, overflow: 'hidden', background: i % 2 ? '#fff' : '#101216', boxShadow: '0 22px 60px rgba(25,28,38,.16)'}}><Img src={staticFile(`media/${name}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>;
        }))}
      </div>
      <div style={{position: 'absolute', right: 150, top: 355, width: 760, height: 340}}>
        <div style={{font: `850 74px/1.05 ${FONT}`}}>为进阶用户<br />创造自己的</div>
        <div style={{position: 'relative', height: 110, marginTop: 18}}>
          {FILM_WORDS.map((word, i) => {
            const inP = seg(frame, SWITCHES[i] + 10, SWITCHES[i] + 28);
            const outP = i < FILM_WORDS.length - 1 ? 1 - seg(frame, SWITCHES[i + 1] - 12, SWITCHES[i + 1] + 8) : 1;
            const opacity = inP * outP;
            return <div key={word} style={{position: 'absolute', left: 0, top: 0, font: `500 82px/1 ${FONT}`, color: C.blueDeep, opacity, transform: `translateY(${(1 - inP) * 18}px)`}}>{word}</div>;
          })}
        </div>
      </div>
      <div style={{position: 'absolute', right: 150, top: 124, display: 'flex', gap: 10}}>{FILM_WORDS.map((word, i) => <div key={word} style={{width: i === active ? 80 : 28, height: 6, borderRadius: 3, background: i === active ? C.blueDeep : '#D6D8DE', transition: 'none'}} />)}</div>
      <Grain light />
    </AbsoluteFill>
  );
};