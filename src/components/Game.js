class Game extends Component {
  constructor() {
    super();
    this.intervals = [];

    this.draw();
  }

  draw() {
    this.field = new Field();
    this.addElement(this.field);
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
    this.centreBallUp();
  }

  centreBallUp() {
    const [ballX, ballY] = this.ball.getXY();
    this.ball.throwUp();
    this.moveClosestPlayersTowardsBall(ballX, ballY, true);
  }

  moveClosestPlayersTowardsBall(ballX, ballY, tap = false) {
    this.blueTeam.moveClosestPlayerTowardsBall(ballX, ballY, tap);
    this.redTeam.moveClosestPlayerTowardsBall(ballX, ballY, tap);
  }

  freezeRuckmen() {
    this.blueTeam.freezeRuckman();
    this.redTeam.freezeRuckman();
  }

  clearAllIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval));
    clearArray(this.intervals);
  }

  getAllPlayers() {
    return this.blueTeam.getPlayers().concat(this.redTeam.getPlayers());
  }

  centreAt(x, y) {
    centreViewboxAt(x, y);
    this.message.moveTo(x, y - MESSAGE_DISTANCE_ABOVE_CENTRE);
  }
}
