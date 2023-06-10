let root = "/";

/**
 * Sets the path to which every route path will be relative.
 * @param {string} newRoot
 */
export function setRoot(newRoot) {
  root = newRoot;

  syncLinksWithRoutes(
    document.querySelectorAll("a"),
    document.querySelectorAll("spa-route")
  );
}

// Remove filename from address
if (location.pathname.match(/\.html$/)) {
  const url = new URL(location);
  url.pathname = url.pathname.replace(/\/.*\.html$/, "");
  history.replaceState(null, null, url.pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

window.addEventListener("load", () => {
  // Observe for <a> elements added/removed to/from the document and sync them.
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        [...mutation.addedNodes, ...mutation.removedNodes].find(
          (x) => x.tagName == "A"
        )
      ) {
        syncLinksWithRoutes(
          document.querySelectorAll("a"),
          document.querySelectorAll("spa-route")
        );
      }
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });

  // Trigger the initial route activation(s)
  window.dispatchEvent(new PopStateEvent("popstate"));
});

window.addEventListener("popstate", (e) => {
  // Deactivate all active routes
  document
    .querySelectorAll("spa-route[active]")
    .forEach((x) => (x.active = false));

  const routes = document.querySelectorAll(
    `spa-route[path='${window.location.pathname}']`
  );

  routes.forEach((x) => {
    // Activate this route and all ancestor routes...
    for (
      let route = x;
      route;
      route = route.parentElement.closest("spa-route")
    ) {
      route.active = true;
    }
  });

  if (!routes.length && window.location.pathname != root) {
    history.replaceState(null, null, root);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
});

/**
 * The web component to wrap the contents of a "route" in. Rendering these will automatically find matching links and make them use SPA navigation.
 */
class SpaRoute extends HTMLElement {
  constructor() {
    super();
    this._path = null;
    this._active = null;
    this.ignoreMutations = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot></slot>`;
  }

  static get observedAttributes() {
    return ["path", "active"];
  }

  set active(newValue) {
    if (this.shadowRoot) {
      this.ignoreMutations = true;
      if (newValue) {
        this.setAttribute("active", "");
      } else {
        this.removeAttribute("active");
      }
      this.ignoreMutations = false;
    }
  }

  get active() {
    return this._active;
  }

  set path(newValue) {
    this.ignoreMutations = true;
    this._path = newValue;
    this.setAttribute("path", newValue);
    this.ignoreMutations = false;
  }

  get path() {
    return this._path;
  }

  connectedCallback() {
    syncLinksWithRoutes(
      document.querySelectorAll("a"),
      document.querySelectorAll("spa-route")
    );
  }

  disconnectedCallback() {
    syncLinksWithRoutes(
      document.querySelectorAll("a"),
      document.querySelectorAll("spa-route")
    );
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (this.ignoreMutations) return;
    this[property] = newValue;
  }
}

window.customElements.define("spa-route", SpaRoute);

/**
 * Add the `pushStateOnClick` click event handler to links with `href`s that match route paths, and remove it from those with no match.
 * @param {HTMLAnchorElement[]|NodeList} links
 * @param {SpaRoute[]|NodeList} routes
 */
function syncLinksWithRoutes(links, routes) {
  links.forEach((x) => {
    if (x.pathname && !x.pathname.startsWith(root))
      x.pathname = root + x.pathname;
  });
  routes.forEach((x) => {
    if (x.path && !x.path.startsWith(root)) x.path = root + x.path;
  });

  links.forEach((link) => {
    if (link.origin == window.location.origin) {
      if (routeMatchExists(link.pathname, [...routes])) {
        link.addEventListener("click", pushStateOnClick);
      } else {
        link.removeEventListener("click", pushStateOnClick);
      }
    }
  });
}

/**
 * Returns `true` if a route matching the given path exists, otherwise `false`.
 * @param {string} path
 * @param {SpaRoute[]} routes
 * @returns {boolean}
 */
function routeMatchExists(path, routes) {
  return routes.find((x) => x.path == path);
}

/**
 * Navigate to the SPA route of the clicked link.
 * @param {MouseEvent} e
 */
function pushStateOnClick(e) {
  e.preventDefault();
  history.pushState(null, null, e.currentTarget.pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
