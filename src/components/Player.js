const PLAYER_RADIUS = 1;
const PLAYER_SPEED = 5;
const COLLECT_RADIUS = PLAYER_RADIUS + BALL_RADIUS;
const COLLECT_HEIGHT = 0;
const MAX_PASS_DISTANCE = 55;

class Player extends Component {
  constructor(position, team) {
    super();

    this.position = position;
    this.team = team;
    this.color = team;

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

  runTowards(targetX, targetY, then = () => {}) {
    var [x, y] = this.getXY();
    const speed = PLAYER_SPEED / FPS;
    const [velocityX, velocityY] = calculateVelocity(
      x,
      y,
      targetX,
      targetY,
      speed
    );
    const interval = setInterval(() => {
      x += velocityX;
      y += velocityY;
      this.setXY(x, y);
      if (
        closelyEquals(x, targetX, BALL_RADIUS) &&
        closelyEquals(y, targetY, BALL_RADIUS)
      ) {
        clearInterval(interval);
        this.waitForBall();
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  waitForBall() {
    const [x, y] = this.getXY();
    const interval = setInterval(() => {
      const [ballX, ballY] = game.ball.getXY();
      const ballHeight = game.ball.getHeight();
      const distanceBetween = getDistanceBetween(x, y, ballX, ballY);
      if (distanceBetween < COLLECT_RADIUS && ballHeight <= COLLECT_HEIGHT) {
        this.takePossession();
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  takePossession() {
    game.clearAllIntervals();
    game.ball.player = this;
    const positionName = getPlayerPositionFullName(this.position);
    game.message.set(
      positionName + " for " + this.team + " team has the ball!",
      this.color
    );
    game.screenButton.setOnClick("game.ball.player.pass(event)");
  }

  pass(event) {
    const [targetX, targetY] = convertClientToViewboxPoint(
      event.clientX,
      event.clientY
    );
    const player = game.ball.player;
    const [playerX, playerY] = player.getXY();
    const distanceBetween = getDistanceBetween(targetX, targetY, playerX, playerY)
    if (distanceBetween <= MAX_PASS_DISTANCE) {
      game.ball.moveTo(targetX, targetY);
      game.ball.player = null;
      game.blueTeam.moveClosestPlayerTowardsBall(targetX, targetY);
      game.redTeam.moveClosestPlayerTowardsBall(targetX, targetY);
    }
  }
}
