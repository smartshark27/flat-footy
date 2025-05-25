extends CharacterBody2D

const RUN_SPEED: float = 50.0

var state: Globals.PlayerState = Globals.PlayerState.STANDING


func _physics_process(delta: float) -> void:
	var matchBall: Node2D = _get_match_ball()

	if state == Globals.PlayerState.SEEKING_BALL and matchBall:
		_move_toward(delta, matchBall.position)
	elif state == Globals.PlayerState.HAS_BALL:
		_move_toward(delta, Vector2(position.x, 0))

	_check_collisions()


func _move_toward(delta: float, target: Vector2) -> void:
	# Calculate the direction vector
	var direction = target - self.position
	# Normalize the direction vector
	direction = direction.normalized()
	# Set the velocity based on direction and speed
	velocity = direction * RUN_SPEED
	# Move the character body and handle collisions
	move_and_slide()


func _check_collisions() -> void:
	var collision: KinematicCollision2D = get_last_slide_collision()
	if collision && collision.get_collider().name == "Ball":
		_take_possession()


func _take_possession() -> void:
	$Camera2D.make_current()
	state = Globals.PlayerState.HAS_BALL
	var match_ball: Node2D = _get_match_ball()
	if match_ball:
		match_ball.queue_free()
	$Ball.visible = true


func _get_match_ball() -> Node2D:
	return get_parent().get_parent().get_node("Ball")
