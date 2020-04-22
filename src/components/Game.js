class Game extends Component {
  constructor() {
    super();
    this.intervals = [];

    this.draw();
  }

  draw() {
    this.addElement(new Field());
    this.blueTeam = new Team("Blue");
    this.addElement(this.blueTeam);
    this.redTeam = new Team("Red");
    this.addElement(this.redTeam);
    this.ball = new Ball();
    this.addElement(this.ball);
    this.message = new Message();
    this.addElement(this.message);
    this.screenButton = new ScreenButton("game.start()");
    this.addElement(this.screenButton);
  }

  start() {
    this.message.set("Game started");
    this.screenButton.clearOnClick();
    this.ball.throwUp();
    const [ballX, ballY] = this.ball.getXY();
    this.blueTeam.moveClosestPlayerTowardsBall(ballX, ballY);
    this.redTeam.moveClosestPlayerTowardsBall(ballX, ballY);
  }

  clearAllIntervals() {
    this.intervals.forEach(interval => clearInterval(interval));
  }
}
