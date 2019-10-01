class Card {
  render(data, name, type, posteSize, route, params) {
    let view = `
      <a href="/${route}?${params}">
        <div class="card ${type}-card">
          <img class="${type}-card-image" src="https://image.tmdb.org/t/p/w${
      posteSize[0]
    }_and_h${posteSize[1]}_bestv2${
      data.poster_path ? data.poster_path : data.still_path
    }" />
          <div class="card-title">
            <h2>
                ${data[name]}
            </h2>
          </div>
        </div>
      </a>
    `;

    return view;
  }
}

export default new Card();
