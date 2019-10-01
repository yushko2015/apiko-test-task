import data from "../../DataProvider";
import card from "../components/card";
import pagination from "../components/pagination";
import Loader from "../components/loader";

class MoviesList {
  constructor() {
    this.pagination = new pagination();
  }

  render() {
    const view = `
      <section>
        <h1>Movies List</h1>
        <div class="toggle-container">
        <input type="hidden" id="page-number">
          <span class="toggle-container__title">Top Rated TV shows:</span>
          <label class="switch">
            <input id="toggle-input" type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
        <div id="list-container"></div>
        ${this.pagination.render()}
      </section>
    `;
    return view;
  }

  afterRender() {
    this.getPopular();
    this.toggleChange();
    this.pagination.afterRender();
    this.onNumberPageChange();
    this.onInputPageEnter();
  }

  toggleChange() {
    let toggle = document.getElementById("toggle-input");
    let pageEl = document.getElementById("page-number");
    let input = document.getElementById("page-input");
    toggle.addEventListener("change", event => {
      pageEl.value = 1;
      input.vaue = 1;
      if (toggle.checked === true) {
        this.getRated(1);
      } else {
        this.getPopular(1);
        pageEl.value = 1;
        input.vaue = 1;
      }
    });
  }

  getRated(page) {
    let list = "";
    document.getElementById("list-container").innerHTML = new Loader().render();
    data.getTopRated(page).then(data => {
      for (let movie of data.results) {
        list += card.render(
          movie,
          "original_name",
          "vertical",
          [300, 450],
          "movie",
          `id=${movie.id}`
        );
      }
      document.getElementById("list-container").innerHTML = list;
      document.getElementById("total-page").innerHTML = data.total_pages;
    });
  }

  async getPopular(page) {
    let list = "";
    document.getElementById("list-container").innerHTML = new Loader().render();
    await data.getPopularTvShows(page).then(data => {
      for (let movie of data.results) {
        list += card.render(
          movie,
          "name",
          "vertical",
          [300, 450],
          "movie",
          `id=${movie.id}`
        );
      }
      document.getElementById("total-page").innerHTML = data.total_pages;
    });
    document.getElementById("list-container").innerHTML = list;
  }

  onNumberPageChange() {
    let pageEl = document.getElementById("page-number");
    let input = document.getElementById("page-input");
    let toggle = document.getElementById("toggle-input");
    pageEl.addEventListener("change", () => {
      let page = pageEl.value;
      input.value = page;
      if (toggle.checked === true) {
        this.getRated(page);
      } else {
        this.getPopular(page);
      }
    });
  }

  onInputPageEnter() {
    let input = document.getElementById("page-input");
    let toggle = document.getElementById("toggle-input");
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        if (toggle.checked === true) {
          this.getRated(input.value);
        } else {
          this.getPopular(input.value);
        }
        event.preventDefault();
        // Do more work
      }
    });
  }
}

export default MoviesList;
