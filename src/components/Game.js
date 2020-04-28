class Game extends Component {
  constructor(topTeamName, bottomTeamName) {
    super();
    this.topTeamName = topTeamName;
    this.bottomTeamName = bottomTeamName;
    this.intervals = [];

    this.draw();
  }

  draw() {
    this.field = new Field();
    this.addElement(this.field);
    this.blueTeam = new Team(this.topTeamName);
    this.addElement(this.blueTeam);
    this.redTeam = new Team(this.bottomTeamName);
    this.addElement(this.redTeam);
    this.ball = new Ball();
    this.addElement(this.ball);
    this.scoreboard = new Scoreboard(this.blueTeam, this.redTeam);
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
    console.log(this.ball.getXY());
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
    this.scoreboard.moveTo(x, y);
  }

  teleportAllPlayersToStartPositions() {
    this.blueTeam.teleportPlayersToStartPositions();
    this.redTeam.teleportPlayersToStartPositions();
  }
}
