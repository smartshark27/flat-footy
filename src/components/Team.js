class Team extends Component {
  constructor(name, goalDirection) {
    super();

    this.name = name;
    this.goalDirection = goalDirection; // Up or down

    this.draw();
  }

  draw() {
    for (var position in DEFAULT_PLAYER_POSITIONS) {
      this.addElement(new Player(position, this.name));
    }
  }

  moveClosestPlayerTowardsBall(ballX, ballY) {
    const player = this.getClosestPlayerTo(ballX, ballY);
    player.runTowards(ballX, ballY);
  }

  getClosestPlayerTo(x, y) {
    var closestPlayer = this.elements[0];
    var shortestDistance = Infinity;

    for (var player of this.elements) {
      const [playerX, playerY] = player.getXY();
      const distance = getDistanceBetween(x, y, playerX, playerY);
      if (distance < shortestDistance) {
        closestPlayer = player;
        shortestDistance = distance;
      }
    }

    return closestPlayer;
  }
}
