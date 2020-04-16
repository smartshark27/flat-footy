const FPS = 60;
const FRAME_DELAY = Math.floor(1000 / FPS);

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

const BOUNDARY_WIDTH = 100;
const BOUNDARY_HEIGHT = 160;
const GRASS_WIDTH = BOUNDARY_WIDTH + 20;
const GRASS_HEIGHT = BOUNDARY_HEIGHT + 20;
const CENTRE_SQUARE_WIDTH = 50;
const CENTRE_SQUARE_HEIGHT = 50;
const CENTRE_CIRCLE_RADIUS = 5;
const CENTRE_INNER_CIRCLE_RADIUS = 1.5;
const FIFTY_LINE_DISTANCE_FROM_GOAL = 45;
const GOAL_SQUARE_LENGTH = 9;
const POST_SEPARATION = 6.4;
const POST_RADIUS = 0.5;

const LINE_WIDTH = 0.5;

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
  console.log(viewBoxStr);
  canvas.setAttribute("viewBox", viewBoxStr);
}
