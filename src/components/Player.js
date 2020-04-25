const PLAYER_RADIUS = 1;
const PLAYER_SPEED = 5;
const COLLECT_RADIUS = PLAYER_RADIUS + BALL_COLLECT_RADIUS;
const COLLECT_HEIGHT = 0;
const MAX_PASS_DISTANCE = 55;
const PLAYER_FREEZE_TIME = 200;
const PLAYER_COLLISION_RADIUS = PLAYER_RADIUS;
const PLAYER_WAIT_DISTANCE_FROM_TARGET = BALL_COLLECT_RADIUS / 2;

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
    const x = Number(this.circle.getAttribute("cx"));
    const y = Number(this.circle.getAttribute("cy"));
    return [x, y];
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
      if (!this.willCollideWithAnotherPlayer(x + velocityX, y)) {
        x += velocityX;
      }
      if (!this.willCollideWithAnotherPlayer(x, y + velocityY)) {
        y += velocityY;
      }
      this.setXY(x, y);
      const distanceFromTarget = getDistanceBetween(x, y, targetX, targetY);
      if (distanceFromTarget < COLLECT_RADIUS && !waiting) {
        waiting = true;
        this.waitForBall(tapBall);
      }
      if (distanceFromTarget < PLAYER_WAIT_DISTANCE_FROM_TARGET) {
        clearInterval(interval);
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
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
    game.screenButton.clearOnClick();
    const [targetX, targetY] = convertClientToViewboxPoint(
      event.clientX,
      event.clientY
    );
    const player = game.ball.player;
    const [playerX, playerY] = player.getXY();

    const distance = getDistanceBetween(targetX, targetY, playerX, playerY);
    if (distance <= MAX_PASS_DISTANCE) {
      this.passBall(targetX, targetY);
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
