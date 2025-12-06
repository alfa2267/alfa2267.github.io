# Case Study README Template

This template shows how to structure your project README to include comprehensive case study data that will automatically populate the portfolio project pages with all sections including the table of contents.

## Basic Project Metadata

Add this to your README file:

```yaml
<!-- PROJECT-META-START -->
project:
  name: "Your Project Name"
  slug: "project-slug"
  description: "Brief description of your project"
  status: "active"  # active, mvp, completed, archived
  category: "product-management"  # Used for categorization
  tech_stack: ["React", "TypeScript", "Node.js"]
  demo_url: "https://your-demo.com"
  repo_url: "https://github.com/username/repo"
  priority: 1
  show_in_nav: true
  icon: "dashboard"
  metrics:
    business_value: 350
    complexity: 250
    time_spent: 200
    fun_rating: 450
  features:
    - "Feature 1"
    - "Feature 2"
  created_date: "2025-08-15"
  updated_date: "2025-08-15"
  tags: ["tag1", "tag2"]
  
  # Case Study Data - Add this section for full case study pages
  caseStudy:
    # Problem Discovery & Solution
    problemDiscovery:
      initialResearch:
        interviewSubject: "Description of primary user interviewed"
        quotes:
          - "User quote 1"
          - "User quote 2"
        insight: "Key insight from research"
      marketResearch:
        platformsAnalyzed: 5
        finding: "What you found"
        opportunity: "Market opportunity identified"
      problemStatement:
        targetUser: "Description of target user"
        painPoints:
          tenantManagement:
            - "Pain point 1"
            - "Pain point 2"
          financialVisibility:
            - "Pain point 1"
        opportunity: "Opportunity description"
      solutionOverview:
        description: "How you're solving the problem"
        approach:
          - "Approach 1"
          - "Approach 2"
        keyFeatures:
          - "Feature 1"
          - "Feature 2"
        valueProposition: "Value proposition statement"
      successCriteria:
        - { value: "40%", label: "Improvement" }
        - { value: "10K", label: "Users Helped" }
    
    # Business Case & ROI
    businessCase:
      investment:
        development:
          total: 50000
          breakdown:
            mvpDevelopment: 30000
            designAndUX: 10000
            infrastructure: 5000
            testing: 5000
        infrastructure:
          total: 5000
        marketing:
          total: 10000
        contingency: 10000
        total: 75000
      projectedReturns:
        threeYear:
          year1:
            revenueIncrease: 20000
            costSavings: 10000
            netBenefit: 30000
          year2:
            revenueIncrease: 80000
            costSavings: 20000
            netBenefit: 100000
          year3:
            revenueIncrease: 200000
            costSavings: 50000
            netBenefit: 250000
          totalBenefit: 380000
          totalInvestment: 75000
          totalROI: 407
          breakEvenMonth: 24
      assumptions:
        - "Assumption 1"
        - "Assumption 2"
      risks:
        - risk: "Risk description"
          probability: "Medium"
          impact: "High"
          mitigation: "Mitigation strategy"
    swot:
      strengths:
        - "Strength 1"
      weaknesses:
        - "Weakness 1"
      opportunities:
        - "Opportunity 1"
      threats:
        - "Threat 1"
    
    # Product Vision & MVP Strategy
    productVision:
      visionStatement: "Your product vision statement"
      mvpScope:
        mustHave:
          items:
            - "Must have feature 1"
            - "Must have feature 2"
          rationale: "Why these are must-haves"
        shouldHave:
          items:
            - "Should have feature 1"
          rationale: "Why these are should-haves"
        couldHave:
          items:
            - "Could have feature 1"
          rationale: "Why these are could-haves"
        wontHave:
          items:
            - "Won't have feature 1"
          rationale: "Why these are out of scope"
      strategicObjectives:
        shortTerm:
          - "Short term objective 1"
        midTerm:
          - "Mid term objective 1"
        longTerm:
          - "Long term objective 1"
    
    # Product Decisions & Trade-offs
    productDecisions:
      - decision: "Decision title"
        date: "October 2024"
        context: "Context of the decision"
        options:
          A: "Option A description"
          B: "Option B description"
        choice: "B - Option B"
        rationale:
          - "Reason 1"
          - "Reason 2"
        tradeoffs:
          benefit: "Benefits of choice"
          cost: "Costs/tradeoffs"
        validationPlan: "How to validate this decision"
    
    # User Research & Insights
    userResearch:
      interviews:
        operationsStaff: 15
        customerService: 8
        management: 5
        customerSurveys: 50
      keyInsights:
        - "Insight 1"
        - "Insight 2"
      painPoints:
        - "Pain point 1"
        - "Pain point 2"
      personas:
        - name: "Persona Name"
          role: "Role"
          occupation: "Occupation"
          age: "42"
          location: "Location"
          techExposure: "High"
          devices: "Device list"
          quote: "Persona quote"
          about: "About the persona"
          behaviors:
            - "Behavior 1"
          goals:
            - "Goal 1"
          painPoints:
            - "Pain point 1"
    
    # Design Process
    designProcess:
      principles:
        - "Principle 1"
        - "Principle 2"
      userFlows:
        - "User flow 1"
        - "User flow 2"
    
    # Product Roadmap
    roadmap:
      - phase: "Phase 1"
        title: "Phase Title"
        duration: "3 months"
        deliverables:
          - "Deliverable 1"
        keyMetrics:
          - "Metric 1"
    
    # Requirements & User Stories
    requirements:
      epics:
        - id: "EPIC-1"
          name: "Epic Name"
          description: "Epic description"
          userStories:
            - id: "US-001"
              title: "User Story Title"
              as: "user"
              want: "what they want"
              so: "why they want it"
              acceptanceCriteria:
                - "Criterion 1"
              priority: "P0"
              effort: "3 points"
    
    # Technical Architecture
    technicalArchitecture:
      overview: "Architecture overview description"
      technologyStack:
        frontend:
          - "React"
          - "TypeScript"
        backend:
          - "Node.js"
        database:
          - "PostgreSQL"
      keyDecisions:
        - "Decision 1"
        - "Decision 2"
    
    # Sprint Metrics & Velocity
    sprintMetrics:
      currentSprint:
        name: "Sprint 1"
        goal: "Sprint goal"
        duration: "2 weeks"
        capacity: 40
        committed: 35
        completed: 32
      velocityHistory:
        - name: "Sprint 1"
          committed: 35
          completed: 32
        - name: "Sprint 2"
          committed: 40
          completed: 38
      sprintGoal: "Overall sprint goal"
      userStories: []
      burnDownData: []
    
    # QA & Testing Strategy
    qaTesting:
      testScenarios:
        - scenario: "Test scenario"
          status: "passed"
      acceptanceCriteria: []
      bugTracking:
        total: 5
        resolved: 4
        open: 1
      qualityMetrics:
        testCoverage: 85
        defectRate: 2.5
    
    # Process & Compliance
    devOpsSecurity:
      cicdPipeline:
        tools: ["GitHub Actions", "Docker"]
        stages: ["Build", "Test", "Deploy"]
      securityScans:
        - type: "Dependency Scan"
          status: "passed"
      codeQuality:
        tools: ["ESLint", "Prettier"]
        standards: "ES6+"
    
    # Retrospective
    lessonsLearned:
      whatILearned:
        - title: "Lesson Title"
          mistake: "What went wrong"
          lesson: "What you learned"
          impact: "Impact of the mistake"
          goingForward:
            - "Action 1"
            - "Action 2"
      whatWouldDoDifferently:
        timeline:
          - week: "Week 1-2"
            activity: "Activity name"
            tasks:
              - "Task 1"
<!-- PROJECT-META-END -->
```

## Notes

- All sections are optional - the table of contents will only show sections that have data
- The structure matches AirOps and Reloam case studies
- You can start with just the basic metadata and add case study sections gradually
- The portfolio will automatically parse this and create a full case study page with table of contents

