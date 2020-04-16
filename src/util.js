function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearArray(arr) {
  arr.length = 0;
}

function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}
