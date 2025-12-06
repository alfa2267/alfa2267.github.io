# Project Page Template

This document outlines the standardized structure for all project pages in the portfolio. Following this template ensures consistency and showcases your product management thinking.

## Recommended Page Structure

### 1. Hero Section
**Component:** `ProjectHeroSection`

Displays:
- Project name and tagline/description
- Your role
- Timeline
- Business value/impact
- Deployment status (optional)
- Technology tags

```jsx
<ProjectHeroSection
  name="Project Name"
  description="Brief project description"
  role="Product Manager | Release Manager"
  timeline="Jan 2024 - Mar 2024"
  value="$2.9M Investment, 285% ROI"
  tags={['React', 'Node.js', 'AWS']}
  showDeployment={true}
  deploymentStatus={{
    status: 'deployed',
    environment: 'production',
    timestamp: '2024-03-15'
  }}
/>
```

### 2. Key Metrics (Optional but Recommended)
**Component:** `ProductMetricsSection`

Display 3-4 key metrics that showcase impact:

```jsx
<ProductMetricsSection
  title="Key Metrics"
  metrics={[
    { icon: IconFileText, label: "Strategy Document", value: "194 pages", color: "#1976d2" },
    { icon: IconUsers, label: "Stakeholder Interviews", value: "78+", color: "#2e7d32" },
    { icon: IconTrendingUp, label: "Projected ROI", value: "285%", color: "#ed6c02", trend: { direction: 'up', value: '+185%' } },
    { icon: IconRocket, label: "Break-even", value: "Month 18", color: "#9c27b0" }
  ]}
/>
```

### 3. Design Process
**Component:** `DesignProcessSection`

Follow the product design process phases:
- Research & Discovery
- Define & Ideate
- Design & Prototype
- Test & Validate
- Implement & Launch

```jsx
<DesignProcessSection
  title="Design Process"
  designProcess={designProcessData}
/>
```

### 4. Problem Discovery & Solution
**Component:** `ProblemDiscoverySection`

Essential for showing product thinking - include on EVERY project page!

```jsx
<ProblemDiscoverySection
  title="Problem Discovery & Solution"
  problemStatement={{
    description: "Brief problem description",
    challenges: [
      'Challenge 1',
      'Challenge 2',
      'Challenge 3'
    ],
    impact: [
      'Impact on users',
      'Impact on business'
    ],
    userPainPoints: [
      'Pain point 1',
      'Pain point 2'
    ]
  }}
  solutionOverview={{
    description: "How we're solving the problem",
    approach: [
      'Approach element 1',
      'Approach element 2'
    ],
    keyFeatures: ['Feature 1', 'Feature 2'],
    valueProposition: "The unique value we deliver"
  }}
  successCriteria={[
    { value: '40%', label: 'Cost Reduction' },
    { value: '60%', label: 'User Satisfaction' }
  ]}
/>
```

Structure:
- **Problem Statement**: What challenge are you solving?
- **Impact**: Who is affected and how?
- **Solution Overview**: Your proposed solution
- **Success Criteria**: How you'll measure success

### 5. User Research & Insights
**Component:** `DashboardCard` with structured data

Include:
- Number of interviews/surveys
- Key insights discovered
- User personas
- Pain points identified

### 6. Product Vision & Strategy
**Component:** `DashboardCard`

Elements:
- Vision statement
- Strategic objectives (short/mid/long-term)
- Success metrics & KPIs
- Target outcomes

### 7. Product Roadmap
**Component:** `RoadmapSection`

Display:
- Phase-by-phase implementation plan
- Timeline view
- Detailed breakdown of deliverables per phase

```jsx
<RoadmapSection
  title="Product Roadmap"
  phases={roadmapData}
  showTimeline={true}
  showDetailedBreakdown={true}
/>
```

### 8. Requirements Documentation
**Component:** `RequirementsSection` or custom accordions

Structure:
- Epics
- User stories (As a... I want... So that...)
- Acceptance criteria
- Priority & effort estimates

### 9. Technical Architecture
**Component:** `TechnicalArchitectureSection`

Shows your DevOps/technical background - critical for PM credibility!

