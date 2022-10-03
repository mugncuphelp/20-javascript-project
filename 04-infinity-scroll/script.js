const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const API_KEY = "holjsyUWqKfud7uO9YMFfYfloB1GbTtHNOdKFw9hors";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

// Helper function
// Set the attibutes of created elements
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Check if all image is loaded
const imageloaded = function () {
  console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 10;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;
    console.log(`ready = ${ready}`);
  }
};

// Create Element for links and photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log(`total images : ${totalImages}`);

  photosArray.forEach((photo) => {
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
    img.addEventListener("load", imageloaded);

    // Put <img> into <a>, then put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
const getPhotos = async function () {
  try {
    console.log("Starting");
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // error
  }
};

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;

    console.log(`At the end, ready = ${ready}`);
    getPhotos();
  }
});

//  On Load
getPhotos();
