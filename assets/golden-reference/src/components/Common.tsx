import React from 'react';
import {AbsoluteFill, Img, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Video} from '@remotion/media';

export const C = {
  bg: '#08090B',
  bg2: '#111318',
  paper: '#F7F5EF',
  white: '#F7F9FC',
  ink: '#16181D',
  muted: '#9CA3AF',
  blue: '#4E78FF',
  blueDeep: '#3451B2',
  orange: '#FF6B4A',
  line: 'rgba(255,255,255,0.14)',
};

export const FONT = '"Microsoft YaHei UI","Noto Sans SC","PingFang SC",Arial,sans-serif';
export const MONO = '"Cascadia Mono",Consolas,"SFMono-Regular",monospace';

export const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
export const seg = (frame: number, a: number, b: number, easing: (v: number) => number = Easing.out(Easing.cubic)) =>
  interpolate(frame, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

export const Grain: React.FC<{light?: boolean}> = ({light = false}) => (
  <AbsoluteFill
    style={{
      backgroundImage: light
        ? 'linear-gradient(180deg,rgba(35,49,86,.025),rgba(255,255,255,0) 44%,rgba(35,49,86,.035))'
        : 'radial-gradient(circle at 50% 44%,rgba(255,255,255,.018),transparent 48%,rgba(0,0,0,.20) 100%)',
      pointerEvents: 'none',
    }}
  />
);
const clauses = (text: string) => {
  const initial = text
    .replace(/\s+/g, ' ').trim()
    .split(/(?<=[。！？；：])/)
    .filter(Boolean);
  const pages: string[] = [];
  const pushChunk = (value: string) => {
    let rest = value.trim();
    while (rest.length > 14) {
      pages.push(rest.slice(0, 14));
      rest = rest.slice(14);
    }
    if (rest) pages.push(rest);
  };
  for (const sentence of initial) {
    const parts = sentence.split(/(?<=[，、])/).filter(Boolean);
    let current = '';
    for (const part of parts) {
      if (current && current.length + part.length > 14) {
        pushChunk(current);
        current = part;
      } else {
        current += part;
      }
      if (current.length > 14) {
        pushChunk(current);
        current = '';
      }
    }
    if (current) pushChunk(current);
  }
  return pages.length ? pages : [text];
};

export const DEFAULT_EMPHASIS = [
  'Agent Studio', 'Codex', 'Agent', 'API Key', 'Skills', 'Everything is a Plugin',
  '一切皆插件', '开发者预览版', '工作区', '标准模式', 'PTC', '极简模式', '创造模式', '插件',
];

const Highlighted: React.FC<{text: string; terms: string[]}> = ({text, terms}) => {
  const key = terms.find((candidate) => text.includes(candidate));
  if (!key) return <>{text}</>;
  const [before, after] = text.split(key);
  return (
    <>
      {before}
      <span style={{color: C.blue, fontWeight: 800}}>{key}</span>
      {after}
    </>
  );
};

export const Caption: React.FC<{
  text: string;
  duration: number;
  label: string;
  dark?: boolean;
  emphasisTerms?: string[];
}> = ({
  text,
  duration,
  label,
  dark = true,
  emphasisTerms = DEFAULT_EMPHASIS,
}) => {
  const frame = useCurrentFrame();
  const pages = clauses(text);
  const pageDurations = pages.map((page) => Math.min(54, Math.max(24, page.length * 4)));
  const captionDuration = pageDurations.reduce((a, b) => a + b, 0);
  const visible = frame < Math.min(duration, captionDuration);
  const pos = Math.min(frame, Math.max(0, captionDuration - 1));
  let cumulative = 0;
  let index = 0;
  for (let i = 0; i < pageDurations.length; i++) {
    cumulative += pageDurations[i];
    if (pos < cumulative) {
      index = i;
      break;
    }
  }
  const pageStart = pageDurations.slice(0, index).reduce((a, b) => a + b, 0);
  const localFrame = pos - pageStart;
  const fade = visible
    ? Math.min(seg(localFrame, 0, 6), 1 - seg(localFrame, pageDurations[index] - 6, pageDurations[index]))
    : 0;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          bottom: 68,
          zIndex: 60,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1500,
            padding: '15px 28px 17px',
            borderRadius: 18,
            background: dark ? 'rgba(5,7,10,.86)' : 'rgba(255,255,255,.90)',
            color: dark ? C.white : C.ink,
            border: dark ? '1px solid rgba(255,255,255,.13)' : '1px solid rgba(0,0,0,.10)',
            boxShadow: dark ? '0 18px 50px rgba(0,0,0,.28)' : '0 18px 50px rgba(20,24,34,.12)',
            fontFamily: FONT,
            fontSize: 60,
            lineHeight: 1.24,
            fontWeight: 680,
            textAlign: 'center',
            letterSpacing: 0.3,
            opacity: fade,
            transform: `translateY(${(1 - fade) * 10}px)`,
          }}
        >
          <Highlighted text={pages[index]} terms={emphasisTerms} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 82, right: 82, bottom: 34, height: 3, background: dark ? 'rgba(255,255,255,.10)' : 'rgba(10,12,18,.10)', zIndex: 60}}>
        <div style={{height: '100%', width: `${clamp(frame / duration) * 100}%`, background: C.blue}} />
      </div>
    </>
  );
};

