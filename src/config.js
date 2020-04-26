// General
const FPS = 60;
const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

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

//-----------------------------------------------------------------------------
// Derived
//-----------------------------------------------------------------------------

// General
const FRAME_DELAY = Math.floor(1000 / FPS);

// Field
const BOUNDARY_RIGHT = BOUNDARY_WIDTH / 2;
const BOUNDARY_LEFT = -BOUNDARY_RIGHT;
const BOUNDARY_BOTTOM = BOUNDARY_HEIGHT / 2;
const BOUNDARY_TOP = -BOUNDARY_BOTTOM;