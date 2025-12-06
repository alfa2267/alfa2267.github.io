import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowUpRight, IconGitBranch } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import GitHubService from '../../../services/github';

const githubService = new GitHubService();

const MonthlyEarnings = () => {
  const [commitStats, setCommitStats] = React.useState({
    currentMonth: 0,
    lastMonth: 0,
    percentageChange: 0
  });
  const [loading, setLoading] = React.useState(true);
  const [commitHistory, setCommitHistory] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  const [loadingHistory, setLoadingHistory] = React.useState(true);

  // Fetch commit statistics
  React.useEffect(() => {
    const fetchCommitStats = async () => {
      try {
        setLoading(true);
        const stats = await githubService.getMonthlyCommitStats();
        setCommitStats(stats);
      } catch (error) {
        console.error('Error fetching commit stats:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };
    fetchCommitStats();
  }, []);

  // Fetch commit history for chart
  React.useEffect(() => {
    const fetchCommitHistory = async () => {
      try {
        setLoadingHistory(true);
        const history = await githubService.getWeeklyCommitHistory();
        setCommitHistory(history);
      } catch (error) {
        console.error('Error fetching commit history:', error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchCommitHistory();
  }, []);

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: 'Commits',
      color: secondary,
      data: loadingHistory ? [0, 0, 0, 0, 0, 0, 0] : commitHistory,
    },
  ];

  return (
    <DashboardCard
      title="Monthly Contributions"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconGitBranch width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {loading ? '...' : `${commitStats.currentMonth} commit${commitStats.currentMonth !== 1 ? 's' : ''}`}
        </Typography>
        {!loading && commitStats.lastMonth > 0 && (
          <Stack direction="row" spacing={1} my={1} alignItems="center">
            <Avatar sx={{ bgcolor: commitStats.percentageChange >= 0 ? errorlight : '#e8f5e9', width: 27, height: 27 }}>
              <IconArrowUpRight width={20} color={commitStats.percentageChange >= 0 ? "#FA896B" : "#4caf50"} />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {commitStats.percentageChange > 0 ? '+' : ''}{commitStats.percentageChange}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              vs last month
            </Typography>
          </Stack>
        )}
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
