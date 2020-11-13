import React from 'react';
import { Chart } from 'react-charts';

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
  console.log(chartData);

  const axes = React.useMemo(() => [
    { primary: true, position: 'bottom', type: 'time' },
    { position: 'left', type: 'linear' }
  ], []);
  const series = React.useMemo(() => ({
    type: 'area'
  }), []);

  return (
    <div style={{ width: "100%", height: "360px" }}>
      <Chart data={chartData} series={series} axes={axes} tooltip />
    </div>
  )
};