const BALL_RADIUS_X = 0.6;
const BALL_RADIUS_Y = 0.8;
const BALL_COLLECT_RADIUS = (BALL_RADIUS_X + BALL_RADIUS_Y) / 2;
const HEIGHT_SCALE = 0.1;
const BALL_SPEED = 12;
const BALL_UP_HEIGHT = 10;
const BALL_UP_START_HEIGHT = 0;
const BALL_MIN_TAP_RADIUS = 4;
const BALL_MAX_TAP_RADIUS = 12;
const BALL_SPIN_MIN_RADIUS_Y = 0.5;
const BALL_SPIN_NUMBER_OF_FRAMES = 3;

class Ball extends Component {
  constructor() {
    super();
    this.setSpinRadiuses();
    this.spinRadiusYIndex = 0;
    this.player = null;
    this.draw();
  }

  draw() {
    const radiusX = this.generateRadiusXFromHeight(0);
    const radiusY = this.generateRadiusYFromHeight(0);
    this.ball = SVG.new("ellipse")
      .setAttribute("cx", 0)
      .setAttribute("cy", 0)
      .setAttribute("rx", radiusX)
      .setAttribute("ry", radiusY)
      .setAttribute("fill", COLORS.YELLOW);
    this.addElement(this.ball);
  }

  setSpinRadiuses() {
    const firstHalf = [];
    const shrinkPerFrame =
      (BALL_RADIUS_Y - BALL_SPIN_MIN_RADIUS_Y) / BALL_SPIN_NUMBER_OF_FRAMES;
    for (
      var y = BALL_RADIUS_Y;
      y >= BALL_SPIN_MIN_RADIUS_Y;
      y -= shrinkPerFrame
    ) {
      firstHalf.push(y);
    }
    this.spinRadiuses = mirror(firstHalf);
  }

  throwUp() {
    var height = BALL_UP_START_HEIGHT;
    var velocity = BALL_SPEED / FPS;
    this.setHeight(height);
    const interval = setInterval(() => {
      height += velocity;
      if (height >= BALL_UP_HEIGHT) {
        velocity = -velocity;
      } else if (height <= BALL_UP_START_HEIGHT) {
        height = BALL_UP_START_HEIGHT;
      }
      this.setHeight(height);
      if (height <= BALL_UP_START_HEIGHT && velocity < 0) {
        clearInterval(interval);
        this.ball
          .setAttribute("rx", BALL_RADIUS_X)
          .setAttribute("ry", BALL_RADIUS_Y);
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  getHeight() {
    const radiusX = this.getRadiusX();
    return this.generateHeightFromRadiusX(radiusX);
  }

  setHeight(height) {
    const radiusX = this.generateRadiusXFromHeight(height);
    const radiusY = this.generateRadiusYFromHeight(height);
    this.ball.setAttribute("rx", radiusX).setAttribute("ry", radiusY);
  }

  generateRadiusXFromHeight(height) {
    return BALL_RADIUS_X + height * HEIGHT_SCALE;
  }

  generateRadiusYFromHeight(height) {
    return BALL_RADIUS_Y + height * HEIGHT_SCALE;
  }

  generateHeightFromRadiusX(radius) {
    return (radius - BALL_RADIUS_X) / HEIGHT_SCALE;
  }

  getXY() {
    const x = Number(this.ball.getAttribute("cx"));
    const y = Number(this.ball.getAttribute("cy"));
    return [x, y];
  }

  setXY(x, y) {
    this.ball.setAttribute("cx", x).setAttribute("cy", y);
  }

  getRadiusX() {
    return Number(this.ball.getAttribute("rx"));
  }

  setRadiusY(radius) {
    this.ball.setAttribute("ry", radius);
  }

  tapToRandomLocation() {
    const degrees = 30;
    // const angle = generateRandomAngle();
    const distance = generateRandomNumberBetween(
      BALL_MIN_TAP_RADIUS,
      BALL_MAX_TAP_RADIUS
    );
    const [x, y] = this.getXY();
    const targetX = Math.cos(toRadians(degrees)) * distance + x;
    const targetY = Math.sin(toRadians(degrees)) * distance + y;
    this.moveTo(targetX, targetY);
    game.moveClosestPlayersTowardsBall(targetX, targetY);
  }

  moveTo(targetX, targetY) {
    const speed = BALL_SPEED / FPS;
    var [x, y] = this.getXY();
    const [velocityX, velocityY] = calculateVelocity(
      x,
      y,
      targetX,
      targetY,
      speed
    );
    const degrees = getDirection(velocityX, velocityY);
    const interval = setInterval(() => {
      x += velocityX;
      y += velocityY;
      this.setXY(x, y);
      this.rotate(degrees);
      this.spin();
      game.centreAt(x, y);
      if (
        closelyEquals(x, targetX, Math.abs(velocityX)) &&
        closelyEquals(y, targetY, Math.abs(velocityY))
      ) {
        clearInterval(interval);
        game.ball.resetSpin();
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  rotate(degrees) {
    const [x, y] = this.getXY();
    this.ball.rotateAbout(degrees, x, y);
  }

  spin() {
    this.spinRadiusYIndex =
      (this.spinRadiusYIndex + 1) % this.spinRadiuses.length;
    this.setRadiusY(this.spinRadiuses[this.spinRadiusYIndex]);
  }

  resetSpin() {
    this.spinRadiusYIndex = this.spinRadiuses.length - 1;
    this.spin();
  }
}
