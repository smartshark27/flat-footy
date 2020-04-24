class ScreenButton extends Component {
  constructor(handleClick = () => {}) {
    super();
    this.handleClick = handleClick;
    this.draw();
  }

  draw() {
    this.button = SVG.new("rect")
      .hide()
      .setAttribute("x", -GRASS_WIDTH / 2)
      .setAttribute("y", -GRASS_HEIGHT / 2)
      .setAttribute("width", GRASS_WIDTH)
      .setAttribute("height", GRASS_HEIGHT)
      .setAttribute("onclick", this.handleClick);
    this.addElement(this.button);
  }

  setOnClick(handleClick) {
    this.button.setAttribute("onclick", handleClick);
  }

  clearOnClick() {
    this.button.setAttribute("onclick", "");
  }
}
