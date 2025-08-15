/**
 * Mock project data for development and testing
 */

export const mockProjects = [
  {
    id: 'sample-project-1',
    name: 'Sample Project 1',
    slug: 'sample-project-1',
    description: 'This is a sample project for development purposes',
    repo_url: 'https://github.com/example/sample-project-1',
    demo_url: 'https://example.com/sample-1',
    tags: ['react', 'demo', 'sample'],
    status: 'active',
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-08-01T00:00:00Z',
    readme: '# Sample Project 1\n\nThis is a sample project for development purposes.\n\n## Features\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Getting Started\n```bash\nnpm install\nnpm start\n```',
    github_data: {
      stargazers_count: 42,
      forks_count: 12,
      open_issues_count: 3,
      language: 'JavaScript',
      updated_at: '2025-08-01T00:00:00Z',
      html_url: 'https://github.com/example/sample-project-1',
      homepage: 'https://example.com/sample-1'
    },
    icon: 'github',
    featured: true
  },
  {
    id: 'sample-project-2',
    name: 'Sample Project 2',
    slug: 'sample-project-2',
    description: 'Another sample project for development',
    repo_url: 'https://github.com/example/sample-project-2',
    demo_url: 'https://example.com/sample-2',
    tags: ['typescript', 'demo', 'ui'],
    status: 'active',
    created_at: '2025-02-20T00:00:00Z',
    updated_at: '2025-07-15T00:00:00Z',
    readme: '# Sample Project 2\n\nAnother sample project for development.\n\n## Features\n- Modern UI\n- Responsive Design\n- Type Safety with TypeScript',
    github_data: {
      stargazers_count: 28,
      forks_count: 8,
      open_issues_count: 5,
      language: 'TypeScript',
      updated_at: '2025-07-15T00:00:00Z',
      html_url: 'https://github.com/example/sample-project-2',
      homepage: 'https://example.com/sample-2'
    },
    icon: 'dashboard',
    featured: false
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
