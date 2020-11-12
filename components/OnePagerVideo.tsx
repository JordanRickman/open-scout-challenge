import React from 'react';
// In production, may want to support other video sources (Vimeo, etc.)
// For this alpha test, all video links in our example data are Youtube,
//  so import the YouTube-only version, in order to reduce bundle size.
// See: https://github.com/CookPete/react-player#usage
import ReactPlayer from 'react-player/youtube';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';

type OnePagerVideoProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

export const OnePagerVideo = ({
  onePagerData,
  isLoading,
}: OnePagerVideoProps) => {
  return (
    <ContentCard title='Pitch Video' isLoading={isLoading}>
      <ReactPlayer url={onePagerData.pitchVideoLink} width="100%" />
      {/* TODO Show error message on bad video URL? */}
    </ContentCard>
  );
};
