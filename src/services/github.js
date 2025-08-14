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
      const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
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
      const response = await fetch(`${this.baseUrl}/repos/${this.username}/${repoName}/readme`);
      if (!response.ok) {
        if (response.status === 404) {
          return null; // No README found
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      // Decode base64 content
      const content = atob(data.content);
      return content;
    } catch (error) {
      console.error(`Error fetching README for ${repoName}:`, error);
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
}

export default GitHubService;