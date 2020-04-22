const BALL_RADIUS = 0.8;
const HEIGHT_SCALE = 0.3;
const BALL_SPEED = 8;
const BALL_UP_HEIGHT = 10;
const BALL_UP_START_HEIGHT = 0;
const BALL_MIN_TAP_RADIUS = 4;
const BALL_MAX_TAP_RADIUS = 12;

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

  throwUp() {
    game.screenButton.remove();
    var height = BALL_UP_START_HEIGHT;
    var velocity = BALL_SPEED / FPS;
    const interval = setInterval(() => {
      this.setHeight(height);
      height += velocity;
      if (height >= BALL_UP_HEIGHT) {
        velocity = -velocity;
      } else if (height <= BALL_UP_START_HEIGHT && velocity < 0) {
        clearInterval(interval);
        this.tapToRandomLocation();
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  getHeight() {
    const radius = this.getRadius();
    return this.generateHeightFromRadius(radius);
  }

  setHeight(height) {
    const radius = this.generateRadiusFromHeight(height);
    this.ball.setAttribute("rx", radius).setAttribute("ry", radius);
  }

  generateRadiusFromHeight(height) {
    return BALL_RADIUS + height * HEIGHT_SCALE;
  }

  generateHeightFromRadius(radius) {
    return (radius - BALL_RADIUS) / HEIGHT_SCALE;
  }

  getXY() {
    const x = Number(this.ball.getAttribute("cx"));
    const y = Number(this.ball.getAttribute("cy"));
    return [x, y];
  }

  setXY(x, y) {
    this.ball.setAttribute("cx", x).setAttribute("cy", y);
  }

  getRadius() {
    return Number(this.ball.getAttribute("rx"));
  }

  tapToRandomLocation() {
    const angle = generateRandomAngle();
    const distance = generateRandomNumberBetween(
      BALL_MIN_TAP_RADIUS,
      BALL_MAX_TAP_RADIUS
    );
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;
    this.moveTo(targetX, targetY);
    game.blueTeam.moveClosestPlayerTowardsBall(targetX, targetY);
    game.redTeam.moveClosestPlayerTowardsBall(targetX, targetY);
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
    const highestX = (targetX - x) / 2;
    const speedHeight =
      getDistanceBetween(x, y, x + velocityX, x + velocityY) / 2;
    var height = this.getHeight();
    var rising = true;
    const interval = setInterval(() => {
      x += velocityX;
      y += velocityY;
      this.setXY(x, y);

      height += rising ? speedHeight : -speedHeight;
      this.setHeight(height);
      if (closelyEquals(x, highestX, Math.abs(velocityX))) {
        rising = false;
      }

      if (
        closelyEquals(x, targetX, Math.abs(velocityX)) &&
        closelyEquals(y, targetY, Math.abs(velocityY))
      ) {
        this.setHeight(0);
        clearInterval(interval);
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }
}
