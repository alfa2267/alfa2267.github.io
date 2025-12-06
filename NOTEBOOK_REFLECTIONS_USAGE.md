# NotebookReflections Component - Usage Guide

The `NotebookReflections` component creates a personal, diary-style section for product reflections. It looks like handwritten notes, sketches, and sticky notes - perfect for the "Product Discovery" and "Lessons Learned" sections.

## Why Use This?

This component makes your reflections feel:
- **Personal** - Like real notes from your product journey
- **Authentic** - Handwritten style shows vulnerability and learning
- **Visual** - Sticky notes and sketches are more engaging than bullet points
- **Memorable** - Unique presentation stands out from typical portfolios

## Component Structure

```jsx
import { NotebookReflections } from '../../../components/sections';

<NotebookReflections
  title="Product Notebook"
  reflections={{
    stickyNotes: [...],
    sketches: [...],
    timeline: [...],
    keyTakeaway: "..."
  }}
/>
```

## Data Structure

### 1. Sticky Notes
Colorful sticky notes for quick insights. Perfect for "aha moments" and key learnings.

```jsx
stickyNotes: [
  {
    color: '#FFF9C4',        // Yellow sticky note
    title: 'Aha Moment!',
    content: 'Users don\'t want more features - they want less friction',
    icon: IconBulb           // Optional icon
  },
  {
    color: '#FFCCBC',        // Orange sticky note
    title: 'Watch Out!',
    content: 'Always validate with 10+ users before building',
    icon: IconAlertTriangle
  },
  {
    color: '#C8E6C9',        // Green sticky note
    title: 'What Worked',
    content: 'Starting with prototypes saved 3 weeks of dev time',
    icon: IconCheck
  },
  {
    color: '#BBDEFB',        // Blue sticky note
    title: 'Next Time',
    content: 'Define success metrics BEFORE writing code',
    icon: IconArrowRight
  }
]
```

**Available colors:**
- `#FFF9C4` - Yellow
- `#FFCCBC` - Orange
- `#C8E6C9` - Green
- `#BBDEFB` - Blue
- `#F8BBD0` - Pink
- `#D1C4E9` - Purple

### 2. Sketches
Notebook-style boxes with lined paper background. Great for detailed reflections.

```jsx
sketches: [
  {
    title: 'What I Learned',
    items: [
      'User research is non-negotiable - 1 interview is not enough',
      'MVPs should be even simpler than you think',
      'Prototypes > Code for early validation'
    ],
    diagram: ['Problem', 'Research', 'Prototype', 'Build', 'Validate'] // Optional flow diagram
  },
  {
    title: 'Mistakes I Made',
    items: [
      'Jumped straight to coding without prototypes',
      'Built features users didn\'t ask for',
      'No success metrics defined upfront'
    ]
  }
]
```

### 3. Timeline
Timeline-style notes showing "If I could do it again" workflow.

```jsx
timeline: [
  {
    phase: 'Week 1-2',
    items: [
      'Interview 15 agricultural landlords',
      'Shadow them for a day to see actual workflows',
      'Document pain points, not solutions'
    ]
  },
  {
    phase: 'Week 3',
    items: [
      'Workshop with potential users',
      'Sketch multiple solution approaches',
      'Get feedback on concepts'
    ]
  },
  {
    phase: 'Week 4-5',
    items: [
      'Figma clickable prototype',
      'Test with 5 landlords',
      'Define MVP scope based on validated needs'
    ]
  }
]
```

### 4. Key Takeaway
A highlighted box with your main learning - appears at the bottom with sparkle emoji.

```jsx
keyTakeaway: "The best products are built at the intersection of user needs, technical feasibility, and business value. Start with understanding the problem, not designing the solution."
```

## Full Example - Reloam Project

