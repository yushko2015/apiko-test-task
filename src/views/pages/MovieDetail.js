import helper from "../../Helper";
import data from "../../DataProvider";
import card from "../components/card";
import Loader from "../components/loader";

class MovieDetail {
  render() {
    const view = `
      <section>
        <div id="movie-detail"></div>
      </section>
    `;
    return view;
  }

  async afterRender() {
    let details = "";
    let id = new helper().getUrlParams().get("id");
    let listOfSeasons = "";
    document.getElementById("movie-detail").innerHTML = new Loader().render();
    await data.getTvShowById(id).then(data => {
      for (let season of data.seasons) {
        listOfSeasons += card.render(
          season,
          "name",
          "horizontal",
          [260, 390],
          "season",
          `tvId=${id}&season=${season.season_number}`
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
              <h2>${data.original_name}</h2>
              <span class="movie-date">${data.first_air_date}</span>
              <p>${data.overview}</p>
              <div class="extra-description">
                <span>Seasons: ${data.number_of_seasons} | </span>
                <span>Episodes: ${data.number_of_episodes}</span>
              </div>
            </div>     
          </div>
          <div class="seasons-list">
            <label class="list-label">Seasons:</label> 
            ${listOfSeasons}
          </div>               
        </div>        
      `;
      document.getElementById("movie-detail").innerHTML = details;
    });
    // document.getElementById("list-container").innerHTML = list;
  }
}

export default MovieDetail;
