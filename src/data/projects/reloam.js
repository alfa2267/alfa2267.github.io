/**
 * Reloam - Agricultural Property Management Platform
 * Product Owner case study data
 */

export const reloamProjectData = {
  id: 'reloam',
  name: 'Reloam: PropTech for Agricultural Landlords',
  menuTitle: 'Reloam',
  slug: 'reloam',
  description: 'A digital platform empowering agricultural landlords across Africa to efficiently manage large-scale properties through tenant relationship management, financial operations, and activity tracking.',
  repo_url: null, // Private repository
  project_url: 'https://ld.reloam.ainaeco.uk/',
  tech_stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Product Management'],
  features: [
    'Tenant database and profile management',
    'Rent collection tracking',
    'Financial reporting and analytics',
    'Property activity logging',
    'Responsive web interface'
  ],
  category: 'product-management',
  status: 'mvp',
  role: 'Product Owner / Technical Lead',
  timeline: '2024',
  technology: 'React, TypeScript, Vite',
  screenshots: [],
  created_at: '2024-06-01T00:00:00Z',
  updated_at: '2024-12-15T00:00:00Z',
  icon: 'folder',
  featured: true,
  show_in_nav: true,
  
  // Case Study Content
  caseStudy: {
    problemDiscovery: {
      initialResearch: {
        interviewSubject: 'Nigerian agricultural landlord managing 63 hectares of farmland',
        quotes: [
          '"I spend 2 full days every month just tracking who paid rent and who didn\'t. It\'s all in notebooks and WhatsApp messages."',
          '"When a tenant has a maintenance issue, I don\'t know about it until weeks later. By then, it\'s affected their harvest."',
          '"I have no idea which plots are actually productive. I\'m flying blind on my own investment."',
          '"My accountant hates me because I show up with a shoebox of receipts and handwritten notes."'
        ],
        insight: 'This conversation revealed a significant gap: existing property management tools focus on residential/commercial real estate. Agricultural properties have unique needs that aren\'t being served.'
      },
      marketResearch: {
        platformsAnalyzed: 5,
        finding: 'None addressed agricultural property-specific needs',
        opportunity: 'Identified gap in emerging African PropTech market'
      }
    },
    
    problemStatement: {
      targetUser: 'Agricultural landlords in emerging markets managing 50+ hectares with multiple tenant farmers',
      painPoints: {
        tenantManagement: [
          'Contract tracking across 20+ tenants (paper-based, prone to loss)',
          'No centralized communication channel',
          'Payment tracking across different schedules and amounts',
          'Difficulty resolving disputes (no documented history)'
        ],
        financialVisibility: [
          'Manual rent collection tracking (error-prone)',
          'No real-time view of outstanding payments',
          'Difficult end-of-year accounting (shoebox of receipts)',
          'Can\'t quickly assess portfolio financial health'
        ],
        propertyOperations: [
          'No system for maintenance requests',
          'Can\'t track land utilization or productivity per plot',
          'No records of improvements or incidents',
          'Missing data for strategic decisions (which crops, which tenants)'
        ]
      },
      opportunity: 'Agricultural property management is distinct from residential/commercial. Features needed: crop cycle tracking, harvest yield monitoring, seasonal payment schedules, land productivity analytics, weather/soil condition logging.'
    },
    
    productVision: {
      visionStatement: 'Empower agricultural landlords across Africa to efficiently manage large-scale properties through a digital platform that combines tenant relationship management, financial operations, and activity tracking.',
      mvpScope: {
        mustHave: {
          items: [
            'Tenant database with profiles',
            'Rent payment tracking',
            'Basic financial reports',
            'Activity/incident logging',
            'Dashboard overview'
          ],
          rationale: 'These solve 80% of the pain (visibility into tenants and finances) with 20% of the features.'
        },
        shouldHave: {
          items: [
            'Mobile-responsive design',
            'Payment reminders/notifications',
            'Document storage (contracts, receipts)',
            'Tenant communication portal',
            'Advanced reporting'
          ],
          rationale: 'Enhance usability but not critical for core value proposition.'
        },
        couldHave: {
          items: [
            'Mobile app for tenants',
            'Integration with mobile money (M-Pesa, etc.)',
            'Crop cycle & harvest tracking',
            'Land productivity analytics',
            'Weather data integration'
          ],
          rationale: 'High value but require more research and infrastructure.'
        },
        wontHave: {
          items: [
            'Marketplace for tenant matching',
            'Insurance integration',
            'Supply chain management',
            'Multi-language support (English only for MVP)'
          ],
          rationale: 'Too complex for validation stage, unclear demand.'
        }
      }
    },
    
    requirements: {
      epics: [
        {
          id: 'EPIC-1',
          name: 'Tenant Management',
          description: 'Comprehensive system for managing tenant profiles, relationships, and information',
          userStories: [
            {
              id: 'RM-001',
              title: 'Tenant Profile Creation',
              as: 'landlord',
              want: 'to create detailed tenant profiles',
              so: 'I can maintain comprehensive records',
              acceptanceCriteria: [
                'Can add tenant name, contact info, plot number',
                'Can attach lease documents',
                'Can set rental terms and payment schedule',
                'System validates required fields',
                'Profile can be edited and updated'
              ],
              priority: 'P0',
              effort: '3 points'
            },
            {
              id: 'RM-002',
              title: 'Tenant Dashboard',
              as: 'landlord',
              want: 'to see all my tenants at a glance',
              so: 'I can quickly assess my portfolio',
              acceptanceCriteria: [
                'Dashboard shows total tenant count',
                'Shows payment status (current, late, upcoming)',
                'Filterable by plot, payment status',
                'Searchable by name',
                'Quick actions for common tasks'
              ],
              priority: 'P0',
              effort: '5 points'
            },
            {
              id: 'RM-003',
              title: 'Tenant List View',
              as: 'landlord',
              want: 'to view and manage all tenants in a list',
              so: 'I can efficiently navigate my tenant base',
              acceptanceCriteria: [
                'Sortable columns (name, plot, status, rent)',
                'Pagination for large lists',
                'Bulk actions available',
                'Export functionality'
              ],
              priority: 'P1',
              effort: '5 points'
            }
          ]
        },
        {
          id: 'EPIC-2',
          name: 'Financial Operations',
          description: 'Track rent collection, payments, and financial reporting',
          userStories: [
            {
              id: 'RM-004',
              title: 'Rent Collection Tracking',
              as: 'landlord',
              want: 'to track rent payments from tenants',
              so: 'I can monitor my revenue and identify late payments',
              acceptanceCriteria: [
                'Record payment date and amount',
                'Mark payments as received',
                'Track payment status (paid, pending, late)',
                'Payment history per tenant',
                'Reminders for upcoming payments'
              ],
              priority: 'P0',
              effort: '5 points'
            },
            {
              id: 'RM-005',
              title: 'Financial Reporting',
              as: 'landlord',
              want: 'to view financial summaries and reports',
              so: 'I can understand my property revenue',
              acceptanceCriteria: [
                'Monthly revenue summary',
                'Year-to-date totals',
                'Payment status breakdown',
                'Export to CSV/PDF',
                'Visual charts and graphs'
              ],
              priority: 'P1',
              effort: '8 points'
            },
            {
              id: 'RM-006',
              title: 'Payment Reminders',
              as: 'landlord',
              want: 'to send reminders for upcoming or late payments',
              so: 'I can improve collection rates',
              acceptanceCriteria: [
                'Automated reminders for upcoming payments',
                'Manual reminder sending',
                'Email/SMS notification options',
                'Reminder history tracking'
              ],
              priority: 'P1',
              effort: '5 points'
            }
          ]
        },
        {
          id: 'EPIC-3',
          name: 'Activity Tracking & Reporting',
          description: 'Log and track property activities and events',
          userStories: [
            {
              id: 'RM-007',
              title: 'Activity Logging',
              as: 'landlord',
              want: 'to log property activities and events',
              so: 'I can maintain a record of property happenings',
              acceptanceCriteria: [
                'Create activity entries with date, type, description',
                'Associate activities with specific plots/tenants',
                'Attach photos or documents',
                'Search and filter activities',
                'Activity timeline view'
              ],
              priority: 'P1',
              effort: '5 points'
            },
            {
              id: 'RM-008',
              title: 'Property Overview',
              as: 'landlord',
              want: 'to see an overview of all my properties',
              so: 'I can understand my portfolio at a glance',
              acceptanceCriteria: [
                'Total property area',
                'Number of plots and tenants',
                'Occupancy rate',
                'Revenue summary',
                'Recent activities'
              ],
              priority: 'P1',
              effort: '5 points'
            }
          ]
        }
      ]
    },
    
    productDecisions: [
      {
        decision: 'Web-First vs. Mobile-First',
        date: 'August 2024',
        context: 'Agricultural landlords in Nigeria primarily manage their properties from home/office with stable internet. Tenant farmers might prefer mobile, but the primary user (landlord) needs desktop capabilities for data entry and reporting.',
        options: {
          A: 'Web-first: Desktop-optimized interface, mobile-responsive later',
          B: 'Mobile-first: Native app with limited web access',
          C: 'Progressive Web App: Hybrid approach'
        },
        choice: 'A - Web-first MVP',
        rationale: [
          'Landlords spend 80% of management time at desk',
          'Complex data entry better on keyboard',
          'Financial reporting requires larger screen',
          'Faster MVP delivery (one codebase)'
        ],
        tradeoffs: {
          benefit: 'Faster time to market, better for primary use case',
          cost: 'Less convenient for field work, tenant access delayed'
        },
        validationPlan: 'Test with 5 landlords. If >50% request mobile urgently, reprioritize.'
      },
      {
        decision: 'Manual vs. Automated Payment Collection',
        date: 'August 2024',
        context: 'Nigerian payment landscape is fragmented (bank transfers, mobile money, cash). Integration with payment processors adds significant complexity and regulatory requirements.',
        options: {
          A: 'Full integration with Paystack/Flutterwave',
          B: 'Manual entry with payment tracking',
          C: 'Hybrid: Track + optional payment link'
        },
        choice: 'B - Manual tracking only',
        rationale: [
          'Validates core value proposition (visibility) without payments',
          'Avoids complex integrations and compliance',
          'Landlords already have payment processes (just need tracking)',
          'Can add later once validated'
        ],
        tradeoffs: {
          benefit: 'Simpler MVP, faster build, lower risk',
          cost: 'Not end-to-end automation, still some manual work'
        },
        validationPlan: 'If users say "this would be perfect with payment integration," we validate demand before building.'
      },
      {
        decision: 'Single-Tenant vs. Multi-Tenant Architecture',
        date: 'August 2024',
        context: 'Multi-tenant SaaS allows multiple landlords on one instance (scalable). Single-tenant means each landlord gets their own database (simpler but less scalable).',
        options: {
          A: 'Multi-tenant: Shared database, tenant isolation by ID',
          B: 'Single-tenant: Separate database per landlord',
          C: 'Hybrid: Single for MVP, migrate later'
        },
        choice: 'B - Single-tenant',
        rationale: [
          'Simpler data model (no tenant ID in every query)',
          'Easier data security (complete isolation)',
          'Faster development (less complexity)',
          'Appropriate for validation stage (<10 users)'
        ],
        tradeoffs: {
          benefit: 'Faster MVP, simpler to reason about, better security',
          cost: 'Harder to scale later, higher hosting costs per user'
        },
        validationPlan: 'If we get 10+ landlords interested, refactor to multi-tenant before growth phase.'
      }
    ],
    
    designProcess: {
      principles: [
        'Simplicity over complexity - focus on core workflows',
        'Mobile-responsive design for future mobile app',
        'Accessibility considerations for diverse user base',
        'Clear visual hierarchy and information architecture',
        'Consistent design system using Tailwind CSS'
      ],
      userFlows: [
        'Tenant onboarding flow',
        'Rent payment recording flow',
        'Activity logging flow',
        'Financial reporting flow'
      ]
    },
    
    technicalImplementation: {
      technologyChoices: {
        frontend: {
          stack: ['React', 'TypeScript', 'Vite'],
          rationale: 'Fast development, type safety, modern tooling'
        },
        styling: {
          stack: ['Tailwind CSS'],
          rationale: 'Rapid prototyping, consistent design system'
        },
        stateManagement: {
          stack: ['React Context/Hooks'],
          rationale: 'Sufficient for MVP complexity'
        },
        dataPersistence: {
          stack: ['LocalStorage'],
          rationale: 'No backend needed for MVP, fast iteration'
        }
      },
      architectureDecisions: [
        'Component-based architecture for reusability',
        'TypeScript for type safety and better developer experience',
        'Modular component structure for maintainability',
        'Error boundaries for graceful error handling',
        'Responsive design from the start'
      ]
    },
    
    features: {
      dashboard: {
        title: 'Dashboard Overview',
        description: 'Comprehensive view of all tenants and properties at a glance',
        highlights: [
          'Total tenant count and occupancy rate',
          'Payment status summary (current, late, upcoming)',
          'Recent activities and updates',
          'Quick access to key functions'
        ]
      },
      tenantManagement: {
        title: 'Tenant Management',
        description: 'Create, view, and manage tenant profiles with comprehensive information',
        highlights: [
          'Detailed tenant profiles with contact information',
          'Plot assignment and tracking',
          'Lease document attachments',
          'Rental terms and payment schedules'
        ]
      },
      financialTracking: {
        title: 'Financial Tracking',
        description: 'Track rent collection and payment history',
        highlights: [
          'Record and track rent payments',
          'Payment status indicators',
          'Payment history per tenant',
          'Upcoming payment reminders'
        ]
      },
      activityLog: {
        title: 'Activity Log',
        description: 'Record and track property activities',
        highlights: [
          'Log activities with date and description',
          'Associate activities with plots/tenants',
          'Search and filter activities',
          'Activity timeline view'
        ]
      },
      reports: {
        title: 'Reports',
        description: 'Financial summaries and insights',
        highlights: [
          'Monthly and annual revenue summaries',
          'Payment status breakdowns',
          'Tenant occupancy metrics',
          'Export capabilities'
        ]
      }
    },
    
    validation: {
      currentStatus: [
        'MVP built and deployed',
        'Functional prototype demonstrating core concepts',
        'Ready for user testing'
      ],
      plannedValidation: [
        'Beta testing with 5-10 agricultural landlords',
        'Gather feedback on core workflows',
        'Measure time saved vs. manual processes',
        'Validate pricing model',
        'Assess market fit and demand'
      ],
      nextSteps: [
        'Implement user feedback from beta testing',
        'Add mobile-responsive design enhancements',
        'Integrate payment processing (if validated)',
        'Build advanced reporting dashboards',
        'Consider multi-tenant architecture for scale',
        'Explore additional features based on user needs'
      ]
    },
    
    lessonsLearned: {
      whatILearned: [
        {
          title: 'User Research is Non-Negotiable',
          mistake: 'Built MVP with 1 user interview',
          lesson: 'Should have interviewed 10-15 landlords before writing code',
          impact: 'Risk of building features users don\'t need',
          goingForward: [
            'Always do 10+ user interviews for problem discovery',
            'Create personas based on patterns across users',
            'Validate assumptions with prototypes before development'
          ]
        },
        {
          title: 'MVPs Should Be Even Simpler',
          mistake: 'Built more features than needed for validation',
          lesson: 'Could have started with just tenant tracking + payment logging',
          impact: 'Took longer to get feedback, harder to pivot if needed',
          goingForward: [
            'Ask "What\'s the MINIMUM to test the hypothesis?"',
            'Ship fastest path to user validation',
            'Add features only after users confirm value'
          ]
        },
        {
          title: 'Define Success Metrics Upfront',
          mistake: 'Built product without clear validation criteria',
          lesson: 'How do I know if this is succeeding? What are we measuring?',
          impact: 'Hard to objectively assess product-market fit',
          goingForward: [
            'Define success metrics before building (e.g., "5 landlords use it weekly for 3 months")',
            'Build analytics into MVP from day 1',
            'Set decision criteria (what results = continue, pivot, or kill)'
          ]
        },
        {
          title: 'Start with Prototypes, Not Code',
          mistake: 'Jumped straight to coding',
          lesson: 'Clickable prototypes faster, cheaper, easier to change',
          impact: 'Over-invested before validating UX with users',
          goingForward: [
            'Start with sketches → wireframes → clickable prototypes',
            'Get user feedback at each stage',
            'Only code once validated'
          ]
        }
      ],
      whatWouldDoDifferently: {
        timeline: [
          {
            week: 'Week 1-2',
            activity: 'Deep User Research',
            tasks: [
              'Interview 15 agricultural landlords',
              'Shadow them for a day to see actual workflows',
              'Document pain points, not solutions',
              'Create 2-3 personas'
            ]
          },
          {
            week: 'Week 3',
            activity: 'Solution Ideation',
            tasks: [
              'Workshop with potential users',
              'Sketch multiple solution approaches',
              'Get feedback on concepts'
            ]
          },
          {
            week: 'Week 4-5',
            activity: 'Prototyping',
            tasks: [
              'Figma clickable prototype',
              'Test with 5 landlords',
              'Iterate based on feedback',
              'Define MVP scope based on validated needs'
            ]
          },
          {
            week: 'Week 6-10',
            activity: 'Build MVP',
            tasks: [
              'Only features validated in prototypes',
              'Build in analytics/feedback mechanism',
              'Define clear success metrics'
            ]
          },
          {
            week: 'Week 11-12',
            activity: 'Beta Testing',
            tasks: [
              '5-10 landlords use for real work',
              'Weekly check-ins',
              'Measure: adoption, retention, satisfaction',
              'Decide: continue, pivot, or kill'
            ]
          }
        ]
      },
      skillsDemonstrated: [
        {
          skill: 'Problem Discovery',
          description: 'Identified user pain points through interviews, recognized market gap (agricultural vs residential PropTech)'
        },
        {
          skill: 'Product Strategy',
          description: 'Defined product vision aligned with user needs, created phased roadmap (MVP → Growth → Scale)'
        },
        {
          skill: 'Requirements Management',
          description: 'Translated pain points into user stories, prioritized features using 80/20 principle'
        },
        {
          skill: 'Product Decision-Making',
          description: 'Made strategic trade-offs (web vs mobile, manual vs automated), documented rationale for key decisions'
        },
        {
          skill: 'Cross-Functional Collaboration',
          description: 'Worked with software engineer to build MVP, balanced product vision with technical constraints'
        },
        {
          skill: 'Technical Fluency',
          description: 'Contributed to codebase (React/TypeScript), made architecture decisions (single vs multi-tenant), comfortable discussing technical trade-offs'
        },
        {
          skill: 'Self-Awareness & Growth',
          description: 'Honest reflection on what could be improved, applied lessons to future product thinking'
        }
      ]
    },
    
    artifacts: [
      {
        type: 'demo',
        title: 'Live Demo - Landlord Portal',
        description: 'Functional MVP deployed and accessible',
        url: 'https://ld.reloam.ainaeco.uk/',
        preview: 'Interactive prototype demonstrating core tenant management and financial tracking features'
      },
      {
        type: 'demo',
        title: 'Live Demo - Tenant Portal',
        description: 'Tenant-facing portal for property management',
        url: 'https://tn.reloam.ainaeco.uk/',
        preview: 'Tenant interface for viewing property information and making payments'
      },
      {
        type: 'repository',
        title: 'Reloam Landing Repository',
        description: 'Source code and screenshots repository',
        url: 'https://github.com/alfa2267/reloam-landing',
        preview: 'Contains UI mockups, screenshots, and landing page assets'
      },
      {
        type: 'document',
        title: 'Requirements Document',
        description: 'Comprehensive requirements documentation with user stories',
        url: null
      },
      {
        type: 'diagram',
        title: 'Product Roadmap',
        description: 'Visual roadmap showing MVP and future phases',
        url: null
      },
      {
        type: 'document',
        title: 'Decision Log',
        description: 'Documentation of key product decisions and rationale',
        url: null
      }
    ]
  }
};