```jsx
<NotebookReflections
  title="Product Owner Reflections"
  reflections={{
    stickyNotes: [
      {
        color: '#FFF9C4',
        title: 'User Research Gap',
        content: 'Built MVP with only 1 interview. Should have talked to 10-15 landlords first.',
        icon: IconAlertTriangle
      },
      {
        color: '#FFCCBC',
        title: 'MVP Bloat',
        content: 'Added too many features. Could have started with just tenant tracking + payment logging.',
        icon: IconBulb
      },
      {
        color: '#C8E6C9',
        title: 'Success Metrics',
        content: 'Define "What does success look like?" BEFORE building anything.',
        icon: IconCheck
      },
      {
        color: '#BBDEFB',
        title: 'Prototype First',
        content: 'Clickable prototypes are faster, cheaper, and easier to change than code.',
        icon: IconPencil
      }
    ],

    sketches: [
      {
        title: 'What I Learned',
        items: [
          'User research is non-negotiable',
          'MVPs should be even simpler',
          'Define success metrics upfront',
          'Start with prototypes, not code'
        ],
        diagram: ['Interviews', 'Personas', 'Prototypes', 'Validate', 'Build']
      },
      {
        title: 'PM Skills Applied',
        items: [
          'Problem discovery through user interviews',
          'Product strategy & roadmap creation',
          'Requirements management (user stories)',
          'Cross-functional collaboration with engineers',
          'Technical fluency (contributed to codebase)'
        ]
      }
    ],

    timeline: [
      {
        phase: 'Week 1-2: Deep User Research',
        items: [
          'Interview 15 agricultural landlords',
          'Shadow them for a day',
          'Document pain points',
          'Create 2-3 personas'
        ]
      },
      {
        phase: 'Week 3: Solution Ideation',
        items: [
          'Workshop with potential users',
          'Sketch multiple approaches',
          'Get feedback on concepts'
        ]
      },
      {
        phase: 'Week 4-5: Prototyping',
        items: [
          'Build Figma clickable prototype',
          'Test with 5 landlords',
          'Iterate based on feedback',
          'Define MVP scope'
        ]
      },
      {
        phase: 'Week 6-10: Build MVP',
        items: [
          'Only validated features',
          'Build analytics from day 1',
          'Define clear success metrics'
        ]
      },
      {
        phase: 'Week 11-12: Beta Testing',
        items: [
          '5-10 landlords use for real work',
          'Weekly check-ins',
          'Measure: adoption, retention, satisfaction',
          'Decide: continue, pivot, or kill'
        ]
      }
    ],

    keyTakeaway: "Building products is about learning, not just shipping. The faster you can validate assumptions with real users, the less time you waste building the wrong thing."
  }}
/>
```

## Visual Design Features

### Handwritten Font
Uses Google Font "Indie Flower" for authentic handwritten feel. Font is auto-loaded by the component.

### Sticky Note Effects
- Slight rotation for natural look
- Shadow effect
- Hover animation (straightens and lifts)
- Tape effect at top

### Lined Paper
- Horizontal lines like a real notebook
- Cream background color
- Dotted sketch boxes for diagrams

### Timeline Dots
- Green circular indicators
- Connecting visual flow
- Chip labels for phases

## When to Use vs LessonsLearnedSection

**Use NotebookReflections when:**
- ✅ You want a personal, diary-style feel
- ✅ Project is a side project or learning experience
- ✅ You want to show vulnerability and growth
- ✅ Reflecting on what you'd do differently

**Use LessonsLearnedSection when:**
- ✅ Professional enterprise project
- ✅ Formal case study presentation
- ✅ Need structured, corporate-friendly format

## Tips for Great Reflections

1. **Be Honest** - Show what you learned, including mistakes
2. **Be Specific** - "Interview 15 users" > "Do more research"
3. **Show Growth** - Demonstrate how you'd apply learnings
4. **Add Personality** - Use your own voice, not corporate speak
5. **Keep It Visual** - Mix sticky notes, sketches, and timelines

## Customization

### Change Sticky Note Colors
```jsx
{
  color: '#E1BEE7',  // Custom purple
  title: 'My Note',
  content: 'Custom colored sticky note'
}
```

### Add Custom Icons
Import any Tabler icon and pass it:
```jsx
import { IconRocket, IconUsers, IconTrendingUp } from '@tabler/icons-react';

{
  icon: IconRocket,
  title: 'Launch Day',
  content: 'We shipped!'
}
```

### Hide Sections
Simply omit sections you don't need:
```jsx
reflections={{
  // Only sticky notes, no sketches or timeline
  stickyNotes: [...]
}}
```

## Accessibility

- Proper ARIA labels
- Sufficient color contrast
- Keyboard navigable
- Screen reader friendly

## Performance

- Lightweight component
- Google Font loaded async
- No heavy dependencies
- Responsive on all devices

---

**Pro Tip:** Mix this with traditional sections. Use NotebookReflections for personal projects and LessonsLearnedSection for enterprise work to show range!
