import React from 'react';
import { Heading } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';
import { SubHeading } from './SubHeading';
import { UsersChoroplethMap } from './UsersChoroplethMap';
import { UsersAreaChart } from './UsersAreaChart';

// TODO consolidate type across all content cards?
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

  const latestUsersData = onePagerData.regionalUsersData.reduce(
    (usersData1, usersData2) => {
      if (usersData1.date >= usersData2.date) {
        return usersData1;
      } else {
        return usersData2;
      }
    }
  );
  const totalCurrentUsers = latestUsersData.regionalUserCounts
      .reduce((a, b) => (a + b.userCount), 0);

  return (
    <ContentCard title='Users' isLoading={isLoading}>
      <Heading as='h1' size='lg' marginRight='10px'>
        Worldwide Userbase: {formatUserNumber(totalCurrentUsers)}
      </Heading>
      <SubHeading marginTop='30px'>
        Worldwide Adoption Over Time
      </SubHeading>
      <UsersAreaChart usersData={onePagerData.regionalUsersData}/>
      <SubHeading marginTop='30px'>
        Userbase by Country
      </SubHeading>
      <UsersChoroplethMap
        minCount={minRegionalUserCount}
        maxCount={maxRegionalUserCount}
        regionalUserCounts={latestUsersData.regionalUserCounts}
        />
    </ContentCard>
  );
};

function formatUserNumber(number) {
  // TODO
  return String(number);
}