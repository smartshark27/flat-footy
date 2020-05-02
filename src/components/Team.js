class Team extends Component {
  constructor(attributes, number) {
    super();

    this.name = attributes.name;
    this.nickname = attributes.nickname;
    this.colors = attributes.colors;
    this.players = attributes.players;
    this.number = number;

    this.draw();
  }

  draw() {
    for (var position in DEFAULT_PLAYER_POSITIONS) {
      this.addElement(new Player(this, position, this.players[position]));
    }
  }

  teleportPlayersToStartPositions() {
    this.elements.forEach((player) => player.teleportToStartPosition());
  }

  moveClosestPlayerTowardsBall(ballX, ballY, tapBall = false) {
    const player = this.getClosestPlayerTo(ballX, ballY);
    player.runTowards(ballX, ballY, tapBall);
  }

  getClosestPlayerTo(x, y) {
    var closestPlayer;
    var shortestDistance = Infinity;

    for (var player of this.elements) {
      if (player.isFrozen()) {
        continue;
      }
      const [playerX, playerY] = player.getXY();
      const distance = getDistanceBetween(x, y, playerX, playerY);
      if (distance < shortestDistance) {
        closestPlayer = player;
        shortestDistance = distance;
      }
    }

    return closestPlayer;
  }

  freezeRuckman() {
    this.getPlayer("R").freeze();
  }

  getPlayer(position) {
    const players = this.elements.filter(
      (player) => player.position == position
    );
    if (players[0]) {
      return players[0];
    } else {
      throw `Player with position ${position} is not on team ${this.name}`;
    }
  }

  getPlayers() {
    return this.elements;
  }
}
