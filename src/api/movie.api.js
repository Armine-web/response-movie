class OMDBApi {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = "https://www.omdbapi.com/";
    }
  
    async fetchByID(id) {
      try {
        const response = await fetch(
          `${this.baseUrl}?i=${id}&apikey=${this.apiKey}`
        );
        const data = await response.json();
        return {
          success: data.Response === "True",
          data,
          error: data.Response === "True" ? null : data.Error,
        };
      } catch (error) {
        return { success: false, data: null, error: error.message };
      }
    }
  
    async fetchMoviesBySearch(query, page = 1) {
      try {
        const response = await fetch(
          `${this.baseUrl}?s=${encodeURIComponent(query)}&page=${page}&apikey=${
            this.apiKey
          }`
        );
        const data = await response.json();
        return {
          success: data.Response === "True",
          data: data,
          error: data.Response === "True" ? null : data.Error,
        };
      } catch (error) {
        return { success: false, data: [], error: error.message };
      }
    }
  }
  
  export const omdbApi = new OMDBApi("397fac80");
  
  // Example usage:
  // const omdb = new OMDB('your_api_key_here');
  // omdb.fetchMovie('Inception').then(console.log);
  // omdb.fetchMoviesBySearch('Batman', 1).then(console.log);