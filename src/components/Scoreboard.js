class Scoreboard extends Component {
  constructor(topTeam, bottomTeam) {
    super();

    this.topTeam = topTeam;
    this.bottomTeam = bottomTeam;

    this.draw();
  }

  draw() {
    const topTopY = VIEWBOX_HEIGHT / 2 - SCOREBOARD_HEIGHT - SCOREBOARD_MARGIN;
    const bottomTopY = topTopY + SCOREBOARD_LINE_HEIGHT;
    this._drawLine(this.topTeam, topTopY);
    this._drawLine(this.bottomTeam, bottomTopY);
    this._drawTopScore(topTopY);
    this._drawBottomScore(bottomTopY);
  }

  moveTo(x, y) {
    this.elements.forEach((element) => {
      element.setAttribute("transform", `translate(${x}, ${y})`)
    })
  }

  giveGoalToTopTeam() {
    const score = Number(this.topScore.getTextContent());
    this.topScore.setTextContent(score + GOAL_POINTS);
  }

  giveGoalToBottomTeam() {
    const score = Number(this.bottomScore.getTextContent());
    this.bottomScore.setTextContent(score + GOAL_POINTS);
  }

  giveBehindToTopTeam() {
    const score = Number(this.topScore.getTextContent());
    this.topScore.setTextContent(score + BEHIND_POINTS);
  }

  giveBehindToBottomTeam() {
    const score = Number(this.bottomScore.getTextContent());
    this.bottomScore.setTextContent(score + BEHIND_POINTS);
  }

  _drawLine(team, topY) {
    this._drawBackground(team.color, topY);
    this._drawTeamName(team.name, topY);
  }

  _drawBackground(color, topY) {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", VIEWBOX_LEFT + SCOREBOARD_MARGIN)
        .setAttribute("y", topY)
        .setAttribute("width", SCOREBOARD_COLOR_WIDTH)
        .setAttribute("height", SCOREBOARD_PADDING * 2 + SCOREBOARD_TEXT_SIZE)
        .setAttribute("fill", color)
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

  _drawTeamName(name, topY) {
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
        .setTextContent(name)
    );
  }

  _drawTopScore(topY) {
    this.topScore = this._drawScore(topY);
    this.addElement(this.topScore);
  }

  _drawBottomScore(topY) {
    this.bottomScore = this._drawScore(topY);
    this.addElement(this.bottomScore);
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
