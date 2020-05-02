class Scoreboard extends Component {
  constructor(team1, team2) {
    super();

    this.team1 = team1;
    this.team2 = team2;

    this.draw();
  }

  draw() {
    const team1TopY = VIEWBOX_HEIGHT / 2 - SCOREBOARD_HEIGHT - SCOREBOARD_MARGIN;
    const team2TopY = team1TopY + SCOREBOARD_LINE_HEIGHT;
    this._drawLine(this.team1, team1TopY);
    this._drawLine(this.team2, team2TopY);
    this._drawTeam1Score(team1TopY);
    this._drawTeam2Score(team2TopY);
  }

  moveTo(x, y) {
    this.elements.forEach((element) => {
      element.setAttribute("transform", `translate(${x}, ${y})`)
    })
  }

  giveGoalToTeam1() {
    const score = Number(this.team1Score.getTextContent());
    this.team1Score.setTextContent(score + GOAL_POINTS);
  }

  giveGoalToTeam2() {
    const score = Number(this.team2Score.getTextContent());
    this.team2Score.setTextContent(score + GOAL_POINTS);
  }

  giveBehindToTeam1() {
    const score = Number(this.team1Score.getTextContent());
    this.team1Score.setTextContent(score + BEHIND_POINTS);
  }

  giveBehindToTeam2() {
    const score = Number(this.team2Score.getTextContent());
    this.team2Score.setTextContent(score + BEHIND_POINTS);
  }

  _drawLine(team, topY) {
    this._drawBackground(team, topY);
    this._drawTeamName(team, topY);
  }

  _drawBackground(team, topY) {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", VIEWBOX_LEFT + SCOREBOARD_MARGIN)
        .setAttribute("y", topY)
        .setAttribute("width", SCOREBOARD_COLOR_WIDTH)
        .setAttribute("height", SCOREBOARD_PADDING * 2 + SCOREBOARD_TEXT_SIZE)
        .setAttribute("fill", team.colors.mid)
        .setAttribute("fill-opacity", SCOREBOARD_OPACITY)
    );

    this.addElement(
      SVG.new("rect")
        .setAttribute(
          "x",
          VIEWBOX_LEFT + SCOREBOARD_MARGIN + SCOREBOARD_COLOR_WIDTH
        )
        .setAttribute("y", topY)
        .setAttribute("width", SCOREBOARD_WIDTH)
        .setAttribute("height", SCOREBOARD_PADDING * 2 + SCOREBOARD_TEXT_SIZE)
        .setAttribute("fill", COLORS.BLACK)
        .setAttribute("fill-opacity", SCOREBOARD_OPACITY)
    );
  }

  _drawTeamName(team, topY) {
    this.addElement(
      SVG.new("text")
        .setAttribute("dominant-baseline", "hanging")
        .setAttribute(
          "x",
          VIEWBOX_LEFT +
            SCOREBOARD_MARGIN +
            SCOREBOARD_COLOR_WIDTH +
            SCOREBOARD_PADDING
        )
        .setAttribute("y", topY + SCOREBOARD_PADDING)
        .setAttribute("style", FONTS.LUCIDA_CONSOLE)
        .setAttribute("font-size", SCOREBOARD_TEXT_SIZE)
        .setAttribute("fill", COLORS.WHITE)
        .setTextContent(team.nickname)
    );
  }

  _drawTeam1Score(topY) {
    this.team1Score = this._drawScore(topY);
    this.addElement(this.team1Score);
  }

  _drawTeam2Score(topY) {
    this.team2Score = this._drawScore(topY);
    this.addElement(this.team2Score);
  }

  _drawScore(topY) {
    return SVG.new("text")
      .setAttribute("dominant-baseline", "hanging")
      .setAttribute("text-anchor", "end")
      .setAttribute(
        "x",
        VIEWBOX_LEFT + SCOREBOARD_MARGIN + SCOREBOARD_COLOR_WIDTH + SCOREBOARD_WIDTH - SCOREBOARD_PADDING
      )
      .setAttribute("y", topY + SCOREBOARD_PADDING)
      .setAttribute("style", FONTS.LUCIDA_CONSOLE)
      .setAttribute("font-size", SCOREBOARD_TEXT_SIZE)
      .setAttribute("fill", COLORS.WHITE)
      .setTextContent("0");
  }
}
