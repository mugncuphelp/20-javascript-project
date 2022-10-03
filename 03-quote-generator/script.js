"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterbtn = document.getElementById("twitter");
const newQuotebtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author ? quote.author : "Unknown";

  // check quote length for styling
  quote.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quote from api
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// event Listener
newQuotebtn.addEventListener("click", newQuote);
twitterbtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
