import config from "./config";

class DataProvider {
  async getPopularTvShows(page) {
    return await fetch(
      `${config.base_url}tv/popular?page=${page}&api_key=${config.api_key}`
    ).then(resp => {
      return resp.json();
    });
  }

  async getTvShowById(id) {
    return await fetch(
      `${config.base_url}tv/${id}?api_key=${config.api_key}`
    ).then(resp => {
      return resp.json();
    });
  }

  async getTvSeasonById(tvId, season) {
    return await fetch(
      `${config.base_url}tv/${tvId}/season/${season}?api_key=${config.api_key}`
    ).then(resp => {
      return resp.json();
    });
  }

  async getEpisodeById(tvId, season, episode) {
    return await fetch(
      `${
        config.base_url
      }tv/${tvId}/season/${season}/episode/${episode}?api_key=${config.api_key}`
    ).then(resp => {
      return resp.json();
    });
  }

  async getTopRated(page) {
    return await fetch(
      `${config.base_url}tv/top_rated?page=${page}&api_key=${config.api_key}`
    ).then(resp => {
      return resp.json();
    });
  }
}

export default new DataProvider();
