class Game extends Component {
  constructor() {
    super();
    this.draw();
  }

  static ball;
  static blueTeam;
  static redTeam;
  static screenButton;

  draw() {
    this.addElement(new Field());
    this.blueTeam = new Team("Blue");
    this.addElement(this.blueTeam);
    this.redTeam = new Team("Red");
    this.addElement(this.redTeam);
    this.ball = new Ball();
    this.addElement(this.ball);
    this.screenButton = new ScreenButton("game.start()");
    this.addElement(this.screenButton);
  }

  start() {
    this.ball.throwUp();
    const [ballX, ballY] = this.ball.getXY();
    this.blueTeam.moveClosestPlayerTowardsBall(ballX, ballY);
    this.redTeam.moveClosestPlayerTowardsBall(ballX, ballY);
  }
}
