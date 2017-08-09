import axios from 'axios';

const GITHUB_ROOT = 'https://api.github.com';

class ApiManager {
  searchGitHubUsers({searchString, per_page = 21, page = 1}) {
    if (!searchString) throw new Error('A search query is required');
    return axios.get(`${GITHUB_ROOT}/search/users`, {
      params: {
        q: searchString,
        page,
        per_page
      }
    });
  }
}

export default new ApiManager();