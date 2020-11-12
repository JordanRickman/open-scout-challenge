import React from 'react';
import { Box, AspectRatioBox } from '@chakra-ui/core';
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
      {/* Using AspectRatioBox, plus 100% height & width on ReactPlayer, means
           that both height and width of the player will scale if we change
           the size of the ContentCard (e.g. xl -> lg).
        TODO Query the YouTube API to get an aspect ratio for the pitch video? */}
      <AspectRatioBox maxW="100%" ratio={16 / 9}>
        <Box><ReactPlayer url={onePagerData.pitchVideoLink} width="100%" height="100%" /></Box>
      </AspectRatioBox>
      {/* TODO Show error message on bad video URL? */}
    </ContentCard>
  );
};
