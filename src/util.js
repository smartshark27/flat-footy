function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearArray(arr) {
  arr.length = 0;
}

function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getDistanceBetween(aX, aY, bX, bY) {
  const xDiff = Math.abs(aX - bX);
  const yDiff = Math.abs(aY - bY);
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

function calculateVelocity(x, y, targetX, targetY, speed) {
  console.log(x, y, targetX, targetY, speed);
  const displacementX = targetX - x;
  const displacementY = targetY - y;
  const angle = Math.atan(displacementY / displacementX);
  const speedX = Math.cos(angle) * speed;
  const speedY = Math.sin(angle) * speed;
  const velocityX = targetX >= x ? speedX : -speedX;
  const velocityY = targetX >= x ? speedY : -speedY;
  console.log(velocityX, velocityY);
  return [velocityX, velocityY];
}

function closelyEquals(a, b, margin) {
  return a <= b + margin && a >= b - margin;
}