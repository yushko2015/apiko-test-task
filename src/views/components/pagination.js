export default class Pagination {
  render() {
    return `
      <div class="pagination">
        <button id="prev-btn" class="pagination-button">❮</button>
        <input id="page-input" value="1" type="text">
        <span>з</span>
        <span id="total-page"></span>
        <button id="next-btn" class="pagination-button">❯</button>
      </div>
    `;
  }

  afterRender() {
    let pageEl = document.getElementById("page-number");
    let prevBtn = document.getElementById("prev-btn");
    let nextBtn = document.getElementById("next-btn");
    let input = document.getElementById("page-input");

    prevBtn.addEventListener("click", () => {
      if (Number(input.value) > 1) {
        pageEl.value = Number(input.value) - 1;
        if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          pageEl.dispatchEvent(evt);
        } else pageEl.fireEvent("onchange");
      } else {
        pageEl.value = 1;
      }
    });

    nextBtn.addEventListener("click", () => {
      let total = Number(document.getElementById("total-page").innerHTML);
      if (Number(input.value) < total) {
        pageEl.value = Number(input.value) + 1;
        if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          pageEl.dispatchEvent(evt);
        } else pageEl.fireEvent("onchange");
      } else {
        pageEl.value = total;
      }
    });

    input.addEventListener("keydown", e => {
      const charCode = e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      }
    });
  }
}
