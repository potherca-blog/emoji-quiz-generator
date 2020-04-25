/*global createImage, html2canvas, populateTemplate, URLSearchParams*/
const urlSearchParams = new URLSearchParams(window.location.search);

window.addEventListener('DOMContentLoaded', event => {
  // DOM loaded and parsed
  populateTemplate(document, urlSearchParams);
});

window.addEventListener('load', event => {
  // Page loaded, including all stylesheets and images
  createImage(window, urlSearchParams, html2canvas)
});
