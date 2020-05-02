class Game extends Component {
  constructor(team1Attributes, team2Attributes) {
    super();
    this.team1Attributes = team1Attributes;
    this.team2Attributes = team2Attributes;
    this.intervals = [];

    this.draw();
  }

  draw() {
    this.field = new Field();
    this.addElement(this.field);
    this.team1 = new Team(this.team1Attributes, 1);
    this.addElement(this.team1);
    this.team2 = new Team(this.team2Attributes, 2);
    this.addElement(this.team2);
    this.ball = new Ball();
    this.addElement(this.ball);
    this.scoreboard = new Scoreboard(this.team1, this.team2);
    this.addElement(this.scoreboard);
    this.message = new Message();
    this.addElement(this.message);
    this.screenButton = new ScreenButton("game.start()");
    this.addElement(this.screenButton);
  }

  reset() {
    this.clearAllIntervals();
    this.centreAt(0, 0);
    this.teleportAllPlayersToStartPositions();
    this.ball.reset();
    this.screenButton.setOnClick("game.start()");
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
    this.team1.moveClosestPlayerTowardsBall(ballX, ballY, tap);
    this.team2.moveClosestPlayerTowardsBall(ballX, ballY, tap);
  }

  freezeRuckmen() {
    this.team1.freezeRuckman();
    this.team2.freezeRuckman();
  }

  clearAllIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval));
    clearArray(this.intervals);
  }

  getAllPlayers() {
    return this.team1.getPlayers().concat(this.team2.getPlayers());
  }

  centreAt(x, y) {
    centreViewboxAt(x, y);
    this.message.moveTo(x, y - MESSAGE_DISTANCE_ABOVE_CENTRE);
    this.scoreboard.moveTo(x, y);
  }

  teleportAllPlayersToStartPositions() {
    this.team1.teleportPlayersToStartPositions();
    this.team2.teleportPlayersToStartPositions();
  }
}
