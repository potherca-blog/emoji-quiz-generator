/*
 * @TODO: Place commented logic into function with comment as name
 * @TODO: Shrink font-size if emoji goes out of viewport
 * @TODO: Shrink font-size if topic goes out of ribbon
 *
 * If the .emoji-song-quiz__topic "font-size" is made smalle (to fit the
 * content), two things need to happen:
 *
 * 1. The "bottom" of .emoji-song-quiz__topic-container needs to be increased
 * 2. The "font-size" of .emoji-song-quiz__topic--description needs to be decreased
 */

const populateTemplate = (document, urlParams) => {
  const decorateParameters = (document, urlParams, parameters) => {
    if (parameters.topic !== "") {
      if (parameters.month === "") {
        // @FIXME: This should be changed to having two <p> tags in the HTML
        document.querySelector(
          ".emoji-song-quiz__topic"
        ).innerHTML = `This episode's theme is <b class="emoji-song-quiz__topic--name js-topic" data-js="topic">${parameters.topic}</b>`;
      }
    }

    if (urlParams.has("follow-up") === false) {
      // parameters['follow-up'] = 'Open the thread to answer...'
    }

    if (parameters.episode !== "") {
      parameters.episode = parameters.episode.padStart(3, "0");
    }
  };

  const keys = [
    "description",
    "emoji",
    "episode",
    "follow-up",
    "month",
    "topic",
    "type"
  ];

  // Grab URL parameters
  const parameters = {};
  keys.forEach(name => (parameters[name] = urlParams.get(name) || ""));

  decorateParameters(document, urlParams, parameters);

  // Add CSS classes to body for missing items
  keys.forEach(name => {
    if (parameters[name] === "") {
      document
        .querySelector(".emoji-song-quiz")
        .classList.add(`emoji-song-quiz--no-${name}`);
    }
  });

  // Add values to HTML elements
  Object.keys(parameters).forEach(
    item => (document.querySelector(`.js-${item}`).innerText = parameters[item])
  );
};
