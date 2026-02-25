// SPA Hash Router
export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentPage = null;
    window.addEventListener('hashchange', () => this.navigate());
    // Navigate immediately – 'load' event has already fired by now
    this.navigate();
  }

  navigate() {
    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('/').filter(Boolean);

    let matched = null;
    let params = {};

    for (const route of this.routes) {
      const routeParts = route.path.split('/').filter(Boolean);

      if (routeParts.length !== parts.length) continue;

      let isMatch = true;
      const tempParams = {};

      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          tempParams[routeParts[i].slice(1)] = parts[i];
        } else if (routeParts[i] !== parts[i]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        matched = route;
        params = tempParams;
        break;
      }
    }

    if (!matched) {
      matched = this.routes.find(r => r.path === '/') || this.routes[0];
      params = {};
    }

    this.render(matched, params);
  }

  render(route, params) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '';
      route.render(app, params);
    }
  }

  static go(path) {
    window.location.hash = path;
  }
}
