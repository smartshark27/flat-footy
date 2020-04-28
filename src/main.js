var game;

function handleLoad() {
  setViewbox(-(VIEWBOX_WIDTH / 2), -(VIEWBOX_HEIGHT / 2));
  game = new Game(TOP_TEAM_NAME, BOTTOM_TEAM_NAME);
}

function setViewbox(x, y, width = VIEWBOX_WIDTH, height = VIEWBOX_HEIGHT) {
  const canvas = document.getElementById("canvas");
  const viewBoxStr = `${x.toString()} ${y.toString()} ${width.toString()} ${height.toString()}`;
  canvas.setAttribute("viewBox", viewBoxStr);
}

function centreViewboxAt(x, y) {
  setViewbox(x - VIEWBOX_WIDTH / 2, y - VIEWBOX_HEIGHT / 2);
}

function convertClientToViewboxPoint(x, y) {
  const canvas = document.getElementById("canvas");
  const clientPoint = canvas.createSVGPoint();
  clientPoint.x = event.clientX;
  clientPoint.y = event.clientY;
  const transform = canvas.getScreenCTM().inverse();
  const viewboxPoint = clientPoint.matrixTransform(transform);
  return [viewboxPoint.x, viewboxPoint.y];
}

function resetGameAfter(milliseconds) {
  sleep(milliseconds).then(() => game.reset());
}
