class Game extends Component {
  constructor() {
    super();
    this.draw();
  }

  draw() {
    this.addElement(new Field());
    this.addElement(new Team("Blue"));
    this.addElement(new Team("Red"));
  }
}
