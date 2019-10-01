export default class Helper {
  getUrlParams() {
    return new URLSearchParams(window.location.search);
  }
}
