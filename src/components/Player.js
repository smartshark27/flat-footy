class Player extends Component {
  constructor(position, team) {
    super();

    this.position = position;
    this.team = team;
    this.color = team;
    this.frozen = false;

    this.startX = DEFAULT_PLAYER_POSITIONS[position].x;
    this.startY = DEFAULT_PLAYER_POSITIONS[position].y;
    if (this.color === "Red") {
      this.startY = -this.startY;
    }

    this.draw();
  }

  draw() {
    this.circle = SVG.new("circle")
      .setAttribute("cx", this.startX)
      .setAttribute("cy", this.startY)
      .setAttribute("r", PLAYER_RADIUS)
      .setAttribute("fill", this.color);
    this.addElement(this.circle);
  }

  getXY() {
    return this.circle.getXY();
  }

  setXY(x, y) {
    this.circle.setAttribute("cx", x).setAttribute("cy", y);
  }

  runTowards(targetX, targetY, tapBall = false) {
    const speed = PLAYER_SPEED / FPS;
    var waiting = false;
    const interval = setInterval(() => {
      var [x, y] = this.getXY();
      const [velocityX, velocityY] = calculateVelocity(
        x,
        y,
        targetX,
        targetY,
        speed
      );
      if (this.canMoveTo(x + velocityX, y, velocityX, 0)) {
        x += velocityX;
      }
      if (this.canMoveTo(x, y + velocityY, 0, velocityY)) {
        y += velocityY;
      }
      this.setXY(x, y);
      const distanceFromTarget = getDistanceBetween(x, y, targetX, targetY);
      if (distanceFromTarget < COLLECT_RADIUS && !waiting) {
        waiting = true;
        this.waitForBall(tapBall);
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  canMoveTo(x, y, displacementX, displacementY) {
    // Checks collision with other players and maybe pushes them
    const canMove = game.getAllPlayers().reduce((canMove, player) => {
      if (player == this) {
        return canMove;
      }
      const [playerX, playerY] = player.getXY();
      const collided =
        getDistanceBetween(x, y, playerX, playerY) <
        PLAYER_COLLISION_RADIUS * 2;
      if (!collided) {
        return canMove && true;
      } else {
        return canMove && player.maybePush(displacementX, displacementY);
      }
    }, true);
    return canMove;
  }

  maybePush(displacementX, displacementY) {
    const [x, y] = this.getXY();
    const newX = x + displacementX * PUSH_MULTIPLIER;
    const newY = y + displacementY * PUSH_MULTIPLIER;
    const standGround = this.willStandGround();
    if (standGround || this.willCollideWithAnotherPlayer(newX, newY)) {
      return false;
    } else {
      this.setXY(newX, newY);
      return true;
    }
  }

  willStandGround() {
    return Math.random() > PUSH_CHANCE;
  }

  willCollideWithAnotherPlayer(x, y) {
    // Assumes the player will collide with themself
    return (
      game.getAllPlayers().reduce((collisions, player) => {
        const [playerX, playerY] = player.getXY();
        const collided =
          getDistanceBetween(x, y, playerX, playerY) <
          PLAYER_COLLISION_RADIUS * 2;
        return collisions + (collided ? 1 : 0);
      }, 0) > 1
    );
  }

  waitForBall(tapBall = false) {
    const interval = setInterval(() => {
      const [ballX, ballY] = game.ball.getXY();
      const ballHeight = game.ball.getHeight();
      const [x, y] = this.getXY();
      const distanceBetween = getDistanceBetween(x, y, ballX, ballY);
      if (distanceBetween <= COLLECT_RADIUS && ballHeight <= COLLECT_HEIGHT) {
        game.clearAllIntervals();
        if (tapBall) {
          this.tapBall();
        } else {
          this.takePossession();
        }
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  tapBall() {
    game.freezeRuckmen();
    game.ball.tapToRandomLocation();
  }

  takePossession() {
    game.clearAllIntervals();
    const [x, y] = this.getXY();
    game.ball.moveTo(x, y);
    game.ball.player = this;
    const positionName = getPlayerPositionFullName(this.position);
    game.message.set(
      positionName + " for " + this.team + " team has the ball!",
      this.color
    );
    game.screenButton.setOnClick("game.ball.player.maybePassBall(event)");
  }

  maybePassBall(event) {
    game.message.clear();
    const [targetX, targetY] = convertClientToViewboxPoint(
      event.clientX,
      event.clientY
    );
    const player = game.ball.player;
    const [playerX, playerY] = player.getXY();

    const distance = getDistanceBetween(targetX, targetY, playerX, playerY);
    if (distance <= MAX_PASS_DISTANCE) {
      game.screenButton.clearOnClick();
      this.passBall(targetX, targetY);
    } else {
      game.message.set("Can't kick that far");
    }
  }

  passBall(targetX, targetY) {
    this.freeze();
    game.ball.player = null;
    game.ball.moveTo(targetX, targetY);
    game.moveClosestPlayersTowardsBall(targetX, targetY);
  }

  isFrozen() {
    return this.frozen;
  }

  freeze() {
    this.frozen = true;
    sleep(PLAYER_FREEZE_TIME).then(() => this.unfreeze());
  }

  unfreeze() {
    this.frozen = false;
  }
}
