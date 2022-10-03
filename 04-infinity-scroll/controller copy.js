import * as model from "./model.js";
import photoView from "./photoView.js";

const controlGetPhoto = async function () {
  // get Photo from unsplash API and update model.state
  await model.getPhotos();
  console.log("Finish loading photo");
};

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", async () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
    model.state.ready
  ) {
    model.state.ready = false;

    console.log(`At the end, ready = ${model.state.ready}`);
    await controlGetPhoto();
    photoView.displayPhotos(model.state);
  }
});

const init = async function () {
  await controlGetPhoto();
  console.log(model.state);
  photoView.displayPhotos(model.state);
};
init();
