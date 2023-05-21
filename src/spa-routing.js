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

  // Form a selector that matches all routes in the trail...
  // Example: "spa-route[path='/products'], spa-route[path='/products/1']"
  const selector = window.location.pathname
    .split("/")
    .slice(1)
    .reduce((total, x) => [...total, `${total.at(-1) || ""}/${x}`], [])
    .map((x) => `spa-route[path='${x}']`)
    .join(", ");

  // Activate all matching routes
  document.querySelectorAll(selector).forEach((x) => {
    x.active = true;
  });
});

/**
 * The web component to wrap the contents of a "route" in. Rendering these will automatically find matching links and make them use SPA navigation.
 */
class SpaRoute extends HTMLElement {
  constructor() {
    super();
    this.path = null;
    this.active = null;
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
  history.pushState(null, null, e.target.pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
