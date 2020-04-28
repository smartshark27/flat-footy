class Component {
  constructor() {
    this.elements = [];
  }

  draw() {}

  addElement(element) {
    this.elements.push(element);
    return this;
  }

  remove() {
    this.elements.forEach((element) => element.remove());
    clearArray(this.elements);
  }
}
