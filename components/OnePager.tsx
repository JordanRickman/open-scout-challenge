import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Flex, Divider } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { getOnePagerData } from '../data/dataService';
import { EMPTY_ONE_PAGER } from '../data/onepagers';
import { usePaywall } from '../lib/usePaywall';
import { ContentCard } from './ContentCard';
import { Header } from './Header';
import { OnePagerOverview } from './OnePagerOverview';
import { OnePagerFounders } from './OnePagerFounders';
import { OnePagerFinances } from './OnePagerFinances';
import { OnePagerVideo } from './OnePagerVideo';
import { OnePagerUsers } from './OnePagerUsers';
import { PaywallBlock } from './PaywallBlock';

/** Renders a full one pager based on the onePagerUrl. */
export const OnePager = ({ onePagerUrl }: { onePagerUrl: string }) => {
  const [onePagerData, setOnePager]: [OnePagerData, any] = React.useState(
    EMPTY_ONE_PAGER
  );
  const [isLoading, setIsLoading]: [boolean, any] = React.useState(false);
  const isBlockedByPaywall: boolean = usePaywall(onePagerUrl);

  // If paywall is up, render as if still loading. Then, if the user force closes
  //  the paywall modal via dev tools or the like, they still can't see the content.
  const showLoading = isLoading || isBlockedByPaywall;

  // Load data on first render.
  React.useEffect(() => {
    setIsLoading(true);
    getOnePagerData(onePagerUrl).then((onePagerData) => {
      setOnePager(onePagerData);
      setIsLoading(false);
    });
  }, []);

  return (
    <Box bg='#f2f4f5'>
      <PaywallBlock isBlocked={isBlockedByPaywall} />
      <Head>
        <title>{showLoading ? onePagerUrl : onePagerData.companyName}</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />

      <OnePagerOverview onePagerData={onePagerData} isLoading={showLoading} />

      <Diveder50 />

      <OnePagerFounders onePagerData={onePagerData} isLoading={showLoading} />

      <Diveder50 />

      <OnePagerFinances onePagerData={onePagerData} isLoading={showLoading} />

      <Diveder50 />

      { onePagerData.pitchVideoLink &&
        <>
          <OnePagerVideo onePagerData={onePagerData} isLoading={showLoading} />

          <Diveder50 />
        </>
      }

      { onePagerData.regionalUsersData &&
        <>
          <OnePagerUsers onePagerData={onePagerData} isLoading={isLoading} />

          <Diveder50 />
        </>
      }

      <ContentCard isLoading={false}>
        <Flex justifyContent='center'>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </Flex>
      </ContentCard>
      <Box h='20'></Box>
    </Box>
  );
};

const Diveder50 = () => <Divider width='50%' />;
