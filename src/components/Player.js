const PLAYER_RADIUS = 1;

class Player extends Component {
  constructor(position, team) {
    super();

    this.position = position;
    this.team = team;

    this.startX = DEFAULT_PLAYER_POSITIONS[position].x;
    this.startY = DEFAULT_PLAYER_POSITIONS[position].y;
    if (team === "Red") {
      this.startY = -this.startY;
    }
    

    this.draw();
  }

  draw() {
    this.addElement(
      SVG.new("circle")
        .setAttribute("cx", this.startX)
        .setAttribute("cy", this.startY)
        .setAttribute("r", PLAYER_RADIUS)
        .setAttribute("fill", this.team)
    );
  }

  updatePosition(x, y) {
    this.elements[0].setAttribute("cx", x).setAttribute("cy", y);
  }
}
