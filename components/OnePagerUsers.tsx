import React from 'react';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';
import { ChoroplethMap } from './ChoroplethMap';

// TODO consolidate type across all content cards??
type OnePagerUsersProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

/** Renders the Users card */
export const OnePagerUsers = ({
  onePagerData,
  isLoading
}: OnePagerUsersProps) => {
  return (
    <ContentCard title='Users' isLoading={isLoading}>
      <ChoroplethMap minValue={0} maxValue={1000000}
        regionalUserCounts={[
          {
            countryCode: 'USA',
            userCount: 1000000
          },
          {
            countryCode: 'GBR',
            userCount: 500000
          },
          {
            countryCode: 'CAN',
            userCount: 200000
          },
          {
            countryCode: 'JPN',
            userCount: 1234
          }
        ]}/>
    </ContentCard>
  );
};