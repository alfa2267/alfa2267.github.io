# Quick Start Examples - Portfolio Components

This guide shows you how to use the new portfolio components with copy-paste examples.

## 1. Simple Project Page Structure

```jsx
import React from 'react';
import { Grid } from '@mui/material';
import {
  IconFileText, IconUsers, IconTrendingUp, IconRocket
} from '@tabler/icons-react';
import PageContainer from '../../../components/container/PageContainer';
import {
  ProjectHeroSection,
  ProductMetricsSection,
  DesignProcessSection,
  NotebookReflections,
  ProjectShowcaseSection
} from '../../../components/sections';

const MyProjectPage = () => {
  return (
    <PageContainer title="My Project" description="Project description">
      <Grid container spacing={3}>

        {/* 1. Hero Section */}
        <Grid item xs={12}>
          <ProjectHeroSection
            name="Project Name"
            description="Brief description of what this project does and why it matters"
            role="Product Manager"
            timeline="Jan 2024 - Mar 2024"
            value="$500K ARR Impact"
            tags={['React', 'Node.js', 'PostgreSQL', 'AWS']}
          />
        </Grid>

        {/* 2. Key Metrics */}
        <Grid item xs={12}>
          <ProductMetricsSection
            title="Key Metrics"
            metrics={[
              { icon: IconUsers, label: "Users", value: "10K+", color: "#5D87FF" },
              { icon: IconTrendingUp, label: "Growth", value: "125%", color: "#13DEB9", trend: { direction: 'up', value: '+25%' } },
              { icon: IconRocket, label: "NPS Score", value: "72", color: "#9C27B0" }
            ]}
          />
        </Grid>

        {/* 3. Problem Discovery - ESSENTIAL */}
        <Grid item xs={12}>
          <ProblemDiscoverySection
            problemStatement={{
              description: "What problem you're solving and why it matters",
              challenges: ['Challenge 1', 'Challenge 2'],
              impact: ['Business impact', 'User impact']
            }}
            solutionOverview={{
              description: "How you're solving it",
              approach: ['Approach 1', 'Approach 2'],
              keyFeatures: ['Feature 1', 'Feature 2']
            }}
            successCriteria={[
              { value: '40%', label: 'Improvement' },
              { value: '10K', label: 'Users Helped' }
            ]}
          />
        </Grid>

        {/* 4. More sections here... */}

        {/* Last: Notebook Reflections */}
        <Grid item xs={12}>
          <NotebookReflections
            title="Product Reflections"
            reflections={{
              stickyNotes: [
                {
                  color: '#FFF9C4',
                  title: 'Key Learning',
                  content: 'What I learned from this project'
                }
              ],
              keyTakeaway: "Main lesson from this project"
            }}
          />
        </Grid>

      </Grid>
    </PageContainer>
  );
};

export default MyProjectPage;
```

## 2. Dashboard with DevOps Components

Already integrated in your Dashboard! Here's how to customize:

### ReleaseHealth.js - Update with Your Data

```javascript
const releaseMetrics = {
  daysSinceIncident: 42,           // Update with your actual uptime
  deploymentFrequency: '12/week',  // Your deploy frequency
  changeFailureRate: 3.2,          // Your failure rate %
  mttr: '< 1hr',                   // Mean time to recovery
  deploymentSuccessRate: 96.8,     // Success rate %
  currentSprint: {
    completed: 23,                 // Sprint tasks done
    total: 30,                     // Total sprint tasks
    velocity: 85                   // Velocity %
  }
};
```

### DevOpsQuirks.js - Personalize Your Quirks

```javascript
const quirkyMetrics = [
  {
    icon: IconBrandGit,
    label: 'Commits This Week',
    value: 47,              // Update weekly!
    maxValue: 50,
    color: '#5D87FF',
    subtitle: 'Keep shipping!'
  },
  // Add more metrics...
];

const funFacts = [
  { icon: IconRocket, text: 'Zero-downtime deployments: 42 days', color: '#13DEB9' },
  // Add your achievements...
];
```

### ProductDiscoveryPipeline.js - Update Your Projects

```javascript
const pipelineStages = [
  {
    id: 'ideation',
    name: 'Ideation',
    icon: IconBulb,
    color: '#FFAE1F',
    bgColor: '#FEF5E5',
    projects: [
      { name: 'Your Idea 1', status: 'active' },
      { name: 'Your Idea 2', status: 'active' }
    ]
  },
  // Update each stage with your actual projects...
];
```

## 3. Notebook Reflections - Quick Templates

### Template 1: Simple Learning Notes

```jsx
<NotebookReflections
  title="What I Learned"
  reflections={{
    stickyNotes: [
      {
        color: '#FFF9C4',
        title: 'User Research',
        content: 'Talk to 10+ users before building anything'
      },
      {
        color: '#C8E6C9',
        title: 'MVP Strategy',
        content: 'Ship the smallest thing that validates the hypothesis'
      }
    ],
    keyTakeaway: "Learning happens when you ship, not when you plan."
  }}
/>
```

### Template 2: Full Product Journey

