import React from 'react';
import {Composition} from 'remotion';
import {InfistarVideo} from './InfistarVideo';
import {FPS, TOTAL_FRAMES} from './timeline';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="InfistarVideo"
    component={InfistarVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
    defaultProps={{bgm: true}}
  />
);