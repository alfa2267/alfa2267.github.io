import * as yaml from 'js-yaml';

/**
 * Service for parsing project metadata from README files
 */
class ReadmeParser {
  /**
   * Extract project metadata from README content
   * Looks for content between <!-- PROJECT-META-START --> and <!-- PROJECT-META-END -->
   */
  parseProjectMetadata(readmeContent, githubData = null) {
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
      const normalized = this.validateAndNormalizeMetadata(metadata, githubData);
      console.log('Normalized metadata:', normalized);
      return normalized;
    } catch (error) {
      console.error('Error parsing YAML metadata:', error);
      return null;
    }
  }

  /**
   * Generate default metrics for a project based on its characteristics
   */
  generateDefaultMetrics(project, githubData = null) {
    // Base metrics (1-10 scale)
    let business_value = 5;
    let complexity = 5;
    let time_spent = 5;
    let fun_rating = 6;

    // Adjust based on category
    const category = (project.category || '').toLowerCase();
    if (category.includes('product') || category.includes('management')) {
      business_value = 8;
      complexity = 7;
      time_spent = 7;
      fun_rating = 7;
    } else if (category.includes('web') || category.includes('frontend')) {
      business_value = 6;
      complexity = 6;
      time_spent = 6;
      fun_rating = 8;
    } else if (category.includes('tool') || category.includes('utility')) {
      business_value = 7;
      complexity = 5;
      time_spent = 5;
      fun_rating = 7;
    } else if (category.includes('api') || category.includes('backend')) {
      business_value = 7;
      complexity = 7;
      time_spent = 6;
      fun_rating = 6;
    }

    // Adjust based on tech stack complexity
    const techStack = Array.isArray(project.tech_stack) ? project.tech_stack : [];
    if (techStack.length > 5) {
      complexity = Math.min(10, complexity + 1);
    }
    if (techStack.some(tech => tech.toLowerCase().includes('react') || tech.toLowerCase().includes('vue') || tech.toLowerCase().includes('angular'))) {
      fun_rating = Math.min(10, fun_rating + 1);
    }

    // Adjust based on GitHub stars (if available)
    if (githubData && githubData.stargazers_count) {
      const stars = githubData.stargazers_count;
      if (stars > 50) {
        business_value = Math.min(10, business_value + 2);
        fun_rating = Math.min(10, fun_rating + 1);
      } else if (stars > 10) {
        business_value = Math.min(10, business_value + 1);
      }
    }

    // Adjust based on status
    const status = (project.status || '').toLowerCase();
    if (status === 'active' || status === 'maintained') {
      time_spent = Math.min(10, time_spent + 1);
      business_value = Math.min(10, business_value + 1);
    } else if (status === 'completed' || status === 'mvp') {
      business_value = Math.min(10, business_value + 1);
    }

    // Add some randomness to make it more interesting (within ±1)
    const randomVariation = () => Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    
    return {
      business_value: Math.max(1, Math.min(10, business_value + randomVariation())),
      complexity: Math.max(1, Math.min(10, complexity + randomVariation())),
      time_spent: Math.max(1, Math.min(10, time_spent + randomVariation())),
      fun_rating: Math.max(1, Math.min(10, fun_rating + randomVariation()))
    };
  }

  /**
   * Validate and normalize project metadata
   */
  validateAndNormalizeMetadata(metadata, githubData = null) {
    if (!metadata || !metadata.project) {
      return null;
    }

    const project = metadata.project;
    
    // Required fields
    if (!project.name || !project.slug) {
      return null;
    }

    // Generate metrics if not provided
    const hasMetrics = project.metrics && 
      typeof project.metrics.business_value === 'number' &&
      typeof project.metrics.complexity === 'number' &&
      typeof project.metrics.time_spent === 'number' &&
      typeof project.metrics.fun_rating === 'number';

    const metrics = hasMetrics ? {
      business_value: project.metrics.business_value,
      complexity: project.metrics.complexity,
      time_spent: project.metrics.time_spent,
      fun_rating: project.metrics.fun_rating
    } : this.generateDefaultMetrics(project, githubData);

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
      metrics: metrics,
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
    let reposWithMetadata = 0;
    let reposWithoutMetadata = 0;
    
    console.log(`Processing ${repositories.length} repositories...`);
    
    for (const repo of repositories) {
      // Prepare GitHub data for metric generation
      const githubData = {
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics || []
      };
      
      const metadata = this.parseProjectMetadata(repo.readme_content, githubData);
      
      if (metadata) {
        reposWithMetadata++;
        
        // Ensure metrics exist (should already be generated, but double-check)
        if (!metadata.metrics || 
            typeof metadata.metrics.business_value !== 'number' ||
            typeof metadata.metrics.complexity !== 'number' ||
            typeof metadata.metrics.time_spent !== 'number' ||
            typeof metadata.metrics.fun_rating !== 'number') {
          // Generate metrics if missing
          metadata.metrics = this.generateDefaultMetrics(metadata, githubData);
        }
        
        // Enhance with GitHub repo data
        projects.push({
          ...metadata,
          // Fallback to GitHub data if not specified
          repo_url: metadata.repo_url || repo.html_url,
          demo_url: metadata.demo_url || repo.homepage || null,
          github_data: githubData
        });
        console.log(`✓ Added project: ${metadata.name} (${repo.name}) with metrics:`, metadata.metrics);
      } else {
        reposWithoutMetadata++;
        console.log(`✗ Skipped ${repo.name}: No PROJECT-META markers found in README`);
      }
    }

    console.log(`Summary: ${reposWithMetadata} projects with metadata, ${reposWithoutMetadata} repos without metadata`);
    
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