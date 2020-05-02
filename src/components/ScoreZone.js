class ScoreZone extends Component {
  constructor(team) {
    super();
    this.team = team;
    this.draw();
  }

  draw() {
    this._drawPosts();
    this._drawZones();
  }

  getGoalPosts() {
    return [this.leftGoalPost, this.rightGoalPost];
  }

  getBehindPosts() {
    return [this.leftBehindPost,this.rightBehindPost];
  }

  giveGoal() {
    if (this.team.number === 1) {
      game.scoreboard.giveGoalToTeam1();
    } else {
      game.scoreboard.giveGoalToTeam2();
    }
  }

  giveBehind() {
    if (this.team.number === 1) {
      game.scoreboard.giveBehindToTeam1();
    } else {
      game.scoreboard.giveBehindToTeam2();
    }
  }

  _drawPosts() {
    const y = this.team.number === 1 ? BOUNDARY_TOP : BOUNDARY_BOTTOM;

    this.leftBehindPost = this._drawPost(POST_SEPARATION * 1.5, y);
    this.addElement(this.leftBehindPost);
    this.leftGoalPost = this._drawPost(POST_SEPARATION / 2, y);
    this.addElement(this.leftGoalPost);
    this.rightGoalPost = this._drawPost(-(POST_SEPARATION / 2), y);
    this.addElement(this.rightGoalPost);
    this.rightBehindPost = this._drawPost(-(POST_SEPARATION * 1.5), y);
    this.addElement(this.rightBehindPost);
  }

  _drawPost(x, y) {
    return SVG.new("circle")
      .setAttribute("cx", x)
      .setAttribute("cy", y)
      .setAttribute("r", POST_RADIUS)
      .setAttribute("fill", COLORS.BLACK);
  }

  _drawZones() {
    this.goalZone = this._drawZone(-(POST_SEPARATION / 2 - POST_RADIUS - BALL_COLLECT_RADIUS / 2));
    this.addElement(this.goalZone);
    this.leftBehindZone = this._drawZone(
      -(POST_SEPARATION * 1.5) + POST_RADIUS + BALL_COLLECT_RADIUS / 2
    );
    this.addElement(this.leftBehindZone);
    this.rightBehindZone = this._drawZone(
      POST_SEPARATION / 2 + POST_RADIUS + BALL_COLLECT_RADIUS / 2
    );
    this.addElement(this.rightBehindZone);
  }

  _drawZone(x) {
    const zoneDistanceFromGoal = BALL_RADIUS_X;
    const zoneWidth = POST_SEPARATION - POST_RADIUS * 2 - BALL_COLLECT_RADIUS;
    const zoneHeight = BALL_COLLECT_RADIUS;
    const y =
      this.team.number === 1
        ? BOUNDARY_TOP - zoneDistanceFromGoal - zoneHeight
        : BOUNDARY_BOTTOM + zoneDistanceFromGoal;
    return SVG.new("rect")
      .hide()
      .setAttribute("x", x)
      .setAttribute("y", y)
      .setAttribute("width", zoneWidth)
      .setAttribute("height", zoneHeight);
  }
}
