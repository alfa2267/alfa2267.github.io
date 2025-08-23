import * as yaml from 'js-yaml';

/**
 * Service for parsing project metadata from README files
 */
class ReadmeParser {
  /**
   * Extract project metadata from README content
   * Looks for content between <!-- PROJECT-META-START --> and <!-- PROJECT-META-END -->
   */
  parseProjectMetadata(readmeContent) {
    if (!readmeContent) {
      console.log('No README content provided');
      return null;
    }

    const startMarker = '<!-- PROJECT-META-START -->';
    const endMarker = '<!-- PROJECT-META-END -->';
    
    const startIndex = readmeContent.indexOf(startMarker);
    const endIndex = readmeContent.indexOf(endMarker);
    
    console.log('Metadata markers found:', { startIndex, endIndex });
    
    if (startIndex === -1 || endIndex === -1) {
      console.log('No metadata markers found in README');
      return null; // No metadata found
    }
    
    // Extract the content between markers
    const metadataSection = readmeContent
      .substring(startIndex + startMarker.length, endIndex)
      .trim();
    
    console.log('Raw metadata section:', metadataSection.substring(0, 200) + '...');
    
    // Remove markdown code fence if present
    const yamlContent = metadataSection
      .replace(/^```yaml?\s*\n?/i, '')
      .replace(/\n?```\s*$/i, '')
      .trim();
    
    console.log('Cleaned YAML content:', yamlContent.substring(0, 200) + '...');
    
    try {
      const metadata = yaml.load(yamlContent);
      console.log('Parsed YAML metadata:', metadata);
      const normalized = this.validateAndNormalizeMetadata(metadata);
      console.log('Normalized metadata:', normalized);
      return normalized;
    } catch (error) {
      console.error('Error parsing YAML metadata:', error);
      return null;
    }
  }

  /**
   * Validate and normalize project metadata
   */
  validateAndNormalizeMetadata(metadata) {
    if (!metadata || !metadata.project) {
      return null;
    }

    const project = metadata.project;
    
    // Required fields
    if (!project.name || !project.slug) {
      return null;
    }

    // Set defaults and normalize
    return {
      name: project.name,
      slug: project.slug,
      description: project.description || '',
      status: project.status || 'active',
      category: project.category || 'project',
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
      demo_url: project.demo_url || null,
      repo_url: project.repo_url || null,
      priority: typeof project.priority === 'number' ? project.priority : 999,
      show_in_nav: project.show_in_nav !== false, // default true
      icon: project.icon || 'folder',
      features: Array.isArray(project.features) ? project.features : [],
      screenshots: Array.isArray(project.screenshots) ? project.screenshots : [],
      // Project metrics for dashboard
      metrics: {
        business_value: typeof project.metrics?.business_value === 'number' ? project.metrics.business_value : 0,
        complexity: typeof project.metrics?.complexity === 'number' ? project.metrics.complexity : 0,
        time_spent: typeof project.metrics?.time_spent === 'number' ? project.metrics.time_spent : 0,
        fun_rating: typeof project.metrics?.fun_rating === 'number' ? project.metrics.fun_rating : 0,
      },
      // Additional metadata
      created_date: project.created_date || null,
      updated_date: project.updated_date || null,
      tags: Array.isArray(project.tags) ? project.tags : []
    };
  }

  /**
   * Parse multiple repositories and extract their metadata
   */
  parseRepositoriesMetadata(repositories) {
    const projects = [];
    
    for (const repo of repositories) {
      const metadata = this.parseProjectMetadata(repo.readme_content);
      
      if (metadata) {
        // Enhance with GitHub repo data
        projects.push({
          ...metadata,
          // Fallback to GitHub data if not specified
          repo_url: metadata.repo_url || repo.html_url,
          demo_url: metadata.demo_url || repo.homepage || null,
          github_data: {
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            stargazers_count: repo.stargazers_count,
            language: repo.language,
            topics: repo.topics || []
          }
        });
      }
    }

    // Sort by priority, then by name
    return projects.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Filter projects that should appear in navigation
   */
  getNavigationProjects(projects) {
    return projects.filter(project => project.show_in_nav);
  }

  /**
   * Group projects by category
   */
  groupProjectsByCategory(projects) {
    const grouped = {};
    
    for (const project of projects) {
      const category = project.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(project);
    }
    
    return grouped;
  }
}

export default ReadmeParser;