class Game extends Component {
  constructor() {
    super();
    this.draw();
  }

  draw() {
    this._drawBackground();
    this._drawGrass();
    this._drawBoundaryLine();
    this._drawCentreSquare();
    this._drawCentreCircle();
    this._drawFiftyLines();
    this._drawGoalSquares();
    this._drawGoalPosts();
  }

  _drawBackground() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", -GRASS_WIDTH)
        .setAttribute("y", -GRASS_HEIGHT)
        .setAttribute("width", GRASS_WIDTH * 2)
        .setAttribute("height", GRASS_HEIGHT * 2)
        .setAttribute("fill", COLORS.LIGHT_GREY)
    );
  }

  _drawGrass() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", -(GRASS_WIDTH / 2))
        .setAttribute("y", -(GRASS_HEIGHT / 2))
        .setAttribute("width", GRASS_WIDTH)
        .setAttribute("height", GRASS_HEIGHT)
        .setAttribute("fill", COLORS.GREEN)
    );
  }

  _drawBoundaryLine() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", -(BOUNDARY_WIDTH / 2))
        .setAttribute("y", -(BOUNDARY_HEIGHT / 2))
        .setAttribute("width", BOUNDARY_WIDTH)
        .setAttribute("height", BOUNDARY_HEIGHT)
        .setAttribute("fill", COLORS.NONE)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
    );
  }

  _drawCentreSquare() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", -(CENTRE_SQUARE_WIDTH / 2))
        .setAttribute("y", -(CENTRE_SQUARE_HEIGHT / 2))
        .setAttribute("width", CENTRE_SQUARE_WIDTH)
        .setAttribute("height", CENTRE_SQUARE_HEIGHT)
        .setAttribute("fill", COLORS.NONE)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
    );
  }

  _drawCentreCircle() {
    this.addElement(
      // Outer circle
      SVG.new("circle")
        .setAttribute("r", CENTRE_CIRCLE_RADIUS)
        .setAttribute("fill", COLORS.NONE)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
    )
      .addElement(
        // Inner circle
        SVG.new("circle")
          .setAttribute("r", CENTRE_INNER_CIRCLE_RADIUS)
          .setAttribute("fill", COLORS.NONE)
          .setAttribute(
            "style",
            `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
          )
      )
      .addElement(
        // Line through circles
        SVG.new("line")
        .setAttribute("x1", -CENTRE_CIRCLE_RADIUS)
        .setAttribute("x2", CENTRE_CIRCLE_RADIUS)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
      );
  }

  _drawFiftyLines() {
    const left = -(BOUNDARY_WIDTH / 2);
    const right = BOUNDARY_WIDTH / 2;
    const top = -(BOUNDARY_HEIGHT / 2) + FIFTY_LINE_DISTANCE_FROM_GOAL;
    const bottom = BOUNDARY_HEIGHT / 2 - FIFTY_LINE_DISTANCE_FROM_GOAL;

    this.addElement(
      // Top line
      SVG.new("line")
        .setAttribute("x1", left)
        .setAttribute("y1", top)
        .setAttribute("x2", right)
        .setAttribute("y2", top)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
    ).addElement(
      // Bottom line
      SVG.new("line")
        .setAttribute("x1", left)
        .setAttribute("y1", bottom)
        .setAttribute("x2", right)
        .setAttribute("y2", bottom)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
    );
  }

  _drawGoalSquares() {
    this.addElement(
      // Top
      SVG.new("rect")
        .setAttribute("x", -(POST_SEPARATION / 2))
        .setAttribute("y", -(BOUNDARY_HEIGHT / 2))
        .setAttribute("width", POST_SEPARATION)
        .setAttribute("height", GOAL_SQUARE_LENGTH)
        .setAttribute("fill", COLORS.NONE)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
    ).addElement(
      // Bottom
      SVG.new("rect")
        .setAttribute("x", -(POST_SEPARATION / 2))
        .setAttribute("y", BOUNDARY_HEIGHT / 2 - GOAL_SQUARE_LENGTH)
        .setAttribute("width", POST_SEPARATION)
        .setAttribute("height", GOAL_SQUARE_LENGTH)
        .setAttribute("fill", COLORS.NONE)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_WIDTH};`
        )
    )
  }

  _drawGoalPosts() {
    const bottom = BOUNDARY_HEIGHT / 2;
    const top = -bottom;

    this.addElement(
      // Top left behind post
      SVG.new("circle")
        .setAttribute("cx", -(POST_SEPARATION * 1.5))
        .setAttribute("cy", top)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    ).addElement(
      // Top left goal post
      SVG.new("circle")
        .setAttribute("cx", -(POST_SEPARATION / 2))
        .setAttribute("cy", top)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    ).addElement(
      // Top left goal post
      SVG.new("circle")
        .setAttribute("cx", POST_SEPARATION / 2)
        .setAttribute("cy", top)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    ).addElement(
      // Top left goal post
      SVG.new("circle")
        .setAttribute("cx", POST_SEPARATION * 1.5)
        .setAttribute("cy", top)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    ).addElement(
      // Bottom left behind post
      SVG.new("circle")
        .setAttribute("cx", -(POST_SEPARATION * 1.5))
        .setAttribute("cy", bottom)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    ).addElement(
      // Bottom left goal post
      SVG.new("circle")
        .setAttribute("cx", -(POST_SEPARATION / 2))
        .setAttribute("cy", bottom)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    ).addElement(
      // Bottom left goal post
      SVG.new("circle")
        .setAttribute("cx", POST_SEPARATION / 2)
        .setAttribute("cy", bottom)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    ).addElement(
      // Bottom left goal post
      SVG.new("circle")
        .setAttribute("cx", POST_SEPARATION * 1.5)
        .setAttribute("cy", bottom)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    )
  }
}
