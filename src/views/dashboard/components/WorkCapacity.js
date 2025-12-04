import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';

import DashboardCard from '../../../components/shared/DashboardCard';
import ProjectService from '../../../services/projectService';

const YearlyBreakup = () => {
  const projectService = new ProjectService();
  const [projectCount, setProjectCount] = React.useState(0);
  const [previousCount, setPreviousCount] = React.useState(0);

  // Fetch project stats
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await projectService.getProjectStats();
        setProjectCount(stats.total);
        // For now, we'll calculate the change based on a stored previous count
        // In a real app, you'd store this in localStorage or a backend
        const storedPrevious = localStorage.getItem('previousProjectCount');
        if (storedPrevious) {
          setPreviousCount(parseInt(storedPrevious, 10));
        }
        // Store current count for next time
        localStorage.setItem('previousProjectCount', stats.total.toString());
      } catch (error) {
        console.error('Error fetching project stats:', error);
      }
    };
    fetchStats();
  }, []);

  const change = projectCount - previousCount;
  
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  // Portfolio-oriented breakdown (e.g., Open Source / Personal / Experiments)
  const seriescolumnchart = [60, 30, 10];

  return (
    <DashboardCard title="Project Breakdown">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
          </Typography>
          {previousCount > 0 && (
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                {change > 0 ? '+' : ''}{change}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                vs last month
              </Typography>
            </Stack>
          )}
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Open Source
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Personal
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
