class GitHub {
  constructor() {
    this.clientId = '3ae367c8d7ea6c63c9e8';
    this.clientSecret = '1f4cc535a4edf03a7cba5676706bbba29ce0c106';
    this.repoCount = 5;
    this.repoSort = 'created: asc';
  }

  async getUser(userName) {
    const profileResponse = await fetch(`https://api.github.com/users/${userName}?client_id=${this.clientId}&client_secret =${this.clientSecret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${this.repoCount}&sort=${this.repoSort}?client_id=${this.clientId}&client_secret =${this.clientSecret}`);

    const profileData = await profileResponse.json();
    const repo = await repoResponse.json();

    return {
      profileData,
      repo
    }
  }
}