import React from 'react';
import { Heading } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { formatNumberBasic } from '../util/util';
import { ContentCard } from './ContentCard';
import { SubHeading } from './SubHeading';

type OnePagerFinancesProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

/** Renders the Finances card. */
export const OnePagerFinances = ({
  onePagerData,
  isLoading,
}: OnePagerFinancesProps) => {
  // Format a number to include a dollar sign, commas, and round to the nearest whole number.
  const formatFinanceNumber = (financeNumber: number) => {
    return `$${formatNumberBasic(financeNumber)}`;
  };

  return (
    <ContentCard title='Finances' isLoading={isLoading}>
      <Heading as='h1' size='lg' marginRight='10px'>
        Funding Stage: {onePagerData.fundraisingStage}
      </Heading>
      { onePagerData.fundraisingDetails && (
        <>
          <SubHeading>Stage Goal</SubHeading>
          {onePagerData.fundraisingDetails}
        </>
      )}
      <SubHeading>
        Funds Raised: {formatFinanceNumber(onePagerData.fundsRaisedInStage)}
      </SubHeading>
      <SubHeading>
        Funding Goal: {formatFinanceNumber(onePagerData.fundraisingStageGoal)}
      </SubHeading>
    </ContentCard>
  );
};
