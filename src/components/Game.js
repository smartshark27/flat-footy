class Game extends Component {
  constructor() {
    super();
    this.draw();
  }

  static ball;

  draw() {
    this.addElement(new Field());
    this.addElement(new Team("Blue"));
    this.addElement(new Team("Red"));
    this.ball = new Ball();
    this.addElement(this.ball);
    this.addElement(new ScreenButton("game.ball.ballUp()"));
  }
}