```jsx
<NotebookReflections
  title="Product Journey Notes"
  reflections={{
    stickyNotes: [
      {
        color: '#FFF9C4',
        title: 'Problem Discovery',
        content: 'Users spending 3hrs/day on manual data entry',
        icon: IconSearch
      },
      {
        color: '#FFCCBC',
        title: 'Solution Hypothesis',
        content: 'Automation could save 80% of their time',
        icon: IconBulb
      },
      {
        color: '#C8E6C9',
        title: 'Validation',
        content: 'Prototype tested with 12 users - 100% said they\'d use it',
        icon: IconCheck
      },
      {
        color: '#BBDEFB',
        title: 'Launch Result',
        content: '500 signups in first week, 4.8/5 satisfaction',
        icon: IconRocket
      }
    ],

    sketches: [
      {
        title: 'Discovery Process',
        items: [
          'Interviewed 15 users across 3 segments',
          'Identified top 5 pain points',
          'Created 3 personas',
          'Mapped current workflows'
        ],
        diagram: ['Interview', 'Synthesize', 'Personas', 'Journey Map']
      }
    ],

    timeline: [
      {
        phase: 'Week 1-2: Research',
        items: [
          'User interviews',
          'Competitive analysis',
          'Market sizing'
        ]
      },
      {
        phase: 'Week 3-4: Prototype',
        items: [
          'Wireframes',
          'User testing',
          'Iterate'
        ]
      },
      {
        phase: 'Week 5-8: Build',
        items: [
          'MVP development',
          'Analytics setup',
          'Beta testing'
        ]
      },
      {
        phase: 'Week 9: Launch',
        items: [
          'Go-live',
          'Monitor metrics',
          'Gather feedback'
        ]
      }
    ],

    keyTakeaway: "The riskiest assumption is that you know what users want. Always validate early and often."
  }}
/>
```

## 4. MetricsCard - Standalone Usage

```jsx
import MetricsCard from '../../../components/shared/MetricsCard';
import { IconUsers } from '@tabler/icons-react';

<Grid container spacing={2}>
  <Grid item xs={12} md={3}>
    <MetricsCard
      icon={IconUsers}
      label="Active Users"
      value="10,234"
      color="#5D87FF"
      trend={{ direction: 'up', value: '15%' }}
      subtitle="vs last month"
      size="medium"
    />
  </Grid>
</Grid>
```

## 5. DeploymentBadge Usage

```jsx
import DeploymentBadge from '../../../components/shared/DeploymentBadge';

<DeploymentBadge
  status="deployed"
  environment="production"
  timestamp="2024-03-15T14:30:00Z"
/>
```

## 6. Complete Reloam-Style Page

```jsx
const ReloamStylePage = () => {
  return (
    <PageContainer title="My Project" description="Product case study">
      <Grid container spacing={3}>

        {/* Hero */}
        <Grid item xs={12}>
          <ProjectHeroSection
            name="Reloam"
            description="Agricultural property management platform"
            role="Product Owner & Lead Developer"
            timeline="Oct 2024 - Present"
            value="Solving $2B market gap"
            tags={['React', 'TypeScript', 'Supabase', 'Product Discovery']}
            showDeployment={true}
            deploymentStatus={{
              status: 'deployed',
              environment: 'beta',
              timestamp: '2024-12-01'
            }}
          />
        </Grid>

        {/* Metrics */}
        <Grid item xs={12}>
          <ProductMetricsSection
            title="Impact Metrics"
            metrics={[
              { icon: IconUsers, label: "Beta Users", value: "25", color: "#5D87FF" },
              { icon: IconClock, label: "Time Saved", value: "80%", color: "#13DEB9", trend: { direction: 'up', value: 'vs manual' } },
              { icon: IconTrendingUp, label: "Satisfaction", value: "4.8/5", color: "#9C27B0" }
            ]}
          />
        </Grid>

        {/* Problem & Solution */}
        <Grid item xs={12}>
          <DashboardCard title="Problem Statement">
            <Typography variant="body1">
              Agricultural landlords manage properties differently than residential,
              but all PropTech tools are built for residential. This creates a $2B
              market gap...
            </Typography>
          </DashboardCard>
        </Grid>

        {/* Reflections */}
        <Grid item xs={12}>
          <NotebookReflections
            title="Product Owner Lessons"
            reflections={{
              stickyNotes: [
                {
                  color: '#FFF9C4',
                  title: 'User Research Gap',
                  content: 'Built MVP with 1 interview. Should have done 10-15 first.',
                  icon: IconAlertTriangle
                },
                {
                  color: '#C8E6C9',
                  title: 'What Worked',
                  content: 'Prototyping saved 3 weeks of dev time',
                  icon: IconCheck
                }
              ],
              keyTakeaway: "Build products by learning, not just shipping. Validate early and often."
            }}
          />
        </Grid>

      </Grid>
    </PageContainer>
  );
};
```

## Icons Reference

Common icons from `@tabler/icons-react`:

```jsx
// Metrics & Analytics
IconChartBar, IconTrendingUp, IconTrendingDown, IconActivity

// Users & People
IconUsers, IconUser, IconUserCheck

// Product & Business
IconRocket, IconBulb, IconTarget, IconCheckbox

// Time & Progress
IconClock, IconCalendar, IconProgress

// Status
IconCheck, IconAlertTriangle, IconCircleCheck, IconX

// Development
IconCode, IconBrandGit, IconGitCommit, IconBug

// Discovery
IconSearch, IconCompass, IconMap

// Documents
IconFileText, IconNote, IconPencil
```

## Color Palette Reference

Use these consistently:

```javascript
// Primary Actions
const PRIMARY = '#5D87FF';
const SECONDARY = '#49BEFF';

// Status Colors
const SUCCESS = '#13DEB9';
const ERROR = '#FA896B';
const WARNING = '#FFAE1F';
const INFO = '#539BFF';

// Sticky Note Colors
const YELLOW = '#FFF9C4';
const ORANGE = '#FFCCBC';
const GREEN = '#C8E6C9';
const BLUE = '#BBDEFB';
const PINK = '#F8BBD0';
const PURPLE = '#D1C4E9';
```

---

**Need help?** Check [PROJECT_PAGE_TEMPLATE.md](PROJECT_PAGE_TEMPLATE.md) for full structure guide or [NOTEBOOK_REFLECTIONS_USAGE.md](NOTEBOOK_REFLECTIONS_USAGE.md) for detailed reflection examples.
