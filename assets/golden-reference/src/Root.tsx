import React from 'react';
import {Composition} from 'remotion';
import {InfistarVideo} from './InfistarVideo';
import {FPS, TOTAL_FRAMES} from './timeline';
import {DEFAULT_EMPHASIS} from './components/Common';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="InfistarVideo"
    component={InfistarVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
    // This reference composition is intentionally 16:9 only.
    defaultProps={{bgm: true, emphasisTerms: DEFAULT_EMPHASIS}}
  />
);
