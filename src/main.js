const FPS = 60;
const FRAME_DELAY = Math.floor(1000 / FPS);

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

var game;

function handleLoad() {
  setViewbox(
    -(VIEWBOX_WIDTH / 2),
    -(VIEWBOX_HEIGHT / 2),
    VIEWBOX_WIDTH,
    VIEWBOX_HEIGHT
  );
  game = new Game();
}

function setViewbox(x, y, width, height) {
  const canvas = document.getElementById("canvas");
  const viewBoxStr = `${x.toString()} ${y.toString()} ${width.toString()} ${height.toString()}`;
  canvas.setAttribute("viewBox", viewBoxStr);
}
