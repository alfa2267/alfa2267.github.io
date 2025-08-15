import GitHubService from './github.js';
import ReadmeParser from './readmeParser.js';
import { uniqueId } from 'lodash';
import { IconBrandGithub, IconLayoutDashboard, IconChecks, IconMoodHappy } from '@tabler/icons';
import { getMockProjectBySlug, getAllMockProjects } from '../mock/mockProjectData';

const isDevelopment = process.env.NODE_ENV === 'development';

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
   * Fetch and parse all projects with caching
   */
  async fetchProjects(forceRefresh = false) {
    // Use mock data in development
    if (isDevelopment) {
      console.log('Development mode: Using mock project data');
      const mockProjects = getAllMockProjects();
      this.cache.projects = mockProjects;
      this.cache.lastFetch = Date.now();
      return mockProjects;
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
      
      // Update cache
      this.cache.projects = projects;
      this.cache.lastFetch = Date.now();
      
      console.log(`Found ${projects.length} projects with metadata`);
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return this.cache.projects || [];
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
        icon: IconLayoutDashboard,
        href: '/dashboard',
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
          title: project.name,
          icon: this.getIconComponent(project.icon),
          href: `/projects/${project.slug}`,
          external: false,
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
        icon: IconBrandGithub,
        href: 'https://github.com/alfa2267',
        external: true,
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
          icon: IconMoodHappy,
          href: '/sample-projects',
        }
      );
    }

    // Static utility items
    const utilityMenuItems = [
      {
        id: uniqueId(),
        title: 'Icons',
        icon: IconMoodHappy,
        href: '/icons',
      }
    ];

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
    // Use mock data in development
    if (isDevelopment) {
      console.log(`Development mode: Getting mock project with slug ${slug}`);
      return getMockProjectBySlug(slug);
    }
    
    const projects = await this.fetchProjects();
    return projects.find(p => p.slug === slug) || null;
  }

  /**
   * Get all projects grouped by category
   */
  async getProjectsByCategory() {
    const projects = await this.fetchProjects();
    return this.readmeParser.groupProjectsByCategory(projects);
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
      technologies: {}
    };

    for (const project of projects) {
      // Count by status
      stats.by_status[project.status] = (stats.by_status[project.status] || 0) + 1;
      
      // Count by category
      stats.by_category[project.category] = (stats.by_category[project.category] || 0) + 1;
      
      // Count technologies
      for (const tech of project.tech_stack) {
        stats.technologies[tech] = (stats.technologies[tech] || 0) + 1;
      }
    }

    return stats;
  }
}

export default ProjectService;