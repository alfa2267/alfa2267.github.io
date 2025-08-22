/**
 * Mock project data for development and testing
 */

export const mockProjects = [
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'My personal portfolio website built with React and Material-UI',
    repo_url: 'https://github.com/alfa2267/alfa2267.github.io',
    project_url: 'https://alfa2267.github.io',
    tech_stack: ['React', 'Material-UI', 'JavaScript', 'GitHub Pages'],
    features: ['Responsive Design', 'Project Showcase', 'Dark/Light Theme', 'GitHub Integration'],
    category: 'web',
    status: 'active',
    screenshots: [],
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-08-15T00:00:00Z',
    github_data: {
      name: 'alfa2267.github.io',
      full_name: 'alfa2267/alfa2267.github.io',
      stargazers_count: 5,
      forks_count: 2,
      open_issues_count: 0,
      language: 'JavaScript',
      updated_at: '2025-08-15T00:00:00Z',
      html_url: 'https://github.com/alfa2267/alfa2267.github.io',
      homepage: 'https://alfa2267.github.io'
    },
    metrics: {
      business_value: 8,
      complexity: 6,
      time_spent: 7,
      fun_rating: 9
    },
    icon: 'dashboard',
    featured: true,
    show_in_nav: true
  },
  {
    id: 'web-app-project',
    name: 'Web Application',
    slug: 'web-app-project',
    description: 'A full-stack web application with modern technologies',
    repo_url: 'https://github.com/alfa2267/web-app',
    project_url: 'https://demo.example.com',
    tech_stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    features: ['User Authentication', 'Real-time Updates', 'RESTful API', 'Responsive UI'],
    category: 'fullstack',
    status: 'active',
    screenshots: [],
    created_at: '2025-02-20T00:00:00Z',
    updated_at: '2025-08-10T00:00:00Z',
    github_data: {
      name: 'web-app',
      full_name: 'alfa2267/web-app',
      stargazers_count: 12,
      forks_count: 4,
      open_issues_count: 2,
      language: 'JavaScript',
      updated_at: '2025-08-10T00:00:00Z',
      html_url: 'https://github.com/alfa2267/web-app',
      homepage: 'https://demo.example.com'
    },
    metrics: {
      business_value: 9,
      complexity: 8,
      time_spent: 9,
      fun_rating: 8
    },
    icon: 'github',
    featured: true,
    show_in_nav: true
  },
  {
    id: 'mobile-app',
    name: 'Mobile Application',
    slug: 'mobile-app',
    description: 'Cross-platform mobile app built with React Native',
    repo_url: 'https://github.com/alfa2267/mobile-app',
    project_url: 'https://play.google.com/store/apps/details?id=com.example.app',
    tech_stack: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    features: ['Cross-platform', 'Push Notifications', 'Offline Support', 'Cloud Sync'],
    category: 'mobile',
    status: 'maintenance',
    screenshots: [],
    created_at: '2025-03-10T00:00:00Z',
    updated_at: '2025-07-20T00:00:00Z',
    github_data: {
      name: 'mobile-app',
      full_name: 'alfa2267/mobile-app',
      stargazers_count: 18,
      forks_count: 6,
      open_issues_count: 3,
      language: 'TypeScript',
      updated_at: '2025-07-20T00:00:00Z',
      html_url: 'https://github.com/alfa2267/mobile-app',
      homepage: 'https://play.google.com/store/apps/details?id=com.example.app'
    },
    metrics: {
      business_value: 7,
      complexity: 9,
      time_spent: 8,
      fun_rating: 7
    },
    icon: 'folder',
    featured: false,
    show_in_nav: true
  }
];

/**
 * Get mock project by slug
 * @param {string} slug - Project slug
 * @returns {Object|null} Project data or null if not found
 */
export const getMockProjectBySlug = (slug) => {
  return mockProjects.find(project => project.slug === slug) || null;
};

/**
 * Get all mock projects
 * @returns {Array} Array of projects
 */
export const getAllMockProjects = () => {
  return [...mockProjects];
};
