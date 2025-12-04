// GitHub API service for fetching repositories and README content
class GitHubService {
  constructor(username = 'alfa2267') {
    this.username = username;
    this.baseUrl = 'https://api.github.com';
  }

  /**
   * Fetch all public repositories for the user
   */
  async fetchRepositories() {
    try {
      const url = `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`;
      console.log('Fetching repositories from:', url);
      const response = await fetch(url);
      console.log('GitHub API response status:', response.status);
      if (!response.ok) {
        console.error(`GitHub API error: ${response.status} ${response.statusText}`);
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const repos = await response.json();
      console.log(`Found ${repos.length} repositories`);
      return repos;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      return [];
    }
  }

  /**
   * Fetch README content for a specific repository
   */
  async fetchReadmeContent(repoName) {
    try {
      const url = `${this.baseUrl}/repos/${this.username}/${repoName}/readme`;
      console.log(`Fetching README for ${repoName} from:`, url);
      const response = await fetch(url);
      console.log(`README response for ${repoName}:`, response.status);
      if (!response.ok) {
        if (response.status === 404) {
          console.log(`No README found for ${repoName}`);
          return null; // No README found
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      // Decode base64 content
      const content = atob(data.content);
      console.log(`README content length for ${repoName}:`, content.length);
      return content;
    } catch (error) {
      console.error(`Error fetching README for ${repoName}:`, error);
      return null;
    }
  }

  /**
   * Fetch README rendered as HTML for a specific repository
   */
  async fetchReadmeHtml(repoName) {
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.username}/${repoName}/readme`,
        {
          headers: {
            Accept: 'application/vnd.github.html',
          },
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          return null; // No README found
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const html = await response.text();
      return html;
    } catch (error) {
      console.error('Error fetching README HTML for %s:', repoName, error);
      return null;
    }
  }

  /**
   * Fetch repositories with their README content
   */
  async fetchRepositoriesWithReadme() {
    const repos = await this.fetchRepositories();
    const reposWithReadme = [];

    for (const repo of repos) {
      const readmeContent = await this.fetchReadmeContent(repo.name);
      reposWithReadme.push({
        ...repo,
        readme_content: readmeContent
      });
    }

    return reposWithReadme;
  }

  /**
   * Get commit statistics for the current month
   * Returns commit count for current month and previous month for comparison
   */
  async getMonthlyCommitStats() {
    try {
      const repos = await this.fetchRepositories();
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      let currentMonthCommits = 0;
      let lastMonthCommits = 0;

      // Fetch commits for each repository
      for (const repo of repos) {
        try {
          // Get commits for current month
          const currentMonthStart = new Date(currentYear, currentMonth, 1).toISOString();
          const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59).toISOString();
          
          const currentMonthUrl = `${this.baseUrl}/repos/${this.username}/${repo.name}/commits?since=${currentMonthStart}&until=${currentMonthEnd}&per_page=100`;
          const currentResponse = await fetch(currentMonthUrl);
          if (currentResponse.ok) {
            const currentCommits = await currentResponse.json();
            currentMonthCommits += currentCommits.length;
          }

          // Get commits for last month
          const lastMonthStart = new Date(lastMonthYear, lastMonth, 1).toISOString();
          const lastMonthEnd = new Date(lastMonthYear, lastMonth + 1, 0, 23, 59, 59).toISOString();
          
          const lastMonthUrl = `${this.baseUrl}/repos/${this.username}/${repo.name}/commits?since=${lastMonthStart}&until=${lastMonthEnd}&per_page=100`;
          const lastResponse = await fetch(lastMonthUrl);
          if (lastResponse.ok) {
            const lastCommits = await lastResponse.json();
            lastMonthCommits += lastCommits.length;
          }
        } catch (error) {
          console.error(`Error fetching commits for ${repo.name}:`, error);
          // Continue with other repos
        }
      }

      // Calculate percentage change
      const percentageChange = lastMonthCommits > 0 
        ? Math.round(((currentMonthCommits - lastMonthCommits) / lastMonthCommits) * 100)
        : currentMonthCommits > 0 ? 100 : 0;

      return {
        currentMonth: currentMonthCommits,
        lastMonth: lastMonthCommits,
        percentageChange: percentageChange
      };
    } catch (error) {
      console.error('Error fetching commit stats:', error);
      return {
        currentMonth: 0,
        lastMonth: 0,
        percentageChange: 0
      };
    }
  }
}

export default GitHubService;