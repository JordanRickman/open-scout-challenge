import React from 'react';
import { Heading, Progress, Box, Flex, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/core';

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
  return (
    <ContentCard title='Finances' isLoading={isLoading}>
      <Heading as='h1' size='lg' marginRight='10px'>
        Funding Stage: {onePagerData.fundraisingStage}
      </Heading>
      { onePagerData.fundraisingDetails && (
        <>
          <SubHeading>Stage Goal</SubHeading>
          <Text fontSize='sm'>{onePagerData.fundraisingDetails}</Text>
        </>
      )}
      <FundraisingProgress
        raised={onePagerData.fundsRaisedInStage}
        goal={onePagerData.fundraisingStageGoal}
      />
    </ContentCard>
  );
};

/** Render a fundraising progress component. */
const FundraisingProgress = ({ raised, goal }: {
  raised: number;
  goal: number;
}) => {
  // Format a number to include a dollar sign, commas, and round to the nearest whole number.
  const formatFinanceNumber = (financeNumber: number) => {
    return `$${formatNumberBasic(financeNumber)}`;
  };

  const progress = 100 * raised / goal;

  // Common rendering code for the "funds raised" and the "funding goal".
  const StatFunding = ({
    label,
    value
  }: {
    label: string,
    value: number
  }) => {
    return (
      <Stat flex='0 1 auto' p='4px'>
        <StatLabel fontSize='sm' margin='0'>{label}</StatLabel>
        <StatNumber fontSize='lg' marginTop='0' marginBottom='5px'>
          {formatFinanceNumber(value)}
        </StatNumber>
      </Stat>
    )
  }

  return (
    <Box margin='1em 0'>
      <Flex
        flexDirection='row'
        justifyContent='space-between'
        alignItems='baseline'
        marginBottom='2px'
      >
        <StatFunding label='Funds Raised' value={raised} />
        <Text
          alignSelf='center'
          fontSize='xs'
          color='grey'
        >
          out of
        </Text>
        <StatFunding label='Funding Goal' value={goal} />
      </Flex>
      <Box
        border='1px solid grey'
        rounded='lg'
        margin='0'
        bg='white'
        postion='relative'
      >
        <Progress value={progress}
          colorScheme='green'
          margin='1em'
          size='lg'
        />
      </Box>
    </Box>
  );
};
