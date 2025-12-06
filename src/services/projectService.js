import GitHubService from './github.js';
import ReadmeParser from './readmeParser.js';
import { uniqueId } from 'lodash';
import { IconBrandGithub, IconLayoutDashboard, IconChecks, IconMoodHappy } from '@tabler/icons';
import { getMockProjectBySlug, getAllMockProjects } from '../mock/mockProjectData';
import { airopsProjectData } from '../data/projects/airops.js';
import { reloamProjectData } from '../data/projects/reloam.js';

const isDevelopment = false; // Use real GitHub data - set to true for testing with mock data

/**
 * Service for managing projects and generating dynamic menu items
 */
class ProjectService {
  constructor() {
    this.githubService = new GitHubService();
    this.readmeParser = new ReadmeParser();
    this.cache = {
      projects: null,
      lastFetch: null,
      cacheTimeout: 5 * 60 * 1000 // 5 minutes
    };
  }

  /**
   * Map project icon names to actual Tabler icons
   */
  getIconComponent(iconName) {
    const iconMap = {
      'dashboard': IconLayoutDashboard,
      'voice': IconChecks,
      'github': IconBrandGithub,
      'folder': IconMoodHappy, // fallback icon
      'default': IconMoodHappy
    };
    
    return iconMap[iconName] || iconMap['default'];
  }

  /**
   * Ensure all projects have metrics (generate if missing)
   */
  ensureProjectMetrics(project) {
    if (!project.metrics || 
        typeof project.metrics.business_value !== 'number' ||
        typeof project.metrics.complexity !== 'number' ||
        typeof project.metrics.time_spent !== 'number' ||
        typeof project.metrics.fun_rating !== 'number') {
      // Generate default metrics using the parser's method
      const githubData = project.github_data || null;
      project.metrics = this.readmeParser.generateDefaultMetrics(project, githubData);
    }
    return project;
  }

  /**
   * Fetch and parse all projects with caching
   */
  async fetchProjects(forceRefresh = false) {
    // Always include custom case study projects (ensure they have metrics)
    const customProjects = [
      this.ensureProjectMetrics({ ...airopsProjectData }),
      this.ensureProjectMetrics({ ...reloamProjectData })
    ];
    
    // Use mock data in development
    if (isDevelopment) {
      console.log('Development mode: Using mock project data');
      const mockProjects = getAllMockProjects();
      const allProjects = [...customProjects, ...mockProjects];
      this.cache.projects = allProjects;
      this.cache.lastFetch = Date.now();
      return allProjects;
    }

    // Check cache
    if (!forceRefresh && this.cache.projects && this.cache.lastFetch) {
      const now = Date.now();
      if (now - this.cache.lastFetch < this.cache.cacheTimeout) {
        return this.cache.projects;
      }
    }

    try {
      console.log('Fetching repositories from GitHub...');
      const repositories = await this.githubService.fetchRepositoriesWithReadme();
      
      console.log('Parsing project metadata...');
      const projects = this.readmeParser.parseRepositoriesMetadata(repositories);
      
      // Ensure all GitHub projects have metrics
      const projectsWithMetrics = projects.map(p => this.ensureProjectMetrics(p));
      
      // Combine custom projects with GitHub projects
      const allProjects = [...customProjects, ...projectsWithMetrics];
      
      // If no projects found from GitHub, still include custom projects
      if (projects.length === 0) {
        console.log('No projects found from GitHub, using custom projects only');
        this.cache.projects = allProjects;
        this.cache.lastFetch = Date.now();
        return allProjects;
      }
      
      // Update cache
      this.cache.projects = allProjects;
      this.cache.lastFetch = Date.now();
      
      console.log(`Found ${allProjects.length} projects (${customProjects.length} custom + ${projects.length} from GitHub)`);
      return allProjects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fall back to custom projects + mock data if GitHub API fails
      console.log('GitHub API failed, falling back to custom and mock data');
      const mockProjects = getAllMockProjects().map(p => this.ensureProjectMetrics(p));
      const allProjects = [...customProjects, ...mockProjects];
      this.cache.projects = allProjects;
      this.cache.lastFetch = Date.now();
      return allProjects;
    }
  }

