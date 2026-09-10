import React from 'react';
import {AbsoluteFill, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {Caption, DEFAULT_EMPHASIS} from './components/Common';
import {SHOTS, TOTAL_FRAMES, shotById, type Shot, type ShotId} from './timeline';
import {
  ApiKeyScene,
  CompareScene,
  HookScene,
  HostMapScene,
  MinimalModeScene,
  ModeIntroScene,
  NotModelScene,
  OutroScene,
  PreviewDialogScene,
  ProjectFoldersScene,
  PromiseScene,
  PtcModeScene,
  PluginWhiteScene,
  SettingsScene,
  StandardModeScene,
  UiOverviewScene,
  WarningScene,
  WebsiteEntryScene,
  WorkspaceBoundaryScene,
} from './scenes/EditorialScenes';
import {CreatorScene, InstallScene, PluginEcosystemScene, WorkspaceTourScene} from './scenes/ShotcraftScenes';

export type InfistarVideoProps = {
  bgm: boolean;
  emphasisTerms?: string[];
};

const SceneMap: Record<ShotId, React.FC> = {
  hook: HookScene,
  promise: PromiseScene,
  'not-model': NotModelScene,
  'host-map': HostMapScene,
  'codex-compare': CompareScene,
  'plugin-white': PluginWhiteScene,
  'plugin-ecosystem': PluginEcosystemScene,
  'preview-warning': WarningScene,
  'website-entry': WebsiteEntryScene,
  install: InstallScene,
  'preview-dialog': PreviewDialogScene,
  'api-key': ApiKeyScene,
  'ui-overview': UiOverviewScene,
  'workspace-tour': WorkspaceTourScene,
  'workspace-boundary': WorkspaceBoundaryScene,
  'project-folders': ProjectFoldersScene,
  'mode-intro': ModeIntroScene,
  'standard-mode': StandardModeScene,
  'ptc-mode': PtcModeScene,
  'minimal-mode': MinimalModeScene,
  'creator-mode': CreatorScene,
  settings: SettingsScene,
  outro: OutroScene,
};

type Sfx = {from: number; src: string; volume: number; duration?: number};
const at = (id: ShotId, offset: number) => shotById[id].from + offset;

const SFX: Sfx[] = [
  {from: at('hook', 15), src: 'swoosh-quick.mp3', volume: 0.34},
  {from: at('hook', 39), src: 'impact-deep-whoosh.mp3', volume: 0.36, duration: 100},
  {from: at('promise', 0), src: 'transition-soft.mp3', volume: 0.26},
  {from: at('not-model', 26), src: 'swoosh-quick.mp3', volume: 0.24},
  {from: at('not-model', 80), src: 'swoosh-quick.mp3', volume: 0.22},
  {from: at('host-map', 50), src: 'transition-soft.mp3', volume: 0.24},
  {from: at('plugin-white', 12), src: 'swoosh-quick.mp3', volume: 0.23},
  {from: at('plugin-ecosystem', 14), src: 'whoosh-big.mp3', volume: 0.32},
  {from: at('plugin-ecosystem', 21), src: 'impact-deep-whoosh.mp3', volume: 0.40, duration: 100},
  {from: at('plugin-ecosystem', 52), src: 'sparkle.mp3', volume: 0.50, duration: 150},
  {from: at('preview-warning', 0), src: 'transition-soft.mp3', volume: 0.23},
  {from: at('website-entry', 260), src: 'click-camera.mp3', volume: 0.45},
  {from: at('install', 22), src: 'keyboard.mp3', volume: 0.25, duration: 60},
  {from: at('install', 212), src: 'keyboard.mp3', volume: 0.23, duration: 58},
  {from: at('install', 365), src: 'keyboard.mp3', volume: 0.22, duration: 55},
  {from: at('preview-dialog', 190), src: 'click-camera.mp3', volume: 0.42},
  {from: at('api-key', 208), src: 'keyboard.mp3', volume: 0.20, duration: 70},
  {from: at('workspace-tour', 132), src: 'click-camera.mp3', volume: 0.30},
  {from: at('workspace-tour', 216), src: 'click-camera.mp3', volume: 0.28},
  {from: at('workspace-tour', 300), src: 'click-camera.mp3', volume: 0.26},
  {from: at('workspace-tour', 384), src: 'click-camera.mp3', volume: 0.24},
  {from: at('mode-intro', 20), src: 'swoosh-quick.mp3', volume: 0.25},
  {from: at('standard-mode', 0), src: 'transition-soft.mp3', volume: 0.21},
  {from: at('ptc-mode', 142), src: 'whoosh-big.mp3', volume: 0.24},
  {from: at('minimal-mode', 70), src: 'transition-soft.mp3', volume: 0.22},
  {from: at('creator-mode', 38), src: 'swoosh-quick.mp3', volume: 0.22},
  {from: at('creator-mode', 152), src: 'swoosh-quick.mp3', volume: 0.20},
  {from: at('creator-mode', 266), src: 'swoosh-quick.mp3', volume: 0.18},
  {from: at('settings', 24), src: 'sparkle.mp3', volume: 0.50, duration: 150},
  {from: at('outro', 0), src: 'transition-soft.mp3', volume: 0.20},
];

const Scene: React.FC<{shot: Shot; emphasisTerms: string[]}> = ({shot, emphasisTerms}) => {
  const Component = SceneMap[shot.id];
  const cleanFrame = shot.id === 'host-map' || shot.id === 'plugin-white';
  const light = ['hook', 'promise', 'not-model', 'codex-compare', 'api-key', 'workspace-boundary', 'mode-intro', 'ptc-mode', 'creator-mode'].includes(shot.id);
  return (
    <AbsoluteFill>
      <Component />
      {!cleanFrame ? <Caption text={shot.text} duration={shot.duration} label={shot.id === 'hook' || shot.id === 'promise' ? '' : shot.label} dark={!light} emphasisTerms={emphasisTerms} /> : null}
    </AbsoluteFill>
  );
};

export const InfistarVideo: React.FC<InfistarVideoProps> = ({bgm, emphasisTerms = DEFAULT_EMPHASIS}) => {
  const frame = useCurrentFrame();
  const bgmVolume = frame < 30 ? (frame / 30) * 0.24 : frame > TOTAL_FRAMES - 50 ? ((TOTAL_FRAMES - frame) / 50) * 0.24 : 0.24;
  return (
    <AbsoluteFill style={{background: '#08090B'}}>
      {SHOTS.map((shot) => (
        <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration} premountFor={30}>
          <Scene shot={shot} emphasisTerms={emphasisTerms} />
        </Sequence>
      ))}
      {bgm ? <Audio src={staticFile('audio/bgm-tech-house.mp3')} volume={Math.max(0, bgmVolume)} /> : null}
      {SFX.map((sfx, index) => (
        <Sequence key={`${sfx.src}-${sfx.from}-${index}`} from={sfx.from} durationInFrames={sfx.duration ?? 90}>
          <Audio src={staticFile(`audio/${sfx.src}`)} volume={sfx.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
