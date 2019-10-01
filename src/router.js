class Router {
  constructor(routes) {
    this.routes = routes;
    this.content = null || document.getElementById("app");
  }

  async onNavigate() {
    const pathname = window.location.pathname;
    window.history.pushState({}, pathname, window.location.href);
    let page = this.routes[window.location.pathname];
    this.content.innerHTML = await new page().render();
    await new page().afterRender();
  }
}

export default Router;
