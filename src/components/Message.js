const TEXT_SIZE = 3;
const START_MESSAGE = "Touch to start";
const TEMP_MESSAGE_LIFETIME = 3000; // Milliseconds
const MESSAGE_DISTANCE_ABOVE_CENTRE = 25;

class Message extends Component {
  constructor() {
    super();

    this.draw();
  }

  draw() {
    this.message = SVG.new("text")
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("y", -MESSAGE_DISTANCE_ABOVE_CENTRE)
      .setAttribute("style", FONTS.LUCIDA_CONSOLE)
      .setAttribute("font-size", TEXT_SIZE)
      .setTextContent(START_MESSAGE);
    this.addElement(this.message);
  }

  set(text, color = COLORS.BLACK) {
    this.message.setTextContent(text).setAttribute("fill", color);
    if (text) {
      console.log(text);
    }
  }

  clear() {
    this.set("");
  }

  moveTo(x, y) {
    this.message.setAttribute("x", x).setAttribute("y", y);
  }
}
