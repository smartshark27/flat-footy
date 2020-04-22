const TEAM_OFFSET = PLAYER_RADIUS * 2;
const POCKET_FROM_GOAL_X = POST_SEPARATION * 2.5;
const POCKET_FROM_GOAL_Y = FIFTY_LINE_DISTANCE_FROM_GOAL / 2;
const FULL_FROM_GOAL_Y = FIFTY_LINE_DISTANCE_FROM_GOAL / 3;
const FLANK_FROM_GOAL_X = POST_SEPARATION * 2;
const FLANK_FROM_GOAL_Y = FIFTY_LINE_DISTANCE_FROM_GOAL;
const CENTRE_HALF_FROM_GOAL_Y = FIFTY_LINE_DISTANCE_FROM_GOAL - 5;
const WING_FROM_SQUARE_X = 0;
const CENTRE_DISTANCE_FROM_CIRCLE = 3;
const RUCK_DISTANCE_FROM_CIRCLE = 1;
const DEFAULT_PLAYER_POSITIONS = {
  LFP: {
    name: "Left Forward Pocket",
    x: -POCKET_FROM_GOAL_X + TEAM_OFFSET,
    y: -(BOUNDARY_HEIGHT / 2) + POCKET_FROM_GOAL_Y,
  },
  FF: {
    name: "Full Forward",
    x: TEAM_OFFSET,
    y: -(BOUNDARY_HEIGHT / 2) + FULL_FROM_GOAL_Y,
  },
  RFP: {
    name: "Right Forward Pocket",
    x: POCKET_FROM_GOAL_X + TEAM_OFFSET,
    y: -(BOUNDARY_HEIGHT / 2) + POCKET_FROM_GOAL_Y,
  },
  LHF: {
    name: "Left Half Forward Flank",
    x: -FLANK_FROM_GOAL_X + TEAM_OFFSET,
    y: -(BOUNDARY_HEIGHT / 2) + FLANK_FROM_GOAL_Y,
  },
  CHF: {
    name: "Centre Half Forward",
    x: TEAM_OFFSET,
    y: -(BOUNDARY_HEIGHT / 2) + CENTRE_HALF_FROM_GOAL_Y,
  },
  RHF: {
    name: "Right Half Forward Flank",
    x: FLANK_FROM_GOAL_X + TEAM_OFFSET,
    y: -(BOUNDARY_HEIGHT / 2) + FLANK_FROM_GOAL_Y,
  },
  LW: {
    name: "Left Wing",
    x: -(CENTRE_SQUARE_WIDTH / 2) - WING_FROM_SQUARE_X,
    y: TEAM_OFFSET,
  },
  C: {
    name: "Centre",
    x: 0,
    y: CENTRE_CIRCLE_RADIUS + CENTRE_DISTANCE_FROM_CIRCLE,
  },
  RW: {
    name: "Right Wing",
    x: CENTRE_SQUARE_WIDTH / 2 + WING_FROM_SQUARE_X,
    y: TEAM_OFFSET,
  },
  LHB: {
    name: "Left Half Back Flank",
    x: -FLANK_FROM_GOAL_X - TEAM_OFFSET,
    y: BOUNDARY_HEIGHT / 2 - FLANK_FROM_GOAL_Y,
  },
  CHB: {
    name: "Centre Half Back",
    x: -TEAM_OFFSET,
    y: BOUNDARY_HEIGHT / 2 - CENTRE_HALF_FROM_GOAL_Y,
  },
  RHB: {
    name: "Right Half Back Flank",
    x: FLANK_FROM_GOAL_X - TEAM_OFFSET,
    y: BOUNDARY_HEIGHT / 2 - FLANK_FROM_GOAL_Y,
  },
  LBP: {
    name: "Left Back Pocket",
    x: -POCKET_FROM_GOAL_X - TEAM_OFFSET,
    y: BOUNDARY_HEIGHT / 2 - POCKET_FROM_GOAL_Y,
  },
  FB: {
    name: "Full Back",
    x: -TEAM_OFFSET,
    y: BOUNDARY_HEIGHT / 2 - FULL_FROM_GOAL_Y,
  },
  RBP: {
    name: "Right Back Pocket",
    x: POCKET_FROM_GOAL_X - TEAM_OFFSET,
    y: BOUNDARY_HEIGHT / 2 - POCKET_FROM_GOAL_Y,
  },
  R: {
    name: "Ruck",
    x: 0,
    y: CENTRE_CIRCLE_RADIUS - RUCK_DISTANCE_FROM_CIRCLE,
  },
  RRV: {
    name: "Ruck Rover",
    x: -CENTRE_CIRCLE_RADIUS - CENTRE_DISTANCE_FROM_CIRCLE,
    y: -TEAM_OFFSET,
  },
  RV: {
    name: "Rover",
    x: CENTRE_CIRCLE_RADIUS + CENTRE_DISTANCE_FROM_CIRCLE,
    y: TEAM_OFFSET,
  },
};

function getPlayerPositionFullName(position) {
  return DEFAULT_PLAYER_POSITIONS[position].name;
}
