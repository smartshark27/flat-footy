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

  reset() {
    this.ball.setAttribute("transform", "");
    this.setXY(0, 0);
    this.resetSpin();
    this.setHeight(BALL_UP_START_HEIGHT);
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
    return this.ball.getXY();
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
        this.resetSpin();
        this.setHeight(BALL_UP_START_HEIGHT);
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
    if (
      this._checkScoreZone(game.team1ScoreZone) ||
      this._checkScoreZone(game.team2ScoreZone) ||
      this._isOutOfBounds()
    ) {
      game.clearAllIntervals();
      resetGameAfter(BOUNDARY_CROSSED_RESET_DELAY);
      return true;
    }
    return false;
  }

  _checkScoreZone(scoreZone) {
    return (
      this._hasCollidedWithGoalPost(scoreZone) ||
      this._hasCollidedWithBehindPost(scoreZone) ||
      this._isInGoalZone(scoreZone) ||
      this._isInBehindZone(scoreZone)
    );
  }

  _hasCollidedWithGoalPost(scoreZone) {
    for (var post of scoreZone.getGoalPosts()) {
      if (this._hasCollidedWithPost(post)) {
        if (this.player.team.number === scoreZone.team.number) {
          game.message.set(this.player.lastName + " has hit the post!");
        } else {
          game.message.set(this.player.lastName + " has rushed a behind onto the post");
        }
        scoreZone.giveBehind();
        return true;
      }
    }
    return false;
  }

  _hasCollidedWithBehindPost(scoreZone) {
    for (var post of scoreZone.getBehindPosts()) {
      if (this._hasCollidedWithPost(post)) {
        game.message.set(
          this.player.lastName + " has hit the post. On the full!"
        );
        return true;
      }
    }
    return false;
  }

  _hasCollidedWithPost(post) {
    const [x, y] = this.getXY();
    const [postX, postY] = post.getXY();
    const collisionDistance = Number(post.getAttribute("r")) + BALL_RADIUS_X;
    const distanceBetween = getDistanceBetween(x, y, postX, postY);
    return distanceBetween < collisionDistance;
  }

  _isInGoalZone(scoreZone) {
    if (this._isInZone(scoreZone.goalZone)) {
      if (this.player.team.number === scoreZone.team.number) {
        game.message.set(this.player.lastName + " has scored a GOAL!");
        scoreZone.giveGoal();
      } else {
        game.message.set(this.player.lastName + " has rushed a behind");
        scoreZone.giveBehind();
      }
      return true;
    }
    return false;
  }

  _isInBehindZone(scoreZone) {
    if (
      this._isInZone(scoreZone.leftBehindZone) ||
      this._isInZone(scoreZone.rightBehindZone)
    ) {
      if (this.player.team.number === scoreZone.team.number) {
        game.message.set(this.player.lastName + " has scored a behind");
      } else {
        game.message.set(this.player.lastName + " has rushed a behind");
      }
      scoreZone.giveBehind();
      return true;
    }
    return false;
  }

  _isInZone(zone) {
    const [x, y] = this.getXY();
    if (isPointInRect(x, y, zone)) {
      return true;
    }
    return false;
  }

  _isOutOfBounds() {
    const [x, y] = this.getXY();
    const boundary = game.field.boundaryLine.getBoundary();
    if (
      x <= boundary.left - BALL_COLLECT_RADIUS ||
      x >= boundary.right + BALL_COLLECT_RADIUS ||
      y <= boundary.top - BALL_COLLECT_RADIUS ||
      y >= boundary.bottom + BALL_COLLECT_RADIUS
    ) {
      game.message.set("Out on the full!");
      return true;
    } else {
      return false;
    }
  }
}
