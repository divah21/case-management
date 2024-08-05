import { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RateChip from 'components/chips/RateChip';
import DateSelect from 'components/dates/DateSelect';
import EChartsReactCore from 'echarts-for-react/lib/core';
import RevenueChartLegends from './RevenueChartLegends';
import RevenueChart from './RevenueChart';

export const revenueData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      name: 'Unlawful Entry',
      data: [100, 50, 200, 360, 1600, 240, 100, 440, 120, 60, 1200, 2400],
    },
    {
      name: 'Fraud',
      data: [120, 200, 260, 120, 1000, 320, 600, 800, 1200, 1800, 160, 60],
    },
    {
      name: 'Theft and Assault',
      data: [500, 260, 80, 90, 800, 140, 0, 380, 140, 300, 160, 280],
    },
  ],
};

const RevenueByCustomer = () => {
  const chartRef = useRef<EChartsReactCore>(null);

  return (
    <Paper sx={{ height: { xs: 540, md: 500 } }}>
      {/* header */}
      <Typography variant="subtitle1" color="text.secondary">
       Monthly Statistics 
      </Typography>

      {/* subheader */}
      <Stack justifyContent="space-between" mt={1}>
        <Stack alignItems="center" gap={0.875}>
          <Typography variant="h3" fontWeight={600} letterSpacing={1}>
            2.5K
          </Typography>
          <RateChip rate={'6.5%'} isUp={true} />
        </Stack>

        <Stack alignItems="center" spacing={2}>
          {/* legends for bigger screen */}
          <Box display={{ xs: 'none', md: 'block' }}>
            <RevenueChartLegends chartRef={chartRef} sm={false} />
          </Box>
          <DateSelect />
        </Stack>
      </Stack>

      {/* legends for smaller screen */}
      <Box display={{ xs: 'block', md: 'none' }}>
        <RevenueChartLegends chartRef={chartRef} sm={true} />
      </Box>

      {/* stacked bar chart */}
      <Box height={400}>
        <RevenueChart chartRef={chartRef} data={revenueData} sx={{ minHeight: 1 }} />
      </Box>
    </Paper>
  );
};

export default RevenueByCustomer;
