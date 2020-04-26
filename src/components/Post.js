class Post extends Component {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.draw();
  }

  draw() {
    this.post = SVG.new("circle")
      .setAttribute("cx", this.x)
      .setAttribute("cy", this.y)
      .setAttribute("r", POST_RADIUS)
      .setAttribute("fill", COLORS.BLACK);
    this.addElement(this.post);
  }

  getXY() {
    return this.post.getXY();
  }

  getRadius() {
    return Number(this.post.getAttribute("r"));
  }
}
