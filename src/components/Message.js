const TEXT_SIZE = 5;
const START_MESSAGE = "Touch to start";
const TEMP_MESSAGE_LIFETIME = 3000; // Milliseconds

class Message extends Component {
  constructor() {
    super();

    this.draw();
  }

  draw() {
    this.message = SVG.new("text")
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("y", "-20%")
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
}
