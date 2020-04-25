const BOUNDARY_WIDTH = 100;
const BOUNDARY_HEIGHT = 160;
const CENTRE_SQUARE_WIDTH = 50;
const CENTRE_SQUARE_HEIGHT = 50;
const CENTRE_CIRCLE_RADIUS = 5;
const CENTRE_INNER_CIRCLE_RADIUS = 1.5;
const FIFTY_LINE_DISTANCE_FROM_GOAL = 45;
const GOAL_SQUARE_LENGTH = 9;
const POST_SEPARATION = 6.4;
const POST_RADIUS = 0.5;
const LINE_THICKNESS = 0.3;

const BOUNDARY_RIGHT = BOUNDARY_WIDTH / 2;
const BOUNDARY_LEFT = -BOUNDARY_RIGHT;
const BOUNDARY_BOTTOM = BOUNDARY_HEIGHT / 2;
const BOUNDARY_TOP = -BOUNDARY_BOTTOM;

const GRASS_WIDTH = BOUNDARY_WIDTH + 20;
const GRASS_HEIGHT = BOUNDARY_HEIGHT + 20;
const BACKGROUND_WIDTH = GRASS_WIDTH * 2;
const BACKGROUND_HEIGHT = GRASS_HEIGHT * 2;

const RIGHT_GOAL_POST_X = POST_SEPARATION / 2;
const LEFT_GOAL_POST_X = -RIGHT_GOAL_POST_X;
const RIGHT_BEHIND_POST_X = POST_SEPARATION * 1.5;
const LEFT_BEHIND_POST_X = -RIGHT_BEHIND_POST_X;
const BOTTOM_POSTS_Y = BOUNDARY_BOTTOM;
const TOP_POSTS_Y = BOUNDARY_TOP;

const GOAL_ZONE_DISTANCE_FROM_GOAL = BALL_RADIUS_X;
const GOAL_ZONE_WIDTH = POST_SEPARATION - 2 * POST_RADIUS - BALL_COLLECT_RADIUS;
const GOAL_ZONE_HEIGHT = BALL_COLLECT_RADIUS;

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
    this._drawGoalZone();
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
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", -(BOUNDARY_WIDTH / 2))
        .setAttribute("y", -(BOUNDARY_HEIGHT / 2))
        .setAttribute("width", BOUNDARY_WIDTH)
        .setAttribute("height", BOUNDARY_HEIGHT)
        .setAttribute("fill", COLORS.NONE)
        .setAttribute(
          "style",
          `stroke: ${COLORS.WHITE}; stroke-width: ${LINE_THICKNESS};`
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
    this.addElement(
      // Top left behind post
      SVG.new("circle")
        .setAttribute("cx", LEFT_BEHIND_POST_X)
        .setAttribute("cy", BOUNDARY_TOP)
        .setAttribute("r", POST_RADIUS)
        .setAttribute("fill", COLORS.BLACK)
    )
      .addElement(
        // Top left goal post
        SVG.new("circle")
          .setAttribute("cx", LEFT_GOAL_POST_X)
          .setAttribute("cy", BOUNDARY_TOP)
          .setAttribute("r", POST_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
      )
      .addElement(
        // Top right goal post
        SVG.new("circle")
          .setAttribute("cx", RIGHT_GOAL_POST_X)
          .setAttribute("cy", BOUNDARY_TOP)
          .setAttribute("r", POST_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
      )
      .addElement(
        // Top right behind post
        SVG.new("circle")
          .setAttribute("cx", RIGHT_BEHIND_POST_X)
          .setAttribute("cy", BOUNDARY_TOP)
          .setAttribute("r", POST_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
      )
      .addElement(
        // Bottom left behind post
        SVG.new("circle")
          .setAttribute("cx", LEFT_BEHIND_POST_X)
          .setAttribute("cy", BOTTOM_POSTS_Y)
          .setAttribute("r", POST_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
      )
      .addElement(
        // Bottom left goal post
        SVG.new("circle")
          .setAttribute("cx", LEFT_GOAL_POST_X)
          .setAttribute("cy", BOTTOM_POSTS_Y)
          .setAttribute("r", POST_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
      )
      .addElement(
        // Bottom left goal post
        SVG.new("circle")
          .setAttribute("cx", RIGHT_GOAL_POST_X)
          .setAttribute("cy", BOTTOM_POSTS_Y)
          .setAttribute("r", POST_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
      )
      .addElement(
        // Bottom left goal post
        SVG.new("circle")
          .setAttribute("cx", RIGHT_BEHIND_POST_X)
          .setAttribute("cy", BOTTOM_POSTS_Y)
          .setAttribute("r", POST_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
      );
  }

  _drawGoalZone() {
    this.topGoalZone = SVG.new("rect")
      .hide()
      .setAttribute("x", -(GOAL_ZONE_WIDTH / 2))
      .setAttribute("y", BOUNDARY_TOP - GOAL_ZONE_DISTANCE_FROM_GOAL - GOAL_ZONE_HEIGHT)
      .setAttribute("width", GOAL_ZONE_WIDTH)
      .setAttribute("height", GOAL_ZONE_HEIGHT)
    this.addElement(this.topGoalZone);
    this.bottomGoalZone = SVG.new("rect")
      .hide()
      .setAttribute("x", -(GOAL_ZONE_WIDTH / 2))
      .setAttribute("y", BOUNDARY_BOTTOM + GOAL_ZONE_DISTANCE_FROM_GOAL)
      .setAttribute("width", GOAL_ZONE_WIDTH)
      .setAttribute("height", GOAL_ZONE_HEIGHT)
    this.addElement(this.bottomGoalZone);
  }
}
