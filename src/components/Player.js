const PLAYER_RADIUS = 1;
const PLAYER_SPEED = 5;
const COLLECT_RADIUS = PLAYER_RADIUS + BALL_RADIUS;
const COLLECT_HEIGHT = 0;

class Player extends Component {
  constructor(position, team) {
    super();

    this.position = position;
    this.team = team;

    this.startX = DEFAULT_PLAYER_POSITIONS[position].x;
    this.startY = DEFAULT_PLAYER_POSITIONS[position].y;
    if (team === "Red") {
      this.startY = -this.startY;
    }

    this.draw();
  }

  draw() {
    this.circle = SVG.new("circle")
      .setAttribute("cx", this.startX)
      .setAttribute("cy", this.startY)
      .setAttribute("r", PLAYER_RADIUS)
      .setAttribute("fill", this.team);
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
        game.clearAllIntervals();
      }
    }, FRAME_DELAY);
    game.intervals.push(interval);
  }

  takePossession() {

  }
}
