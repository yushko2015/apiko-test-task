import helper from "../../Helper";
import data from "../../DataProvider";
import Loader from "../components/loader";

class EpisodeDetail {
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
    let id = new helper().getUrlParams().get("tvId");
    let seasonNumber = new helper().getUrlParams().get("season");
    let episodeNumber = new helper().getUrlParams().get("episode");
    document.getElementById("movie-detail").innerHTML = new Loader().render();
    await data.getEpisodeById(id, seasonNumber, episodeNumber).then(data => {
      console.log(data);
      details = `       
        <div class="details">
          <div class="details-main-content">
            <div class="poster-container">
                <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                  data.still_path
                }" />
            </div>
            <div class="overview-text">
              <span>Season: ${seasonNumber} | Episode: ${episodeNumber}</span>
              <h3>${data.name}</h3>
              <span class="movie-date">${data.air_date}</span>
              <p>${data.overview}</p>
            </div>     
          </div>               
        </div>        
      `;
      document.getElementById("movie-detail").innerHTML = details;
    });
  }
}

export default EpisodeDetail;
