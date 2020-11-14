import React from 'react';
import { Heading } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { formatUserNumber } from '../lib/util';
import { ContentCard } from './ContentCard';
import { SubHeading } from './SubHeading';
import { Keypoint } from './Keypoint';
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

  /* TODO My intended design for this component was that the user could click
   *  on a datapoint in the area chart of users over time, and the world map
   *  would change to show regional user data at that particular point in time.
   *  (Or, the map would just change as you hover over data points.)
   * However, it was taking too long figuring out how to hook into the
   *  react-charts library to do that.
   * So, add this feature later if time. Otherwise, map just shows current/latest
   *  regional user data.
   */
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
        Worldwide Userbase: <Keypoint>{formatUserNumber(totalCurrentUsers)}</Keypoint>
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