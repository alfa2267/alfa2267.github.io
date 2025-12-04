/**
 * AirOps - Digital Transformation for African Aviation
 * Comprehensive Product Owner case study data
 */

export const airopsProjectData = {
  id: 'airops',
  name: 'AirOps: Digital Transformation Strategy for Air Peace Airline',
  slug: 'airops',
  description: 'A comprehensive $2.9M digital transformation initiative to modernize Nigerian aviation operations through integrated booking, operations, and customer service platforms.',
  repo_url: null, // Private repository
  project_url: null,
  tech_stack: ['Strategic Planning', 'Product Management', 'Digital Transformation', 'Business Analysis', 'Stakeholder Management'],
  features: [
    'Comprehensive 194-page strategic document',
    'Multi-phase implementation roadmap',
    'ROI analysis and business case',
    'User research and stakeholder interviews',
    'Technical architecture design',
    'Risk assessment and mitigation strategies'
  ],
  category: 'product-management',
  status: 'proposal',
  role: 'Product Manager / Release Manager',
  timeline: '2024',
  value: '$2.9M Digital Transformation Initiative',
  screenshots: [],
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-12-15T00:00:00Z',
  icon: 'folder',
  featured: true,
  show_in_nav: true,
  
  // Case Study Content
  caseStudy: {
    executiveSummary: {
      problemStatement: {
        challenges: [
          'Fragmented legacy systems across booking, operations, and customer service',
          'Manual processes causing operational delays and errors',
          'Poor digital customer experience (booking, check-in, support)',
          'Limited data analytics for strategic decision-making',
          'No unified platform for stakeholder visibility'
        ],
        impact: [
          'Lost revenue from booking abandonment',
          'Operational inefficiencies costing millions annually',
          'Customer dissatisfaction leading to brand erosion',
          'Inability to compete with international carriers'
        ]
      },
      solutionOverview: {
        description: 'AirOps is an integrated digital platform that modernizes every customer and operational touchpoint',
        components: [
          'Digital Booking Engine: Seamless flight search, booking, and payment',
          'Operations Management: Real-time flight ops, crew scheduling, maintenance tracking',
          'Customer Service Portal: Unified support across channels (web, mobile, call center)',
          'Analytics Dashboard: Business intelligence for data-driven decisions',
          'Mobile Experience: Customer app for booking, check-in, status updates'
        ],
        technologyApproach: [
          'Cloud-native architecture for scalability',
          'API-first design for system integration',
          'Mobile-responsive web + native apps',
          'Real-time data synchronization',
          'Enterprise-grade security & compliance'
        ]
      },
      businessImpact: {
        costReduction: '40% reduction in operational costs',
        customerSatisfaction: '60% improvement in customer satisfaction scores',
        conversionRate: '25% increase in booking conversion rates',
        visibility: 'Real-time operational visibility for leadership'
      }
    },
    
    productVision: {
      visionStatement: 'Transform Air Peace into Africa\'s most digitally advanced airline, delivering seamless customer experiences while optimizing operational efficiency through integrated technology solutions.',
      strategicObjectives: {
        shortTerm: [
          'Establish foundation for digital booking platform',
          'Improve customer booking experience',
          'Reduce manual processes by 30%'
        ],
        midTerm: [
          'Integrate operations management systems',
          'Launch mobile application',
          'Implement real-time analytics dashboard'
        ],
        longTerm: [
          'Achieve full digital transformation',
          'Become market leader in digital innovation',
          'Expand to additional African markets'
        ]
      },
      successMetrics: [
        'Customer satisfaction score > 85%',
        'Booking conversion rate > 30%',
        'Operational cost reduction > 40%',
        'System uptime > 99.5%',
        'Mobile app adoption > 60% of customers'
      ],
      targetSegments: [
        'Business travelers (40% of revenue)',
        'Leisure travelers (35% of revenue)',
        'Corporate accounts (20% of revenue)',
        'International travelers (5% of revenue)'
      ]
    },
    
    userResearch: {
      interviews: {
        operationsStaff: 15,
        customerService: 8,
        management: 5,
        customerSurveys: 50
      },
      keyInsights: [
        'Operations staff spend 40% of time on manual data entry',
        'Customer service representatives lack real-time access to booking information',
        'Customers frustrated with long check-in queues and booking process',
        'Management lacks visibility into operational performance metrics',
        'Legacy systems create data silos preventing integrated decision-making'
      ],
      painPoints: [
        'Fragmented systems require multiple logins and manual data transfer',
        'No single source of truth for customer information',
        'Limited mobile capabilities for on-the-go operations',
        'Inability to track and analyze customer journey',
        'Poor integration between booking and operations systems'
      ],
      personas: [
        {
          name: 'Airline Operations Manager',
          role: 'Oversee daily flight operations',
          goals: ['Real-time visibility into flight status', 'Efficient crew and resource management', 'Quick resolution of operational issues'],
          painPoints: ['Manual coordination between systems', 'Delayed information updates', 'Limited reporting capabilities']
        },
        {
          name: 'Customer Service Representative',
          role: 'Handle customer inquiries and support',
          goals: ['Quick access to customer booking information', 'Ability to resolve issues in real-time', 'Clear communication with operations'],
          painPoints: ['Multiple systems to check', 'Outdated customer information', 'Limited self-service options for customers']
        },
        {
          name: 'Frequent Business Traveler',
          role: 'Regular airline customer',
          goals: ['Quick and easy booking process', 'Mobile check-in and boarding passes', 'Real-time flight updates'],
          painPoints: ['Complex booking process', 'Long check-in queues', 'Limited mobile functionality']
        },
        {
          name: 'Leisure Traveler',
          role: 'Occasional airline customer',
          goals: ['Simple booking experience', 'Clear pricing information', 'Easy access to travel information'],
          painPoints: ['Confusing booking process', 'Hidden fees', 'Difficulty managing bookings']
        }
      ]
    },
    
    roadmap: [
      {
        phase: 'Phase 1: Foundation & Core Booking System',
        duration: 'Months 1-3',
        focus: 'Establish digital booking infrastructure',
        deliverables: [
          'Flight search and booking engine',
          'Payment gateway integration',
          'Basic customer portal',
          'User authentication system',
          'Initial data migration from legacy systems'
        ],
        keyMetrics: ['Booking system uptime > 99%', 'Payment success rate > 95%', 'User registration > 10K']
      },
      {
        phase: 'Phase 2: Operations Integration & Mobile App',
        duration: 'Months 4-6',
        focus: 'Connect operations and launch mobile experience',
        deliverables: [
          'Operations management system integration',
          'Mobile application (iOS & Android)',
          'Real-time flight status updates',
          'Crew management module',
          'Customer service portal enhancements'
        ],
        keyMetrics: ['Mobile app downloads > 50K', 'Operations efficiency improvement > 25%', 'Customer service resolution time < 5 min']
      },
      {
        phase: 'Phase 3: Analytics & Customer Experience',
        duration: 'Months 7-9',
        focus: 'Data-driven insights and enhanced UX',
        deliverables: [
          'Analytics dashboard for leadership',
          'Customer journey tracking',
          'Personalized recommendations engine',
          'Advanced reporting capabilities',
          'Customer feedback integration system'
        ],
        keyMetrics: ['Dashboard adoption > 80% of managers', 'Customer satisfaction > 85%', 'Data-driven decisions > 60%']
      },
      {
        phase: 'Phase 4: Advanced Features & Scale',
        duration: 'Months 10-12',
        focus: 'Innovation and market expansion',
        deliverables: [
          'AI-powered customer support',
          'Predictive analytics for operations',
          'Loyalty program integration',
          'Multi-language support',
          'API ecosystem for partners'
        ],
        keyMetrics: ['AI resolution rate > 70%', 'Predictive accuracy > 85%', 'Partner integrations > 5']
      }
    ],
    
    requirements: {
      epics: [
        {
          id: 'EPIC-1',
          name: 'Digital Booking Platform',
          description: 'Comprehensive online booking system with search, comparison, and payment capabilities',
          userStories: [
            {
              id: 'US-1-1',
              title: 'Flight Search',
              as: 'customer',
              want: 'to search for flights by date and destination',
              so: 'I can find suitable travel options',
              acceptanceCriteria: [
                'Can search by origin, destination, and date',
                'Results display within 3 seconds',
                'Shows available flights with pricing',
                'Supports round-trip and one-way searches',
                'Displays flight duration and stops'
              ],
              priority: 'P0',
              effort: '5 points'
            },
            {
              id: 'US-1-2',
              title: 'Price Comparison',
              as: 'customer',
              want: 'to compare prices across different dates',
              so: 'I can find the best deal',
              acceptanceCriteria: [
                'Calendar view shows prices for date range',
                'Price differences highlighted',
                'Flexible date search available',
                'Price history visible (if applicable)'
              ],
              priority: 'P1',
              effort: '3 points'
            },
            {
              id: 'US-1-3',
              title: 'Booking Completion',
              as: 'customer',
              want: 'to complete my booking with payment',
              so: 'I can secure my travel',
              acceptanceCriteria: [
                'Secure payment processing',
                'Multiple payment methods supported',
                'Booking confirmation sent via email/SMS',
                'Booking reference number generated',
                'Payment receipt provided'
              ],
              priority: 'P0',
              effort: '8 points'
            }
          ]
        },
        {
          id: 'EPIC-2',
          name: 'Operations Management System',
          description: 'Integrated system for managing flight operations, crew, and resources',
          userStories: [
            {
              id: 'US-2-1',
              title: 'Flight Status Management',
              as: 'operations manager',
              want: 'to update and track flight status in real-time',
              so: 'I can ensure operational efficiency',
              acceptanceCriteria: [
                'Real-time status updates',
                'Automatic notifications for delays',
                'Integration with ATC systems',
                'Historical status tracking'
              ],
              priority: 'P0',
              effort: '8 points'
            },
            {
              id: 'US-2-2',
              title: 'Crew Scheduling',
              as: 'operations manager',
              want: 'to manage crew assignments and schedules',
              so: 'I can ensure adequate staffing',
              acceptanceCriteria: [
                'Crew availability tracking',
                'Automatic schedule conflict detection',
                'Compliance with rest requirements',
                'Schedule optimization suggestions'
              ],
              priority: 'P1',
              effort: '13 points'
            }
          ]
        },
        {
          id: 'EPIC-3',
          name: 'Customer Service Portal',
          description: 'Comprehensive portal for customer service representatives to assist customers',
          userStories: [
            {
              id: 'US-3-1',
              title: 'Customer Profile Access',
              as: 'customer service representative',
              want: 'to access complete customer booking history',
              so: 'I can provide informed assistance',
              acceptanceCriteria: [
                'Single view of all customer bookings',
                'Payment history visible',
                'Previous interactions logged',
                'Customer preferences displayed'
              ],
              priority: 'P0',
              effort: '5 points'
            },
            {
              id: 'US-3-2',
              title: 'Booking Modifications',
              as: 'customer service representative',
              want: 'to modify customer bookings',
              so: 'I can resolve customer issues quickly',
              acceptanceCriteria: [
                'Change flight dates/times',
                'Process refunds and cancellations',
                'Upgrade seat assignments',
                'Add special services',
                'Update customer information'
              ],
              priority: 'P0',
              effort: '8 points'
            }
          ]
        },
        {
          id: 'EPIC-4',
          name: 'Analytics Dashboard',
          description: 'Real-time analytics and reporting for leadership decision-making',
          userStories: [
            {
              id: 'US-4-1',
              title: 'Operational Metrics Dashboard',
              as: 'executive',
              want: 'to view real-time operational metrics',
              so: 'I can make data-driven decisions',
              acceptanceCriteria: [
                'Real-time flight status overview',
                'Revenue and booking metrics',
                'Customer satisfaction scores',
                'Operational efficiency indicators',
                'Customizable date ranges'
              ],
              priority: 'P1',
              effort: '13 points'
            }
          ]
        },
        {
          id: 'EPIC-5',
          name: 'Mobile Application',
          description: 'Native mobile apps for iOS and Android providing full booking and travel management',
          userStories: [
            {
              id: 'US-5-1',
              title: 'Mobile Booking',
              as: 'mobile user',
              want: 'to book flights from my mobile device',
              so: 'I can book on-the-go',
              acceptanceCriteria: [
                'Full booking functionality on mobile',
                'Optimized mobile UI/UX',
                'Offline capability for viewing bookings',
                'Push notifications for flight updates'
              ],
              priority: 'P1',
              effort: '13 points'
            },
            {
              id: 'US-5-2',
              title: 'Mobile Check-in',
              as: 'mobile user',
              want: 'to check in and get boarding pass on mobile',
              so: 'I can skip the queue at the airport',
              acceptanceCriteria: [
                'Check-in available 24 hours before flight',
                'Digital boarding pass generation',
                'QR code for airport scanning',
                'Seat selection during check-in'
              ],
              priority: 'P1',
              effort: '8 points'
            }
          ]
        }
      ]
    },
    
    technicalArchitecture: {
      overview: 'Microservices-based architecture with API-first approach, enabling scalability and independent system evolution.',
      technologyStack: {
        frontend: ['React', 'TypeScript', 'Material-UI', 'Redux'],
        backend: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
        mobile: ['React Native', 'TypeScript'],
        infrastructure: ['AWS Cloud', 'Docker', 'Kubernetes', 'CI/CD Pipeline'],
        integrations: ['Payment Gateways', 'SMS/Email Services', 'ATC Systems', 'Legacy System APIs']
      },
      keyDecisions: [
        'Microservices architecture for scalability and maintainability',
        'API-first design for future integrations',
        'Cloud-native infrastructure for flexibility',
        'Progressive web app capabilities for mobile web',
        'Event-driven architecture for real-time updates'
      ],
      security: [
        'End-to-end encryption for payment processing',
        'OAuth 2.0 for authentication',
        'Role-based access control (RBAC)',
        'Regular security audits and penetration testing',
        'GDPR and data privacy compliance'
      ]
    },
    
    businessCase: {
      investment: {
        development: {
          total: 1800000,
          breakdown: {
            bookingPlatform: 600000,
            operationsSystem: 500000,
            customerPortal: 400000,
            analyticsDashboard: 300000
          }
        },
        infrastructure: {
          total: 400000,
          breakdown: {
            cloudHosting: 250000,
            securityCompliance: 100000,
            integrationMiddleware: 50000
          }
        },
        changeManagement: {
          total: 300000,
          breakdown: {
            staffTraining: 150000,
            processDocumentation: 75000,
            pilotTesting: 75000
          }
        },
        contingency: 400000,
        total: 2900000
      },
      projectedReturns: {
        threeYear: {
          year1: {
            revenueIncrease: 800000,
            costSavings: 1200000,
            netBenefit: 2000000
          },
          year2: {
            revenueIncrease: 1400000,
            costSavings: 1800000,
            netBenefit: 3200000
          },
          year3: {
            revenueIncrease: 2000000,
            costSavings: 2500000,
            netBenefit: 4500000
          },
          totalBenefit: 9700000,
          totalInvestment: 2900000,
          totalROI: 285,
          breakEvenMonth: 18
        }
      },
      assumptions: [
        '40% operational cost reduction through automation',
        '25% increase in booking conversion rates',
        '60% improvement in customer satisfaction',
        '30% reduction in customer service resolution time',
        '20% increase in repeat bookings'
      ]
    },
    
    riskAssessment: [
      {
        risk: 'Legacy system integration challenges',
        probability: 'High',
        impact: 'High',
        mitigation: 'Phased integration approach, extensive testing, fallback mechanisms'
      },
      {
        risk: 'User adoption resistance',
        probability: 'Medium',
        impact: 'High',
        mitigation: 'Comprehensive change management program, training, and support'
      },
      {
        risk: 'Technical complexity delays',
        probability: 'Medium',
        impact: 'Medium',
        mitigation: 'Agile methodology, regular sprints, experienced development team'
      },
      {
        risk: 'Budget overruns',
        probability: 'Low',
        impact: 'High',
        mitigation: 'Detailed project planning, regular budget reviews, contingency fund'
      }
    ],
    
    goToMarket: {
      launchPhases: [
        {
          phase: 'Soft Launch',
          duration: 'Month 1',
          scope: 'Internal testing with select user groups',
          goals: ['Identify critical bugs', 'Gather initial feedback', 'Validate core workflows']
        },
        {
          phase: 'Beta Launch',
          duration: 'Month 2',
          scope: 'Limited public release to 10% of customer base',
          goals: ['Test scalability', 'Monitor performance', 'Refine user experience']
        },
        {
          phase: 'Full Launch',
          duration: 'Month 3',
          scope: 'Complete rollout to all customers',
          goals: ['Achieve target adoption rates', 'Maintain system stability', 'Drive customer engagement']
        }
      ],
      communicationPlan: [
        'Executive briefings for leadership',
        'Training sessions for operations staff',
        'Customer communication via email and SMS',
        'Marketing campaigns highlighting benefits',
        'Press releases and media engagement'
      ],
      trainingStrategy: [
        'Comprehensive training for all user groups',
        'Video tutorials and documentation',
        'In-person workshops for key stakeholders',
        'Ongoing support and help desk',
        'Feedback collection and continuous improvement'
      ]
    },
    
    lessonsLearned: {
      insights: [
        'Importance of stakeholder buy-in at all levels - early engagement is critical',
        'Need for phased approach in emerging markets - big bang launches are risky',
        'Balance between innovation and operational continuity - cannot disrupt current operations',
        'User research is invaluable - assumptions must be validated early',
        'Change management is as important as technical implementation'
      ],
      whatWouldDoDifferently: [
        'Earlier engagement with regulatory bodies to ensure compliance',
        'More extensive pilot testing with subset of routes before full rollout',
        'Additional focus on change management from day 1, not as afterthought',
        'Earlier involvement of end-users in design process',
        'More robust testing of legacy system integrations'
      ],
      keyTakeaways: [
        'Product management in aviation requires deep understanding of operational constraints',
        'Digital transformation is as much about people as it is about technology',
        'Comprehensive documentation and planning are essential for large-scale initiatives',
        'ROI must be clearly communicated to secure executive buy-in',
        'Risk mitigation strategies must be proactive, not reactive'
      ]
    },
    
    artifacts: [
      {
        type: 'document',
        title: 'Full Strategy Document',
        description: '194-page comprehensive digital transformation strategy document',
        url: null, // Would link to actual document
        preview: 'Includes executive summary, detailed requirements, technical architecture, business case, and implementation roadmap'
      },
      {
        type: 'diagram',
        title: 'System Architecture Mindmap',
        description: 'Visual representation of system components and integrations',
        url: null
      },
      {
        type: 'diagram',
        title: 'User Journey Maps',
        description: 'Customer journey maps for key personas',
        url: null
      },
      {
        type: 'presentation',
        title: 'Stakeholder Presentation Deck',
        description: 'Executive presentation summarizing key findings and recommendations',
        url: null
      }
    ]
  }
};

