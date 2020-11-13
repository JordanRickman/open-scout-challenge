import React from 'react';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';
import { UsersChoroplethMap } from './UsersChoroplethMap';
import { UsersAreaChart } from './UsersAreaChart';

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
  if (!onePagerData.regionalUsersData) {
    return (
      <></>
    );
  }

  function reduceUserCounts(reducerFunction, initialValue) {
    // TODO use lodash instead?
    return onePagerData.regionalUsersData.reduce((acc, nextData) => {
      return reducerFunction(acc, nextData.regionalUserCounts.reduce(
        (acc, nextRegion) => {
          return reducerFunction(acc, nextRegion.userCount);
        },
        initialValue
      ));
    }, initialValue);
  }
  const minRegionalUserCount = reduceUserCounts(Math.min, Infinity);
  const maxRegionalUserCount = reduceUserCounts(Math.max, 0);

  // TODO Dynamic.
  const selectedUsersData = onePagerData.regionalUsersData.reduce(
    // Initialize map with most recent data.
    (usersData1, usersData2) => {
      if (usersData1.date >= usersData2.date) {
        return usersData1;
      } else {
        return usersData2;
      }
    }
  );

  return (
    <ContentCard title='Users' isLoading={isLoading}>
      <UsersChoroplethMap
        minCount={minRegionalUserCount}
        maxCount={maxRegionalUserCount}
        regionalUserCounts={selectedUsersData.regionalUserCounts}
        />
      <UsersAreaChart usersData={onePagerData.regionalUsersData}/>
    </ContentCard>
  );
};