export const BrowserWindow: React.FC<{
  children: React.ReactNode;
  url?: string;
  style?: React.CSSProperties;
}> = ({children, url = 'localhost:3000', style}) => (
  <div
    style={{
      position: 'absolute',
      borderRadius: 22,
      overflow: 'hidden',
      background: '#111318',
      border: '1px solid rgba(255,255,255,.14)',
      boxShadow: '0 36px 100px rgba(0,0,0,.48)',
      ...style,
    }}
  >
    <div style={{height: 54, background: '#191B21', borderBottom: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10}}>
      {['#FF6259', '#FFBD2E', '#28C840'].map((color) => <span key={color} style={{width: 12, height: 12, borderRadius: 6, background: color}} />)}
      <div style={{marginLeft: 18, height: 30, minWidth: 460, borderRadius: 9, background: '#0D0F13', color: '#7E8797', font: `500 15px/30px ${MONO}`, padding: '0 14px'}}>{url}</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 54, bottom: 0}}>{children}</div>
  </div>
);

export const OfficialVideo: React.FC<{
  start: number;
  style?: React.CSSProperties;
  playbackRate?: number;
}> = ({start, style, playbackRate = 1}) => (
  <Video
    src={staticFile('media/demo.mp4')}
    trimBefore={Math.round(start * 30)}
    muted
    playbackRate={playbackRate}
    style={{width: '100%', height: '100%', objectFit: 'cover', ...style}}
  />
);

export const OfficialImage: React.FC<{name: string; style?: React.CSSProperties}> = ({name, style}) => (
  <Img src={staticFile(`media/${name}`)} style={{width: '100%', height: '100%', objectFit: 'cover', ...style}} />
);

export const Cursor: React.FC<{x: number; y: number; click?: number; scale?: number}> = ({x, y, click = 0, scale = 1}) => (
  <>
    {click > 0 && click < 1 ? (
      <div style={{position: 'absolute', left: x, top: y, width: 30, height: 30, borderRadius: 20, border: `3px solid ${C.blue}`, opacity: 1 - click, transform: `translate(-50%,-50%) scale(${0.4 + click * 2})`, zIndex: 42}} />
    ) : null}
    <svg viewBox="0 0 32 32" style={{position: 'absolute', left: x, top: y, width: 34 * scale, height: 34 * scale, zIndex: 43, filter: 'drop-shadow(0 4px 5px rgba(0,0,0,.7))'}}>
      <path d="M4 2 L4 26 L11 20 L16 30 L21 27 L16 17 L28 16 Z" fill="#fff" stroke="#10131A" strokeWidth="1.6" />
    </svg>
  </>
);

export const Pill: React.FC<{children: React.ReactNode; active?: boolean; warn?: boolean}> = ({children, active, warn}) => (
  <div
    style={{
      borderRadius: 999,
      border: `1px solid ${warn ? 'rgba(255,107,74,.55)' : active ? 'rgba(78,120,255,.65)' : 'rgba(255,255,255,.14)'}`,
      background: warn ? 'rgba(255,107,74,.12)' : active ? 'rgba(78,120,255,.16)' : 'rgba(255,255,255,.05)',
      color: warn ? '#FF9B83' : active ? '#AFC3FF' : '#C5CBD6',
      padding: '9px 16px',
      font: `650 18px/1 ${FONT}`,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);
