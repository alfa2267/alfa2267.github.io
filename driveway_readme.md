# Driveway - Driving School Management System

A comprehensive driving school management system built with React and TypeScript, designed to streamline test management, lesson scheduling, and student progress tracking.

<!-- PROJECT-META-START -->
```yaml
project:
  name: "Driveway"
  slug: "driveway"
  description: "Driving School Management System - React & TypeScript"
  status: "active"
  category: "web"
  tech_stack: ["React", "TypeScript", "Tailwind CSS", "React Router"]
  demo_url: "https://driveway-demo.netlify.app"
  repo_url: "https://github.com/alfa2267/driveway"
  priority: 1
  show_in_nav: true
  icon: "folder"
  features:
    - "Student Management"
    - "Instructor Management" 
    - "Lesson Scheduling"
    - "Vehicle Management"
    - "Test Routes Management"
    - "Reports & Analytics"
```
<!-- PROJECT-META-END -->

## 🚀 Features

- **Dashboard**: Overview of school operations with onboarding checklist
- **Student Management**: Track student progress, contact information, and lesson history
- **Instructor Management**: Manage instructor profiles, availability, and specialties
- **Lesson Scheduling**: Interactive calendar for booking and managing lessons
- **Vehicle Management**: Track vehicles, maintenance, and availability
- **Test Routes**: Manage driving test routes with difficulty levels and features
- **Test Management**: Comprehensive test session administration and results tracking
- **Schedule Overview**: Weekly schedule view with instructor availability
- **Reports & Analytics**: Performance metrics and data visualization

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Package Manager**: npm/yarn

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+ or yarn 1.22+
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/alfa2267/driveway.git
cd driveway
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the following environment variables:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG_MODE=true
```

### 4. Start Development Server

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects from Create React App (one-way operation) |
| `npm run build:docs` | Builds and deploys to docs folder |

## 🏗️ Project Structure

```
driveway/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components
│   │   ├── certificates/  # Certificate-related components
│   │   ├── onboarding/    # Onboarding flow components
│   │   ├── payments/      # Payment processing components
│   │   ├── schedules/     # Scheduling components
│   │   ├── tests/         # Test-related components
│   │   └── vehicles/      # Vehicle management components
│   ├── contexts/          # React Context providers
│   ├── data/              # Seed data and mock data
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── docs/                  # Built documentation
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication
All API endpoints require authentication via JWT tokens in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Test Sessions API

#### Get All Test Sessions
```http
GET /test-sessions
```

**Response:**
```json
{
  "data": [
    {
      "id": "session-001",
      "examiner": "Sarah Wilson",
      "studentName": "John Doe",
      "studentId": "STU001",
      "testDate": "2024-08-20",
      "testTime": "09:00",
      "status": "scheduled",
      "route": {
        "id": "RT-001",
        "name": "City Center Route A",
        "type": "practice",
        "difficulty": "beginner",
        "duration": 45,
        "distance": "12 km"
      }
    }
  ],
  "success": true
}
```

#### Get Test Session by ID
```http
GET /test-sessions/:id
```

#### Create Test Session
```http
POST /test-sessions
```

**Request Body:**
```json
{
  "studentId": "STU001",
  "examinerId": "INS001",
  "testDate": "2024-08-20",
  "testTime": "09:00",
  "routeId": "RT-001",
  "status": "scheduled"
}
```

#### Update Test Session
```http
PUT /test-sessions/:id
```

**Request Body:**
```json
{
  "status": "completed",
  "scores": {
    "Smooth steering": 18,
    "Proper signaling": 14,
    "Speed control": 13
  },
  "notes": "Good performance, minor points for signaling"
}
```

#### Delete Test Session
```http
DELETE /test-sessions/:id
```

### Test Routes API

#### Get All Test Routes
```http
GET /test-routes
```

#### Get Test Route by ID
```http
GET /test-routes/:id
```

### Students API

#### Get All Students
```http
GET /students
```

#### Get Student by ID
```http
GET /students/:id
```

### Instructors API

#### Get All Instructors
```http
GET /instructors
```

#### Get Instructor by ID
```http
GET /instructors/:id
```

## 🧩 Component Documentation

### Core Components

#### TestSession
The main component for managing test sessions.

**Props:**
```typescript
interface TestSessionProps {
  mode?: 'instructor' | 'student';
}
```

**Features:**
- Test session list view
- Individual test session management
- Real-time test progress tracking
- Score recording and evaluation
- Instructor and student views

#### TestManagement
Comprehensive test administration component.

**Props:**
```typescript
interface TestManagementProps {
  mode?: 'list' | 'create' | 'edit' | 'view' | 'results';
}
```

**Features:**
- Test scheduling and creation
- Results management and analysis
- Student progress tracking
- Route assignment

#### InteractiveMap
Real-time map component for test route visualization.

**Props:**
```typescript
interface InteractiveMapProps {
  instructorId?: string;
  studentName?: string;
  testRouteId?: string;
  mode?: 'instructor' | 'student';
  currentLocation?: Location;
  speed?: number;
  testDuration?: string;
  routePoints?: RoutePoint[];
  completedPoints?: number;
}
```

### Common Components

#### TabbedForm
Reusable form component with tabbed interface.

#### MediaUpload
File upload component with drag-and-drop support.

#### RouteMap
Base map component for route visualization.

## 🔧 Setup Guide

### Development Environment

