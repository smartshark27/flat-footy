const BALL_RADIUS = 1;
const HEIGHT_SCALE = 0.3;
const BALL_SPEED_M_S = 10;
const BALL_UP_HEIGHT = 10;
const BALL_UP_START_HEIGHT = 0;

class Ball extends Component {
  constructor() {
    super();
    this.draw();
  }

  draw() {
    const radius = this.generateRadiusFromHeight(0);
    this.ball = SVG.new("ellipse")
      .setAttribute("cx", 0)
      .setAttribute("cy", 0)
      .setAttribute("rx", radius)
      .setAttribute("ry", radius)
      .setAttribute("fill", COLORS.YELLOW);
    this.addElement(this.ball);
  }

  ballUp() {
    var height = BALL_UP_START_HEIGHT;
    var velocity = BALL_SPEED_M_S / FPS;
    const interval = setInterval(() => {
      this.setHeight(height);
      height += velocity;
      if (height >= BALL_UP_HEIGHT) {
        velocity = -velocity;
      } else if (height <= BALL_UP_START_HEIGHT && velocity < 0) {
        clearInterval(interval);
      }
    }, FRAME_DELAY);
  }

  setHeight(height) {
    const radius = this.generateRadiusFromHeight(height);
    this.ball.setAttribute("rx", radius).setAttribute("ry", radius);
  }

  generateRadiusFromHeight(height) {
    return BALL_RADIUS + height * HEIGHT_SCALE;
  }

  // moveTo(newX, newY, height) {
  //   const [x, y] = this.getPosition();
  //   const interval = setInterval(() => {

  //     if (x === newX && y === newY && z === height) {
  //       clearInterval(interval);
  //     }
  //   }, FRAME_DELAY);
  // }

  // getPosition() {
  //   const x = this.ball.getAttribute("cx");
  //   const y = this.ball.getAttribute("cy");
  //   return [x, y];
  // }

  // setPosition(x, y, height) {
  //   this.ball
  //     .setAttribute("cx", x)
  //     .setAttribute("cy", y)
  //     .setAttribute("r", this.generateRadiusFromHeight(height));
  // }
}
