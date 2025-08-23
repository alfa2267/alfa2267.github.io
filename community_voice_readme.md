# Community Voice

A modern, interactive community voting platform designed for local civic engagement. Built with vanilla JavaScript, featuring real-time voting, data export capabilities, and a responsive design that works seamlessly across all devices.

<!-- PROJECT-META-START -->
```yaml
project:
  name: "Community Voice"
  slug: "community-voice"
  description: "Interactive community voting platform for local civic engagement"
  status: "active"
  category: "web"
  tech_stack: ["JavaScript", "HTML5", "CSS3", "Local Storage"]
  demo_url: "https://community-voice-demo.netlify.app"
  repo_url: "https://github.com/alfa2267/community-voice"
  priority: 3
  show_in_nav: true
  icon: "folder"
  features:
    - "Community Program Voting"
    - "Live Poll System"
    - "Voter Profile System"
    - "Data Export Capabilities"
    - "Real-time Vote Tracking"
    - "Responsive Design"
```
<!-- PROJECT-META-END -->

## 🗳️ Features

### Community Program Voting
- Interactive +/- voting system for community initiatives
- Animated ballot drop effects with visual feedback
- Real-time vote tracking and persistent data storage

### Live Poll System
- Multiple choice polls with instant result visualization
- Percentage calculations and animated result bars
- One-vote-per-user enforcement with local storage

### Voter Profile System
- Demographic collection (neighborhood, residency duration, interests)
- Vote count tracking and personal statistics
- Sticky profile card for easy access during voting

### Monthly Town Halls Calendar
- Interactive event calendar with upcoming meetings
- ICS calendar export for automatic reminders
- Professional RSVP modal forms with validation
- Childcare reservation options

### Data Management
- Comprehensive JSON export of all voting data
- Centralized data storage with timestamps
- Detailed analytics including vote breakdowns
- Privacy-focused local storage (no server required)

### Modern UI/UX
- Clean, accessible design with smooth animations
- Mobile-first responsive layout
- Hover effects and interactive feedback
- Professional modal systems

## 🚀 Live Demo

**[View Live Site](https://alfa2267.github.io/)**

## 🛠️ Technical Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **Data**: LocalStorage API, JSON export
- **Features**: ICS Calendar generation, Form validation
- **Deployment**: GitHub Pages
- **Development**: No build process required

## 📁 Project Structure

```
├── index.html              # Main voting platform
├── app.js                  # Core functionality and voting logic
├── styles.css              # Complete styling and responsive design
├── embed-page-content.html # Standalone project showcase page
└── .github/workflows/      # GitHub Actions for automated testing
```

## 🏃‍♂️ Getting Started

### Local Development
1. Clone this repository
2. Open `index.html` in your browser
3. Start voting and testing features immediately

### GitHub Pages Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

## 💡 Use Cases

- **Community Organizations**: Gather input on local programs and initiatives
- **Neighborhood Associations**: Vote on community improvements and events
- **Local Government**: Collect resident feedback on municipal decisions
- **Event Planning**: Poll attendance and preferences for community gatherings
- **Budget Planning**: Democratic input on spending priorities

## 🔧 Key Functions

- `setupVoting()` - Initializes poll voting system
- `initPickGrid()` - Handles community program voting
- `exportVotingData()` - Generates JSON export of all votes
- `generateCalendarData()` - Creates ICS calendar files
- `showRSVPForm()` - Manages event registration

## 📊 Data Export

All voting data is stored locally and can be exported as JSON including:
- Individual vote choices with timestamps
- Voter demographics and profiles
- Aggregated statistics and summaries
- Town hall RSVP information

## 🎨 Design Philosophy

Built with a clean, accessible design inspired by modern civic engagement platforms. The interface prioritizes clarity and ease of use while maintaining visual appeal through subtle animations and thoughtful typography.

## 🔒 Privacy & Security

- All data stored locally in browser (no external servers)
- No personal information transmitted anywhere
- Export functionality gives users complete control over their data
- Security checks implemented via GitHub Actions

## 🤝 Contributing

This project uses automated PR checks for quality assurance. All contributions require review before merging to the main branch.

## 📄 License

Proprietary. All rights reserved.

<!-- PROJECT-META-START -->
  ```yaml
  project:
    name: "Community Voice"
    slug: "community-voice"
    description: "A modern, interactive community voting platform designed for local civic engagement. Built with vanilla JavaScript, featuring real-time voting, data export capabilities, and a responsive design that works seamlessly across all devices"
    status: "active"
    category: "web-app"
    tech_stack: ["Pure HTML5", "CSS3", "Vanilla JavaScript"]
    demo_url: "https://alfa2267.github.io/community-voice"
    repo_url: "https://github.com/alfa2267/community-voice"
    show_in_nav: true
    icon: "dashboard"
    metrics:
      business_value: 350    # 0-500 scale
      complexity: 250       # 0-500 scale
      time_spent: 50       # 0-500 scale (hours or relative)
      fun_rating: 450       # 0-500 scale
    features: ["Community Program Voting", "Live Poll System"]
    created_date: "2025-08-14"
    updated_date: "2025-08-15"
```
<!-- PROJECT-META-END -->
