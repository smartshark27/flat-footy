extends CharacterBody2D

@export var team_position: Globals.TeamPosition

const RUN_SPEED: float = 7 * Globals.PIXEL_PER_METRE
const MAX_KICK_METRES: float = 60.0
const BALL_PLAYER_DISPOSAL_SEPARATION = 24.0

const BALL_SCENE: PackedScene = preload("res://scenes/ball.tscn")

var state: Globals.PlayerState = Globals.PlayerState.STANDING


func _physics_process(delta: float) -> void:
	var matchBall: Node2D = _get_match_ball()

	if state == Globals.PlayerState.SEEKING_BALL and matchBall:
		_move_toward(delta, matchBall.position)
	elif state == Globals.PlayerState.HAS_BALL:
		_move_toward(delta, _get_stadium().get_node("BlueGoalMiddle").global_position)

	_check_collisions()


func _on_think_timer_timeout() -> void:
	if state == Globals.PlayerState.HAS_BALL:
		_decide_what_to_do_with_ball()


func _decide_what_to_do_with_ball() -> void:
	const kick_range: float = MAX_KICK_METRES * Globals.PIXEL_PER_METRE
	var distance_from_goal: float = _get_distance_from_goal()
	if distance_from_goal < kick_range:
		var kick_at_goal_chance: float = (kick_range - distance_from_goal) / kick_range
	 	#Tmp always kick immediately
		#if randf() < kick_at_goal_chance:
		_kick_ball_at_goal()
		state = Globals.PlayerState.STANDING


func _get_distance_from_goal() -> float:
	return position.distance_to(_get_stadium().get_node("BlueGoalMiddle").global_position)


func _kick_ball_at_goal() -> void:
	print("kicking at goal")

	var kick_aim_length: float = maxf(MAX_KICK_METRES * Globals.PIXEL_PER_METRE,
			_get_distance_from_goal() + 10)
	var target_direction: Vector2 = (
		_get_stadium().get_node("BlueGoalMiddle").global_position - global_position
	).normalized()
	# Uncomment to temporarily change direction
	#var target_direction: Vector2 = (
		#_get_stadium().get_node("BlueGoalMiddle").global_position + Vector2(150, 0) - global_position
	#).normalized()
	var target_point: Vector2 = global_position + (target_direction * kick_aim_length)

	var match_ball = BALL_SCENE.instantiate()
	var ball_pos: Vector2 = global_position + (target_direction * BALL_PLAYER_DISPOSAL_SEPARATION)
	match_ball.global_position = ball_pos
	match_ball.kick_at(target_point)

	_get_match().add_child(match_ball)

	$Ball.visible = false


func _move_toward(delta: float, target: Vector2) -> void:
	var direction = (target - position).normalized()
	$Ball.rotation = direction.angle() + PI / 2
	velocity = direction * RUN_SPEED
	move_and_slide()


func _check_collisions() -> void:
	var collision: KinematicCollision2D = get_last_slide_collision()
	if collision && collision.get_collider().name == "Ball":
		_take_possession()


func _take_possession() -> void:
	var match_ball: Node2D = _get_match_ball()

	# Transition camera smoothly from ball to player
	var start_camera_pos: Vector2 = match_ball.get_node("Camera2D").global_position
	var target_camera_pos: Vector2 = $Camera2D.global_position
	$Camera2D.global_position = start_camera_pos.lerp(target_camera_pos, 0.1)
	$Camera2D.make_current()

	state = Globals.PlayerState.HAS_BALL
	match_ball.queue_free()
	$Ball.visible = true


func _get_match_ball() -> Node2D:
	return _get_match().get_node("Ball")


func _get_stadium() -> Node2D:
	return _get_match().get_node("Stadium")


func _get_match() -> Node2D:
	return get_parent().get_parent()
