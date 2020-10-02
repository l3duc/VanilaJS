class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  showProfile(profile) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${profile.avatar_url}">
            <a href="${profile.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repo: ${profile.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${profile.public_gits}</span>
            <span class="badge badge-success">Followers: ${profile.followers}</span>
            <span class="badge badge-primary">Following: ${profile.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${profile.company}</li>
              <li class="list-group-item">Website/blog: ${profile.blog}</li>
              <li class="list-group-item">Location: ${profile.location}</li>
              <li class="list-group-item">Member since: ${profile.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repo"></div>
    `;
  }

  clearProfile() {
    this.profile.innerHTML='';
    this.clearAlert();
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.searchContainer');

    const search = document.querySelector('.search');

    container.insertBefore(div, search);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  showRepo(repo) {
    let output = '';

    repo.forEach((item) => {
      output += `
        <div class="card card-body mb-2">
          <div class="col-md-6">
            <a href="${item.html_url}" target="_blank">${item.name}</a>
          </div>
          <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${item.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${item.watchers}</span>
            <span class="badge badge-success">Forks: ${item.forms_count}</span>
          </div>
        </div>
      `;
      document.getElementById('repo').innerHTML = output;
    })
  }
}