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
   * Fetch and parse all projects with caching
   */
  async fetchProjects(forceRefresh = false) {
    // Always include custom case study projects
    const customProjects = [airopsProjectData, reloamProjectData];
    
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
      
      // Combine custom projects with GitHub projects
      const allProjects = [...customProjects, ...projects];
      
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
      const mockProjects = getAllMockProjects();
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