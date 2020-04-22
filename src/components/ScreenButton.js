class ScreenButton extends Component {
  constructor(handleClick = () => {}) {
    super();
    this.handleClick = handleClick;
    this.draw();
  }

  draw() {
    this.button = SVG.new("rect")
      .hide()
      .setAttribute("x", "-50%")
      .setAttribute("y", "-50%")
      .setAttribute("width", "100%")
      .setAttribute("height", "100%")
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
