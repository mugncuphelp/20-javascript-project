// Unsplash API
let count = 5;
const API_KEY = "holjsyUWqKfud7uO9YMFfYfloB1GbTtHNOdKFw9hors";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

export const state = {
  ready: false,
  imagesLoaded: 0,
  totalImages: 0,
  photosArray: [],
  count: 5,
  API_KEY: "holjsyUWqKfud7uO9YMFfYfloB1GbTtHNOdKFw9hors",
  apiUrl: `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`,
};

// Get photos from Unsplash API
export const getPhotos = async function () {
  try {
    console.log("Starting to Fetch photo from unsplash API");
    const response = await fetch(apiUrl);
    if (!response) throw new Error("Error");
    const data = await response.json();
    state.photosArray = data;
    console.log(
      "Finish fetching from API and updating state",
      state.photosArray
    );
    // displayPhotos();
  } catch (error) {
    console.error(error);
  }
};
