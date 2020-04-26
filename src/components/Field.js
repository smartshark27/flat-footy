class Field extends Component {
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
    this._drawBehindPosts();
    this._drawGoalZones();
    this._drawBehindZones();
  }

  _drawBackground() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", -BACKGROUND_WIDTH / 2)
        .setAttribute("y", -BACKGROUND_HEIGHT / 2)
        .setAttribute("width", BACKGROUND_WIDTH)
        .setAttribute("height", BACKGROUND_HEIGHT)
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
        .setAttribute("fill", COLORS.LIGHT_GREEN)
    );
  }

  _drawBoundaryLine() {
    this.boundaryLine = SVG.new("rect")
      .setAttribute("x", -(BOUNDARY_WIDTH / 2))
      .setAttribute("y", -(BOUNDARY_HEIGHT / 2))
      .setAttribute("width", BOUNDARY_WIDTH)
      .setAttribute("height", BOUNDARY_HEIGHT)
      .setAttribute("fill", COLORS.NONE)
      .setAttribute(
        "style",
        `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
      );
    this.addElement(this.boundaryLine);
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
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
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
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
        )
    )
      .addElement(
        // Inner circle
        SVG.new("circle")
          .setAttribute("r", CENTRE_INNER_CIRCLE_RADIUS)
          .setAttribute("fill", COLORS.NONE)
          .setAttribute(
            "style",
            `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
          )
      )
      .addElement(
        // Line through circles
        SVG.new("line")
          .setAttribute("x1", -CENTRE_CIRCLE_RADIUS)
          .setAttribute("x2", CENTRE_CIRCLE_RADIUS)
          .setAttribute(
            "style",
            `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
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
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
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
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
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
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
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
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
        )
    );
  }

  _drawGoalPosts() {
    const rightPostX = POST_SEPARATION / 2;
    const leftPostX = -rightPostX;

    this.topLeftGoalPost = new Post(leftPostX, BOUNDARY_TOP);
    this.addElement(this.topLeftGoalPost);
    this.topRightGoalPost = new Post(rightPostX, BOUNDARY_TOP);
    this.addElement(this.topRightGoalPost);
    this.bottomLeftGoalPost = new Post(leftPostX, BOUNDARY_BOTTOM);
    this.addElement(this.bottomLeftGoalPost);
    this.bottomRightGoalPost = new Post(rightPostX, BOUNDARY_BOTTOM);
    this.addElement(this.bottomRightGoalPost);
  }

  _drawBehindPosts() {
    const rightPostX = POST_SEPARATION * 1.5;
    const leftPostX = -rightPostX;

    this.topLeftBehindPost = new Post(leftPostX, BOUNDARY_TOP);
    this.addElement(this.topLeftBehindPost);
    this.topRightBehindPost = new Post(rightPostX, BOUNDARY_TOP);
    this.addElement(this.topRightBehindPost);
    this.bottomLeftBehindPost = new Post(leftPostX, BOUNDARY_BOTTOM);
    this.addElement(this.bottomLeftBehindPost);
    this.bottomRightBehindPost = new Post(rightPostX, BOUNDARY_BOTTOM);
    this.addElement(this.bottomRightBehindPost);
  }

  _drawGoalZones() {
    const scoreZoneDistanceFromGoal = BALL_RADIUS_X;
    const scoreZoneWidth =
      POST_SEPARATION - 2 * POST_RADIUS - BALL_COLLECT_RADIUS;
    const scoreZoneHeight = BALL_COLLECT_RADIUS;

    this.topGoalZone = SVG.new("rect")
      .hide()
      .setAttribute("x", -(scoreZoneWidth / 2))
      .setAttribute(
        "y",
        BOUNDARY_TOP - scoreZoneDistanceFromGoal - scoreZoneHeight
      )
      .setAttribute("width", scoreZoneWidth)
      .setAttribute("height", scoreZoneHeight);
    this.addElement(this.topGoalZone);

    this.bottomGoalZone = SVG.new("rect")
      .hide()
      .setAttribute("x", -(scoreZoneWidth / 2))
      .setAttribute("y", BOUNDARY_BOTTOM + scoreZoneDistanceFromGoal)
      .setAttribute("width", scoreZoneWidth)
      .setAttribute("height", scoreZoneHeight);
    this.addElement(this.bottomGoalZone);
  }

  _drawBehindZones() {
    const scoreZoneDistanceFromGoal = BALL_RADIUS_X;
    const scoreZoneWidth =
      POST_SEPARATION - 2 * POST_RADIUS - BALL_COLLECT_RADIUS;
    const scoreZoneHeight = BALL_COLLECT_RADIUS;

    this.topLeftBehindZone = SVG.new("rect")
      .hide()
      .setAttribute(
        "x",
        -(POST_SEPARATION * 1.5) + POST_RADIUS + BALL_COLLECT_RADIUS / 2
      )
      .setAttribute(
        "y",
        BOUNDARY_TOP - scoreZoneDistanceFromGoal - scoreZoneHeight
      )
      .setAttribute("width", scoreZoneWidth)
      .setAttribute("height", scoreZoneHeight);
    this.addElement(this.topLeftBehindZone);

    this.topRightBehindZone = SVG.new("rect")
      .hide()
      .setAttribute(
        "x",
        POST_SEPARATION / 2 + POST_RADIUS + BALL_COLLECT_RADIUS / 2
      )
      .setAttribute(
        "y",
        BOUNDARY_TOP - scoreZoneDistanceFromGoal - scoreZoneHeight
      )
      .setAttribute("width", scoreZoneWidth)
      .setAttribute("height", scoreZoneHeight);
    this.addElement(this.topRightBehindZone);

    this.bottomLeftBehindZone = SVG.new("rect")
      .hide()
      .setAttribute(
        "x",
        -(POST_SEPARATION * 1.5) + POST_RADIUS + BALL_COLLECT_RADIUS / 2
      )
      .setAttribute("y", BOUNDARY_BOTTOM + scoreZoneDistanceFromGoal)
      .setAttribute("width", scoreZoneWidth)
      .setAttribute("height", scoreZoneHeight);
    this.addElement(this.bottomLeftBehindZone);

    this.bottomRightBehindZone = SVG.new("rect")
      .hide()
      .setAttribute(
        "x",
        POST_SEPARATION / 2 + POST_RADIUS + BALL_COLLECT_RADIUS / 2
      )
      .setAttribute("y", BOUNDARY_BOTTOM + scoreZoneDistanceFromGoal)
      .setAttribute("width", scoreZoneWidth)
      .setAttribute("height", scoreZoneHeight);
    this.addElement(this.bottomRightBehindZone);
  }
}
