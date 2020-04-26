function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearArray(arr) {
  arr.length = 0;
}

function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getDistanceBetween(aX, aY, bX, bY) {
  const xDiff = Math.abs(aX - bX);
  const yDiff = Math.abs(aY - bY);
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

function calculateVelocity(x, y, targetX, targetY, speed) {
  const displacementX = targetX - x;
  const displacementY = targetY - y;
  const angle = Math.atan(displacementY / displacementX);
  const speedX = Math.cos(angle) * speed;
  const speedY = Math.sin(angle) * speed;
  const velocityX = targetX >= x ? speedX : -speedX;
  const velocityY = targetX >= x ? speedY : -speedY;
  return [velocityX, velocityY];
}

function closelyEquals(a, b, margin) {
  return a <= b + margin && a >= b - margin;
}

function generateRandomAngle() {
  return generateRandomNumberBetween(0, 360);
}

function mirror(array) {
  return array.concat(cloneArray(array).reverse());
}

function cloneArray(array) {
  return array.slice(0);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function getDirection(velocityX, velocityY) {
  // Degrees clockwise from 12 o'clock
  var degrees = toDegrees(Math.atan(velocityY / velocityX)) + 90;
  if (isNegative(velocityX)) {
    degrees += 180;
  }
  return degrees;
}

function isNegative(n) {
  return n < 0;
}

function isPointInRect(x, y, rect) {
  const rectBoundary = rect.getBoundary();
  return (
    x >= rectBoundary.left &&
    x <= rectBoundary.right &&
    y >= rectBoundary.top &&
    y <= rectBoundary.bottom
  );
}

function hap() {
  // Used for debugging. Yeah I'm good
  console.log("Happened");
}

function log(...things) {
  console.log(...things);
}