import { setAttributes, imageloaded } from "./helper.js";

class PhotoView {
  imageContainer = document.getElementById("image-container");
  loader = document.getElementById("loader");

  // Create Element for links and photos and add to DOM
  displayPhotos(stateData) {
    console.log("Start displaying photo");
    console.log("from displayPhoto()", stateData);
    console.log(stateData.photosArray);
    stateData.imagesLoaded = 0;
    stateData.totalImages = stateData.photosArray.length;
    console.log(`total images : ${stateData.totalImages}`);

    stateData.photosArray.forEach((photo) => {
      // // Create <a> to link  to unsplash
      const item = document.createElement("a");

      setAttributes(item, {
        href: photo.links.html,
        target: "_blank",
      });

      // Create <img> for photo
      const img = document.createElement("img");
      setAttributes(img, {
        src: photo.urls.small,
        alt: photo.alt_description,
        title: photo.alt_description,
      });

      // Event listener, check when each has finished loading
      img.addEventListener("load", function () {
        imageloaded(stateData, loader);
      });

      // Put <img> into <a>, then put both inside imageContainer
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  }
}

export default new PhotoView();