```jsx
<TechnicalArchitectureSection
  title="Technical Architecture"
  overview="Brief description of architectural approach"
  architecture={{
    title: "System Architecture Overview",
    components: [
      { name: 'Web App', type: 'client', layer: 'client', color: '#1976d2' },
      { name: 'API Gateway', type: 'gateway', layer: 'gateway', color: '#2e7d32' },
      { name: 'Database', type: 'database', layer: 'database', color: '#9c27b0' }
    ]
  }}
  technologyStack={{
    frontend: ['React', 'TypeScript', 'Material-UI'],
    backend: ['Node.js', 'Express', 'PostgreSQL'],
    infrastructure: ['AWS', 'Docker', 'Kubernetes']
  }}
  keyDecisions={[
    'Microservices architecture for scalability',
    'API-first design for future integrations',
    'Cloud-native infrastructure for flexibility'
  ]}
/>
```

Include:
- System architecture diagram
- Technology stack breakdown by category
- Key architectural decisions with rationale
- Integration points

### 10. Business Case & ROI
**Component:** `DashboardCard` + `BusinessCaseInfographic`

Elements:
- Investment breakdown
- Projected returns (3-year view)
- ROI calculation
- Break-even analysis
- Cost-benefit comparison

### 11. Risk Assessment & Go-to-Market
**Component:** `DashboardCard`

Cover:
- Launch phases (Pilot → Beta → GA)
- Risk identification & mitigation
- Communication plan
- Training strategy

### 12. Project Showcase
**Component:** `ProjectShowcaseSection`

Display:
- Repository information
- Demo screenshots
- Wireframes/mockups
- Live demo link

```jsx
<ProjectShowcaseSection
  repository={githubData}
  demoImage={demoImageUrl}
  screenshots={screenshotUrls}
  wireframes={wireframeUrls}
  showRepository={true}
  showDemoImage={true}
  showScreenshots={true}
/>
```

### 13. Lessons Learned
**Component:** `LessonsLearnedSection`

Reflect on:
- What you learned
- What you'd do differently
- Key takeaways for future projects

```jsx
<LessonsLearnedSection
  title="Lessons Learned & Reflections"
  whatILearned={insights}
  whatWouldDoDifferently={{ items: improvements }}
  keyTakeaways={takeaways}
/>
```

## Color-Coding Convention

Use consistent colors for different section types:

- **Problem/Challenges**: Red/Error colors (`#FA896B`)
- **Solution/Success**: Green/Success colors (`#13DEB9`)
- **Technical/Process**: Blue/Primary colors (`#5D87FF`)
- **Metrics/Analytics**: Orange/Warning colors (`#FFAE1F`)
- **Strategy/Vision**: Purple colors (`#9C27B0`)

## Grid Layout Pattern

Use consistent spacing:
```jsx
<Grid container spacing={3}>
  <Grid item xs={12}>
    {/* Full width sections */}
  </Grid>
  <Grid item xs={12} md={6}>
    {/* Two-column sections */}
  </Grid>
  <Grid item xs={12} md={4}>
    {/* Three-column sections */}
  </Grid>
  <Grid item xs={6} md={3}>
    {/* Four-column sections (metrics) */}
  </Grid>
</Grid>
```

## Tips for Showcasing PM Transition

1. **Lead with Business Impact**: Start with metrics, ROI, and user value
2. **Show Product Thinking**: Include discovery, research, and validation
3. **Demonstrate Data Skills**: Use charts, infographics, and analytics
4. **Highlight Stakeholder Management**: Show interviews, alignment work
5. **DevOps Context**: Reference CI/CD, release management, deployment strategies
6. **Product Discovery**: Document the "why" before the "how"
7. **User-Centered**: Always tie technical decisions back to user needs

## Example Import Block

```jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Chip, List, ListItem,
  ListItemIcon, ListItemText, Divider, Paper, Stack
} from '@mui/material';
import {
  IconRocket, IconUsers, IconTrendingUp, IconFileText,
  IconCheck, IconAlertTriangle
} from '@tabler/icons-react';

import PageContainer from '../../../components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';
import MetricsCard from '../../../components/shared/MetricsCard';
import {
  ProjectHeroSection,
  ProductMetricsSection,
  DesignProcessSection,
  RoadmapSection,
  ProjectShowcaseSection,
  LessonsLearnedSection
} from '../../../components/sections';
```
