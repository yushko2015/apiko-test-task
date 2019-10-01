import helper from "../../Helper";
import data from "../../DataProvider";
import card from "../components/card";
import Loader from "../components/loader";

class SeasonDetail {
  render() {
    const view = `
      <section>
        <div id="movie-detail"></div>
      </section>
    `;
    return view;
  }

  async afterRender() {
    document.getElementById("movie-detail").innerHTML = new Loader().render();
    let details = "";
    let id = new helper().getUrlParams().get("tvId");
    let seasonNumber = new helper().getUrlParams().get("season");
    let listOfEpisodes = "";
    await data.getTvSeasonById(id, seasonNumber).then(data => {
      for (let episode of data.episodes) {
        listOfEpisodes += card.render(
          episode,
          "name",
          "horizontal",
          [227, 127],
          "episode",
          `tvId=${id}&season=${seasonNumber}&episode=${episode.episode_number}`
        );
      }
      details = `       
        <div class="details">
          <div class="details-main-content">
            <div class="poster-container">
                <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                  data.poster_path
                }" />
            </div>
            <div class="overview-text">
              <h2>${data.name}</h2>
              <span class="movie-date">${data.air_date}</span>
              <p>${data.overview}</p>
            </div>     
          </div>
          <div class="seasons-list">
            <label class="list-label">Episodes (${
              data.episodes.length
            }):</label> 
            ${listOfEpisodes}
          </div>               
        </div>        
      `;
      document.getElementById("movie-detail").innerHTML = details;
    });
  }
}

export default SeasonDetail;
