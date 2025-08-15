import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import ProjectService from '../../../services/projectService';


const MyProjects = () => {
    const projectService = new ProjectService();
    
    // select
    const [selectedDate, setSelectedDate] = React.useState('');
    const [availableDates, setAvailableDates] = React.useState([]);
    const [projects, setProjects] = React.useState([]);

    const handleChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // Fetch repository update dates
    React.useEffect(() => {
        const fetchProjectDates = async () => {
            try {
                const fetchedProjects = await projectService.fetchProjects();
                setProjects(fetchedProjects);
                
                // Extract unique update dates and sort them
                const dates = fetchedProjects
                    .filter(project => project.updated_at) // Only projects with update dates
                    .map(project => ({
                        value: project.updated_at,
                        label: new Date(project.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        projectName: project.name
                    }))
                    .sort((a, b) => new Date(b.value) - new Date(a.value)) // Sort by newest first
                    .slice(0, 10); // Limit to 10 most recent dates

                setAvailableDates(dates);
                if (dates.length > 0) {
                    setSelectedDate(dates[0].value); // Set most recent as default
                }
            } catch (error) {
                console.error('Error fetching project dates:', error);
            }
        };

        fetchProjectDates();
    }, []);

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['Business Value', 'Complexity', 'Time Spent', 'Fun Rating'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    // Generate series data from actual projects
    const seriescolumnchart = React.useMemo(() => {
        if (projects.length === 0) {
            return [
                {
                    name: 'Loading...',
                    data: [0, 0, 0, 0],
                },
            ];
        }

        // Take first few projects with metadata and use their actual metrics
        return projects.slice(0, 3).map(project => ({
            name: project.name || 'Untitled Project',
            data: [
                project.metrics?.business_value || 0, // Business Value
                project.metrics?.complexity || 0,     // Complexity  
                project.metrics?.time_spent || 0,     // Time Spent
                project.metrics?.fun_rating || 0,     // Fun Rating
            ],
        }));
    }, [projects]);

    return (

        <DashboardCard title="My Projects" action={
            <Select
                labelId="date-dd"
                id="date-dd"
                value={selectedDate}
                size="small"
                onChange={handleChange}
                displayEmpty
            >
                {availableDates.length === 0 ? (
                    <MenuItem value="" disabled>Loading...</MenuItem>
                ) : (
                    availableDates.map((dateItem, index) => (
                        <MenuItem key={index} value={dateItem.value}>
                            {dateItem.label}
                        </MenuItem>
                    ))
                )}
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default MyProjects;
