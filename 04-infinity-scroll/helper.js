// Set the attibutes of created elements
export const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Check if all image is loaded
export const imageloaded = function (stateData, loader) {
  console.log("image loaded");
  stateData.imagesLoaded++;
  if (stateData.imagesLoaded === stateData.totalImages) {
    stateData.ready = true;
    loader.hidden = true;
    stateData.count = 10;
    stateData.apiUrl = `https://api.unsplash.com/photos/random/?client_id=${stateData.API_KEY}&count=${stateData.count}`;
    console.log(`ready = ${stateData.ready}`);
  }
};
