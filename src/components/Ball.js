const BALL_RADIUS_X = 0.6;
const BALL_RADIUS_Y = 0.8;
const BALL_COLLECT_RADIUS = (BALL_RADIUS_X + BALL_RADIUS_Y) / 2;
const HEIGHT_SCALE = 0.3;
const BALL_SPEED = 12;
const BALL_UP_HEIGHT = 10;
const BALL_UP_START_HEIGHT = 0;
const BALL_MIN_TAP_RADIUS = 4;
const BALL_MAX_TAP_RADIUS = 12;
const BALL_SPIN_MIN_RADIUS_Y = 0.5;
const BALL_SPIN_NUMBER_OF_FRAMES = 3;
const BOUNDARY_CROSSED_RESET_DELAY = 2000;
const OUT_OF_BOUNDS_ON_THE_FULL_MESSAGE = "Out on the full!";

class Ball extends Component {
  constructor() {
    super();
    this.height = BALL_UP_START_HEIGHT;
    this.setSpinRadiuses();
    this.spinRadiusIndex = 0;
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
    return this.height;
  }

  setHeight(height) {
    if (height < 0) {
      height = 0;
    }
    const radiusX = this.generateRadiusXFromHeight(height);
    const radiusY = this.generateRadiusYFromHeight(height);
    this.ball.setAttribute("rx", radiusX).setAttribute("ry", radiusY);
    this.height = height;
  }

  generateRadiusXFromHeight(height) {
    return BALL_RADIUS_X + BALL_RADIUS_X * height * HEIGHT_SCALE;
  }

  generateRadiusYFromHeight(height) {
    return (
      this.getCurrentSpinRadius() +
      this.getCurrentSpinRadius() * height * HEIGHT_SCALE
    );
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
    const degrees = generateRandomAngle();
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
    const distance = getDistanceBetween(x, y, targetX, targetY);
    var crossedBoundary = false;

    const interval = setInterval(() => {
      x += velocityX;
      y += velocityY;
      this.setXY(x, y);
      if (!crossedBoundary && this.hasCrossedBoundary()) {
        crossedBoundary = true;
      }
      this.rotate(degrees);
      this.spin();

      const height = this.getHeight();
      const distanceFromTarget = getDistanceBetween(x, y, targetX, targetY);
      const velocityHeight =
        distanceFromTarget >= distance / 2 ? speed : -speed;
      this.setHeight(height + velocityHeight);

      game.centreAt(x, y);
      if (
        closelyEquals(x, targetX, Math.abs(velocityX)) &&
        closelyEquals(y, targetY, Math.abs(velocityY))
      ) {
        clearInterval(interval);
        this.setHeight(BALL_UP_START_HEIGHT);
        this.resetSpin();
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  rotate(degrees) {
    const [x, y] = this.getXY();
    this.ball.rotateAbout(degrees, x, y);
  }

  spin() {
    this.spinRadiusIndex =
      (this.spinRadiusIndex + 1) % this.spinRadiuses.length;
  }

  resetSpin() {
    this.spinRadiusIndex = this.spinRadiuses.length - 1;
    this.spin();
  }

  getCurrentSpinRadius() {
    return this.spinRadiuses[this.spinRadiusIndex];
  }

  hasCrossedBoundary() {
    if (this.hasCollidedWithGoalPost()) {
      game.clearAllIntervals();
      game.message.set("Hit the goal post!");
      resetGameAfter(BOUNDARY_CROSSED_RESET_DELAY);
      return true;
    } else if (this.hasCollidedWithBehindPost()) {
      game.clearAllIntervals();
      game.message.set("Hit the behind post!");
      resetGameAfter(BOUNDARY_CROSSED_RESET_DELAY);
      return true;
    } else if (this.hasCollidedWithGoalZone()) {
      game.clearAllIntervals();
      game.message.set("GOAL!");
      resetGameAfter(BOUNDARY_CROSSED_RESET_DELAY);
      return true;
    } else if (this.isOutOfBounds()) {
      game.clearAllIntervals();
      game.message.set("Out on the full!");
      resetGameAfter(BOUNDARY_CROSSED_RESET_DELAY);
      return true;
    } else {
      return false;
    }
  }

  hasCollidedWithGoalPost() {
    const collisionDistance = POST_RADIUS + BALL_RADIUS_X;
    const [x, y] = this.getXY();
    if (
      getDistanceBetween(x, y, LEFT_GOAL_POST_X, TOP_POSTS_Y) <
        collisionDistance ||
      getDistanceBetween(x, y, RIGHT_GOAL_POST_X, TOP_POSTS_Y) <
        collisionDistance ||
      getDistanceBetween(x, y, LEFT_GOAL_POST_X, BOTTOM_POSTS_Y) <
        collisionDistance ||
      getDistanceBetween(x, y, RIGHT_GOAL_POST_X, BOTTOM_POSTS_Y) <
        collisionDistance
    ) {
      return true;
    }
    return false;
  }

  hasCollidedWithBehindPost() {
    const collisionDistance = POST_RADIUS + BALL_RADIUS_X;
    const [x, y] = this.getXY();
    if (
      getDistanceBetween(x, y, LEFT_BEHIND_POST_X, TOP_POSTS_Y) <
        collisionDistance ||
      getDistanceBetween(x, y, RIGHT_BEHIND_POST_X, TOP_POSTS_Y) <
        collisionDistance ||
      getDistanceBetween(x, y, LEFT_BEHIND_POST_X, BOTTOM_POSTS_Y) <
        collisionDistance ||
      getDistanceBetween(x, y, RIGHT_BEHIND_POST_X, BOTTOM_POSTS_Y) <
        collisionDistance
    ) {
      return true;
    }
    return false;
  }

  hasCollidedWithGoalZone() {
    const [x, y] = this.getXY();
    const topZoneBoundary = game.field.topGoalZone.getBoundary();
    const bottomZoneBoundary = game.field.bottomGoalZone.getBoundary();
    if (
      x >= topZoneBoundary.left &&
      x <= topZoneBoundary.right &&
      y >= topZoneBoundary.top &&
      y <= topZoneBoundary.bottom
    ) {
      return true;
    } else if (
      x >= bottomZoneBoundary.left &&
      x <= bottomZoneBoundary.right &&
      y >= bottomZoneBoundary.top &&
      y <= bottomZoneBoundary.bottom
    ) {
      return true;
    } else {
      return false;
    }
  }

  isOutOfBounds() {
    const [x, y] = this.getXY();
    return (
      x <= BOUNDARY_LEFT - BALL_COLLECT_RADIUS ||
      x >= BOUNDARY_RIGHT + BALL_COLLECT_RADIUS ||
      y <= BOUNDARY_TOP - BALL_COLLECT_RADIUS ||
      y >= BOUNDARY_BOTTOM + BALL_COLLECT_RADIUS
    );
  }
}
