class SVG {
  static new(elementType) {
    const element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      elementType
    );
    document.getElementById("canvas").appendChild(element);
    return new SVG(element);
  }

  static get(id) {
    const element = document.getElementById(id);
    return new SVG(element);
  }

  constructor(element) {
    this.element = element;
  }

  getAttribute(name) {
    return this.element.getAttribute(name);
  }

  setAttribute(name, value) {
    this.element.setAttribute(name, value);
    return this;
  }

  getTextContent() {
    return this.element.textContent;
  }

  setTextContent(text) {
    this.element.textContent = text;
    return this;
  }

  getBBox() {
    return this.element.getBBox();
  }

  getType() {
    return this.element.nodeName;
  }

  getBoundary() {
    if (this.getType() === "rect") {
      return this._getRectBoundary(this.element);
    } else if (this.getType() === "circle") {
      return this._getCircleBoundary(this.element);
    } else {
      throw "Could not get boundary of element" + this.element.toString();
    }
  }

  hide() {
    return this.setAttribute("opacity", 0);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
    this.element = null;
  }

  isNull() {
    return this.element === null;
  }

  rotateAbout(degrees, x, y) {
    this.element.setAttribute("transform", `rotate(${degrees} ${x}, ${y})`);
  }

  getXY() {
    var x, y;
    if (this._isCircular()) {
      x = this.element.getAttribute("cx");
      y = this.element.getAttribute("cy");
    } else {
      x = this.element.getAttribute("x");
      y = this.element.getAttribute("y");
    }
    return [Number(x), Number(y)];
  }

  _isCircular() {
    return ["circle", "ellipse"].includes(this.getType());
  }

  _getRectBoundary(rect) {
    return {
      left: Number(rect.getAttribute("x")),
      right:
        Number(rect.getAttribute("x")) + Number(rect.getAttribute("width")),
      top: Number(rect.getAttribute("y")),
      bottom:
        Number(rect.getAttribute("y")) + Number(rect.getAttribute("height")),
    };
  }

  _getCircleBoundary(circle) {
    const x = Number(circle.getAttribute("cx"));
    const y = Number(circle.getAttribute("cy"));
    const radius = Number(circle.getAttribute("r"));

    return {
      left: x - radius,
      right: x + radius,
      top: y - radius,
      bottom: y + radius,
    };
  }
}
