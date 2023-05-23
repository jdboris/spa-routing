<!-- Source: https://github.com/othneildrew/Best-README-Template -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jdboris/spa-routing">
    <img src="images/logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">SPA Routing</h3>

  <p align="center">
    Simple, lightweight routing for SPAs.
    <br />
    <a href="https://jdboris.github.io/spa-routing/demo">View Demo</a>
    ·
    <a href="https://github.com/jdboris/spa-routing/issues">Report Bug</a>
    ·
    <a href="https://github.com/jdboris/spa-routing/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![SPA Routing Screen Shot][product-screenshot]](https://jdboris.github.io/spa-routing/demo)

Turn your web app into a Single Page App quickly and easily without tons of refactoring or tight coupling.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prerequisites

For initial navigation to your routes (i.e. visiting `example.com/route` directly) to work, you'll need to configure your server to direct all traffic to your app.

#### Example (express.js)

```javascript
app.get(/.*/, (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

#### CDN

```html
<script
  src="https://cdn.jsdelivr.net/gh/jdboris/spa-routing@latest/dist/spa-routing.js"
  type="module"
></script>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. (OPTIONAL) Set the root of your app, if it's not the same as the origin.

   ```html
   <script type="module">
     import { setRoot } from "https://cdn.jsdelivr.net/gh/jdboris/spa-routing@latest/dist/spa-routing.js";
     setRoot("/example/root");
   </script>
   ```

2. Wrap route content in the `<spa-route>` tag, with an appropriate `path` attribute value.

   ```html
   <spa-route path="/home">
     <h1>Home</h1>
     ...
   </spa-route>
   ```

3. Add links to those route(s).

   ```html
   <a href="/home">Home</a>
   ```

4. Style `<spa-route>` elements in active/inactive states using the `active` attribute.

   ```css
   spa-route:not([active]) {
     display: none;
   }
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/jdboris/spa-routing.svg?style=for-the-badge
[contributors-url]: https://github.com/jdboris/spa-routing/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jdboris/spa-routing.svg?style=for-the-badge
[forks-url]: https://github.com/jdboris/spa-routing/network/members
[stars-shield]: https://img.shields.io/github/stars/jdboris/spa-routing.svg?style=for-the-badge
[stars-url]: https://github.com/jdboris/spa-routing/stargazers
[issues-shield]: https://img.shields.io/github/issues/jdboris/spa-routing.svg?style=for-the-badge
[issues-url]: https://github.com/jdboris/spa-routing/issues
[license-shield]: https://img.shields.io/github/license/jdboris/spa-routing.svg?style=for-the-badge
[license-url]: https://github.com/jdboris/spa-routing/blob/master/LICENSE.txt
[product-screenshot]: https://raw.githubusercontent.com/jdboris/spa-routing/9a23e50128f8f70104a144e3c040d1553ce7ff90/images/demo.gif