  /**
   * Generate dynamic menu items for the sidebar
   */
  async generateMenuItems() {
    const projects = await this.fetchProjects();
    const navigationProjects = this.readmeParser.getNavigationProjects(projects);
    
    const staticMenuItems = [
      {
        navlabel: true,
        subheader: 'Home',
      },
      {
        id: uniqueId(),
        title: 'Dashboard',
        href: '/dashboard',
        icon: this.getIconComponent('dashboard'),
      }
    ];

    // Add projects section if we have projects
    const projectMenuItems = [];
    if (navigationProjects.length > 0) {
      projectMenuItems.push({
        navlabel: true,
        subheader: 'Projects',
      });

      // Add each project
      for (const project of navigationProjects) {
        projectMenuItems.push({
          id: uniqueId(),
          title: project.menuTitle || project.name,
          href: `/projects/${project.slug}`,
          external: false,
          icon: this.getIconComponent('folder'),
        });
      }
    }

    // Static GitHub links section
    const githubMenuItems = [
      {
        navlabel: true,
        subheader: 'External Links',
      },
      {
        id: uniqueId(),
        title: 'GitHub Profile',
        href: 'https://github.com/alfa2267',
        external: true,
        icon: this.getIconComponent('github'),
      },
    ];

    // Development menu items (only in development mode)
    const devMenuItems = [];
    
    if (isDevelopment) {
      devMenuItems.push(
        {
          navlabel: true,
          subheader: 'Development',
        },
        {
          id: uniqueId(),
          title: 'Sample Projects',
          href: '/sample-projects',
          icon: this.getIconComponent('default'),
        }
      );
    }

    // Static utility items
    const utilityMenuItems = [];

    return [
      ...staticMenuItems,
      ...projectMenuItems,
      ...githubMenuItems,
      ...utilityMenuItems,
      ...devMenuItems
    ];
  }

  /**
   * Get project by slug
   * @param {string} slug - Project slug
   * @returns {Promise<Object>} Project data
   */
  async getProjectBySlug(slug) {
    // Check for custom case study projects first
    if (slug === 'airops') {
      // Try to fetch GitHub data for air-ops repository
      try {
        const githubData = await this.githubService.fetchRepository('air-ops');
        if (githubData) {
          return {
            ...airopsProjectData,
            github_data: githubData
          };
        }
      } catch (error) {
        console.log('Could not fetch GitHub data for air-ops:', error);
      }
      return airopsProjectData;
    }
    if (slug === 'reloam') {
      return reloamProjectData;
    }
    
    // Use mock data in development
    if (isDevelopment) {
      console.log(`Development mode: Getting mock project with slug ${slug}`);
      return getMockProjectBySlug(slug);
    }
    
    const projects = await this.fetchProjects();
    const foundProject = projects.find(p => p.slug === slug);
    
    // If not found in fetched projects, try mock data as fallback
    if (!foundProject) {
      console.log(`Project ${slug} not found, checking mock data`);
      return getMockProjectBySlug(slug);
    }
    
    return foundProject;
  }

  /**
   * Get all projects grouped by category
   */
  async getProjectsByCategory() {
    const projects = await this.fetchProjects();
    return this.readmeParser.groupProjectsByCategory(projects);
  }

  /**
   * Determine project type (Open Source, Personal, Experiments)
   * Based on repository visibility, category, and other indicators
   */
  determineProjectType(project) {
    // Check if explicitly set in category
    const category = (project.category || '').toLowerCase();
    if (category.includes('open-source') || category.includes('opensource')) {
      return 'Open Source';
    }
    if (category.includes('personal') || category.includes('portfolio')) {
      return 'Personal';
    }
    if (category.includes('experiment') || category.includes('poc') || category.includes('prototype')) {
      return 'Experiments';
    }

    // Infer from repository visibility
    // If repo_url exists and is public GitHub repo, likely open source
    if (project.repo_url && project.repo_url.includes('github.com')) {
      // Check if it's a portfolio/personal site
      if (project.name.toLowerCase().includes('portfolio') || 
          project.name.toLowerCase().includes('personal') ||
          project.slug === 'alfa2267.github.io') {
        return 'Personal';
      }
      // If it has stars or is actively maintained, likely open source
      if (project.github_data?.stargazers_count > 0 || 
          (project.status === 'active' && project.repo_url)) {
        return 'Open Source';
      }
    }

    // Check if it's a case study/product management project (likely personal/portfolio)
    if (category.includes('product-management') || category.includes('case-study')) {
      return 'Personal';
    }

    // Default: if no repo_url, likely personal/experimental
    if (!project.repo_url) {
      return 'Personal';
    }

    // Default fallback
    return 'Personal';
  }

  /**
   * Get project statistics
   */
  async getProjectStats() {
    const projects = await this.fetchProjects();
    
    const stats = {
      total: projects.length,
      by_status: {},
      by_category: {},
      by_type: {
        'Open Source': 0,
        'Personal': 0,
        'Experiments': 0
      },
      technologies: {}
    };

    for (const project of projects) {
      // Count by status
      stats.by_status[project.status] = (stats.by_status[project.status] || 0) + 1;
      
      // Count by category
      stats.by_category[project.category] = (stats.by_category[project.category] || 0) + 1;
      
      // Count by project type (Open Source, Personal, Experiments)
      const projectType = this.determineProjectType(project);
      stats.by_type[projectType] = (stats.by_type[projectType] || 0) + 1;
      
      // Count technologies
      for (const tech of project.tech_stack) {
        stats.technologies[tech] = (stats.technologies[tech] || 0) + 1;
      }
    }

    return stats;
  }
}

export default ProjectService;