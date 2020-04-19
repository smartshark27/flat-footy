class ScreenButton extends Component {
  constructor(handleClick) {
    super();
    this.handleClick = handleClick;
    this.draw();
  }

  draw() {
    this.button = SVG.new("rect")
      .hide()
      .setAttribute("x", -(BOUNDARY_WIDTH / 2))
      .setAttribute("y", -(BOUNDARY_HEIGHT / 2))
      .setAttribute("width", BOUNDARY_WIDTH)
      .setAttribute("height", BOUNDARY_HEIGHT)
      .setAttribute("onclick", this.handleClick);
    this.elements.push(this.button);
  }
}