1. **Install Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Clone and Setup**
   ```bash
   git clone https://github.com/alfa2267/driveway.git
   cd driveway
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

### Database Setup

The application uses seed data files for development. These are located in `src/data/`:

- `student.seed.json` - Student information
- `instructor.seed.json` - Instructor profiles
- `route.seed.json` - Test routes and waypoints
- `test.seed.json` - Test results and history
- `testsession.seed.json` - Test session data

### API Backend Setup

1. **Start the backend server** (if available)
2. **Update API base URL** in `.env`
3. **Configure CORS** if running on different ports

## 🚀 Production Deployment

### Quick Production Deploy

```bash
# Make the deployment script executable
chmod +x scripts/deploy.sh

# Run production deployment
./scripts/deploy.sh
```

### Production Build

1. **Create Production Build**
   ```bash
   npm run build:prod
   ```

2. **Test Production Build Locally**
   ```bash
   npm install -g serve
   serve -s build -l 3000
   ```

3. **Analyze Bundle Size**
   ```bash
   npm run build:analyze
   ```

### Deployment Options

#### Option 1: Automated Deployment (Recommended)

The deployment script handles everything automatically:
- Dependency installation
- Testing (unit, type checking, E2E)
- Production build
- Backup creation
- Deployment to docs folder
- Health checks
- Automatic rollback on failure

```bash
./scripts/deploy.sh
```

#### Option 2: Manual GitHub Pages Deployment

1. **Build and Deploy**
   ```bash
   npm run build:prod
   npm run deploy:prod
   ```

2. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Set source to "Deploy from a branch"
   - Select `docs` folder

#### Option 3: Netlify

1. **Connect Repository**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build:prod`
   - Set publish directory: `build`

2. **Environment Variables**
   - Add environment variables in Netlify dashboard
   - Set `REACT_APP_API_BASE_URL` to your production API

#### Option 4: Vercel

1. **Deploy with Vercel CLI**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Environment Variables**
   - Add environment variables in Vercel dashboard

### Environment Configuration

**Production Environment Variables:**
```env
NODE_ENV=production
REACT_APP_API_BASE_URL=https://your-api-domain.com/api
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DEBUG_MODE=false
REACT_APP_ENABLE_ERROR_TRACKING=true
REACT_APP_ENABLE_PERFORMANCE_MONITORING=true
REACT_APP_GOOGLE_ANALYTICS_ID=your-ga-id
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Build Optimization

1. **Code Splitting**
   - Routes are automatically code-split
   - Lazy loading for better performance
   - Vendor chunk separation

2. **Bundle Analysis**
   ```bash
   npm run build:analyze
   ```

3. **Production Optimizations**
   - Source maps disabled in production
   - Console logs removed
   - Gzip compression
   - Tree shaking enabled
   - Minification with Terser

### Security Features

- **Security Headers**: XSS protection, content type options, frame options
- **Content Security Policy**: Script and object source restrictions
- **HTTPS Enforcement**: HSTS headers for production
- **Input Validation**: All forms validated
- **XSS Protection**: React built-in protection
- **CSRF Protection**: API token validation

### Performance Monitoring

- **Web Vitals**: FCP, LCP, FID, CLS, TTFB tracking
- **Custom Metrics**: API response times, component render times
- **Memory Usage**: Heap size monitoring
- **Resource Timing**: Asset load times
- **Analytics Integration**: Google Analytics, Sentry support

### Error Handling & Logging

- **Error Boundaries**: Graceful error handling with user feedback
- **Structured Logging**: Different log levels with context
- **Remote Logging**: Sentry integration for production
- **Performance Tracking**: Request/response monitoring
- **Automatic Rollback**: Deployment failure recovery

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage --watchAll=false
```

### E2E Testing
```bash
npm run test:e2e
```

## 📊 Performance Monitoring

### Lighthouse Scores
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 85+

### Bundle Size
- Main bundle: ~200KB gzipped
- Total bundle: ~400KB gzipped

## 🔒 Security

### Best Practices
- Input validation on all forms
- XSS protection with React
- CSRF protection via API tokens
- Secure authentication flow

### Environment Variables
- Never commit `.env` files
- Use `.env.example` for templates
- Validate environment variables at startup

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **TypeScript Errors**
   ```bash
   npx tsc --noEmit
   ```

3. **Port Conflicts**
   - Change port in package.json scripts
   - Use `PORT=3001 npm start`

### Debug Mode
Enable debug mode in `.env`:
```env
REACT_APP_ENABLE_DEBUG_MODE=true
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Create a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comprehensive tests
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/alfa2267/driveway/issues)
- **Discussions**: [GitHub Discussions](https://github.com/alfa2267/driveway/discussions)
- **Email**: [Contact Support](mailto:support@driveway.com)

## 🔄 Changelog

### v1.0.0 (2024-08-17)
- Initial release
- Core test management functionality
- Student and instructor management
- Route planning and visualization

---

**Driveway** - Empowering driving schools with modern technology solutions.

<!-- PROJECT-META-START -->
```yaml
project:
  name: "Driveway"
  slug: "driveway"
  description: "A comprehensive driving school management system built with React and TypeScript"
  status: "active"
  category: "web-app"
  tech_stack: ["React", "TypeScript", "Node.js", "Tailwind CSS"]
  demo_url: "https://alfa2267.github.io/driveway"
  repo_url: "https://github.com/alfa2267/driveway"
  priority: 4
  show_in_nav: true
  icon: "dashboard"
  metrics:
    business_value: 500   
    complexity: 450       
    time_spent: 100       
    fun_rating: 250       
  features:
    - "CBT"
    - "Lesson and Test Scheduling"
    - "Test Management"
    - "Route Planning"
  created_date: "2025-08-17"
  updated_date: "2025-08-17"
```
<!-- PROJECT-META-END -->
