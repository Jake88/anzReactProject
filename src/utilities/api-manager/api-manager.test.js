import ApiManager from './api-manager';
import axios from 'axios';

describe('api-manager', () => {
  beforeEach(() => {
    spyOn(axios, 'get');
  });

  describe('searchGitHubUsers', () => {
    it('should throw an error if no search query is provided', () => {
      expect(() => ApiManager.searchGitHubUsers()).toThrow();
    });

    it('should make a http get call to retrieve a search of users with default params', () => {
      ApiManager.searchGitHubUsers({searchString: 'jake'});
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/search/users', 
        {
          params: {
            page: 1, 
            per_page: 21, 
            q: 'jake'
          }
        }
      );
    });
    
    it('should make a http get call to retrieve a search of users with specified params', () => {
      ApiManager.searchGitHubUsers({
        searchString: 'jake',
        page: 3,
        per_page: 40
      });
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/search/users', 
        {
          params: {
            page: 3, 
            per_page: 40, 
            q: 'jake'
          }
        }
      );
    });
  });

   describe('getGitHubUser', () => {
    it('should throw an error if no username is provided', () => {
      expect(() => ApiManager.getGitHubUser()).toThrow();
    });

    it('should make a http get call to retrieve a search of users with default params', () => {
      ApiManager.getGitHubUser({username: 'jake'});
      expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/jake');
    });
   });
  
});
