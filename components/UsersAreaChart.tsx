import React from 'react';
import { Chart } from 'react-charts';
import { Box } from '@chakra-ui/core';
import { curveLinear } from 'd3';

import { RegionalUsersData } from '../model/model';

type UsersAreaChartProps = {
  usersData: RegionalUsersData[];
}

export const UsersAreaChart = ({
  usersData
}: UsersAreaChartProps) => {
  const chartData = React.useMemo(() => [
    {
      label: 'Global Users',
      data: usersData.map(usersData => {
        const totalUsers = usersData.regionalUserCounts
            .reduce((a, b) => (a + b.userCount), 0);
        return {
          primary: usersData.date,
          secondary: totalUsers
        }
      })
    }
  ], [usersData]);

  const axes = React.useMemo(() => [
    { primary: true, position: 'bottom', type: 'time' },
    { position: 'left', type: 'linear' }
  ], []);
  const series = React.useMemo(() => ({
    type: 'area',
    curve: curveLinear
  }), []);

  return (
    <Box w="100%" h="3xs">
      <Chart data={chartData} series={series} axes={axes} tooltip />
    </Box>
  )
};