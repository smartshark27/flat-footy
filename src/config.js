// General
const FPS = 60;
const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;
const TOP_TEAM_NAME = "Blue";
const BOTTOM_TEAM_NAME = "Red";
const GOAL_POINTS = 6;
const BEHIND_POINTS = 1;

// Field
const BOUNDARY_WIDTH = 100;
const BOUNDARY_HEIGHT = 160;
const CENTRE_SQUARE_WIDTH = 50;
const CENTRE_SQUARE_HEIGHT = 50;
const CENTRE_CIRCLE_RADIUS = 5;
const CENTRE_INNER_CIRCLE_RADIUS = 1.5;
const FIFTY_LINE_DISTANCE_FROM_GOAL = 45;
const GOAL_SQUARE_LENGTH = 9;
const LINE_THICKNESS = 0.3;
const GRASS_WIDTH = BOUNDARY_WIDTH + 20;
const GRASS_HEIGHT = BOUNDARY_HEIGHT + 20;
const BACKGROUND_WIDTH = GRASS_WIDTH * 2;
const BACKGROUND_HEIGHT = GRASS_HEIGHT * 2;

// Post
const POST_SEPARATION = 6.4;
const POST_RADIUS = 0.5;

// Ball
const BALL_RADIUS_X = 0.6;
const BALL_RADIUS_Y = 0.8;
const BALL_COLLECT_RADIUS = (BALL_RADIUS_X + BALL_RADIUS_Y) / 2;
const HEIGHT_SCALE = 0.3;
const BALL_SPEED = 12;
const BALL_UP_HEIGHT = 10;
const BALL_UP_START_HEIGHT = 0;
const BALL_MIN_TAP_RADIUS = 4;
const BALL_MAX_TAP_RADIUS = 12;
const BALL_SPIN_MIN_RADIUS_Y = 0.5;
const BALL_SPIN_NUMBER_OF_FRAMES = 4;
const BOUNDARY_CROSSED_RESET_DELAY = 2000;

// Player
const PLAYER_RADIUS = 1;
const PLAYER_SPEED = 5;
const COLLECT_RADIUS = PLAYER_RADIUS + BALL_COLLECT_RADIUS + 0.5;
const COLLECT_HEIGHT = 3;
const MAX_PASS_DISTANCE = 55;
const PLAYER_FREEZE_TIME = 200;
const PLAYER_COLLISION_RADIUS = PLAYER_RADIUS;
const PLAYER_WAIT_DISTANCE_FROM_TARGET = BALL_COLLECT_RADIUS / 2;
const PUSH_MULTIPLIER = 15;
const PUSH_CHANCE = 0.1;

// Message
const MESSAGE_TEXT_SIZE = 3;
const START_MESSAGE = "Touch to start";
const TEMP_MESSAGE_LIFETIME = 3000;
const MESSAGE_DISTANCE_ABOVE_CENTRE = 25;

// Scoreboard
const SCOREBOARD_DISTANCE_FROM_LEFT = 3;
const SCOREBOARD_DISTANCE_FROM_BOTTOM = 3;
const SCOREBOARD_TEXT_SIZE = 3;
const SCOREBOARD_MARGIN = 5;
const SCOREBOARD_PADDING = 1;
const SCOREBOARD_WIDTH = 17;
const SCOREBOARD_OPACITY = 0.7;
const SCOREBOARD_COLOR_WIDTH = 2;

//-----------------------------------------------------------------------------
// Derived
//-----------------------------------------------------------------------------

// General
const FRAME_DELAY = Math.floor(1000 / FPS);
const VIEWBOX_LEFT = -(VIEWBOX_WIDTH / 2);
const VIEWBOX_RIGHT = VIEWBOX_WIDTH / 2;
const VIEWBOX_TOP = -(VIEWBOX_HEIGHT / 2);
const VIEWBOX_BOTTOM = VIEWBOX_HEIGHT / 2;

// Field
const BOUNDARY_RIGHT = BOUNDARY_WIDTH / 2;
const BOUNDARY_LEFT = -BOUNDARY_RIGHT;
const BOUNDARY_BOTTOM = BOUNDARY_HEIGHT / 2;
const BOUNDARY_TOP = -BOUNDARY_BOTTOM;

// Scoreboard
const SCOREBOARD_LINE_HEIGHT = 2 * SCOREBOARD_PADDING + SCOREBOARD_TEXT_SIZE;
const SCOREBOARD_HEIGHT = 2 * SCOREBOARD_LINE_HEIGHT;