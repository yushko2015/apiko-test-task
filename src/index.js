import "./styles.css";
import Router from "./router";
import MoviesList from "./views/pages/MoviesList";
import MovieDetail from "./views/pages/MovieDetail";
import SeasonDetail from "./views/pages/SeasonDetail";
import EpisodeDetail from "./views/pages/EpisodeDetail";

const routes = {
  "/": MoviesList,
  "/movie": MovieDetail,
  "/season": SeasonDetail,
  "/episode": EpisodeDetail
};

window.addEventListener("hashchange", new Router(routes).onNavigate());
