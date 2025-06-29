extends CharacterBody2D

const SPEED = 15 * Globals.PIXEL_PER_METRE
const BASE_SPRITE_SCALE = 0.5
const HEIGHT_TO_SPRITE_SCALE = 0.04
const HEIGHT_PER_SPIN = 4

var is_moving: bool = false
var move_source: Vector2
var move_target: Vector2
# Height of ball in metres
# 1 is the lowest and means that ball is on ground or in player's possession
var height: float = 1


func _ready() -> void:
	_connect_signals()


func _exit_tree() -> void:
	_disconnect_signals()


func _connect_signals() -> void:
	var stadium: Node2D = _get_stadium()
	# Trigger function when ball exits boundary line
	stadium.get_node("Boundary").body_exited.connect(_on_exited_boundary)
	stadium.get_node("BlueGoalZone").body_entered.connect(_on_pass_through_goal_posts)
	stadium.get_node("RedGoalZone").body_entered.connect(_on_pass_through_goal_posts)
	stadium.get_node("BlueLeftBehindZone").body_entered.connect(_on_pass_through_behind_posts)
	stadium.get_node("BlueRightBehindZone").body_entered.connect(_on_pass_through_behind_posts)
	stadium.get_node("RedLeftBehindZone").body_entered.connect(_on_pass_through_behind_posts)
	stadium.get_node("RedRightBehindZone").body_entered.connect(_on_pass_through_behind_posts)


func _disconnect_signals() -> void:
	var stadium: Node2D = _get_stadium()
	stadium.get_node("Boundary").body_exited.disconnect(_on_exited_boundary)
	stadium.get_node("BlueGoalZone").body_entered.disconnect(_on_pass_through_goal_posts)
	stadium.get_node("RedGoalZone").body_entered.disconnect(_on_pass_through_goal_posts)
	stadium.get_node("BlueLeftBehindZone").body_entered.disconnect(_on_pass_through_behind_posts)
	stadium.get_node("BlueRightBehindZone").body_entered.disconnect(_on_pass_through_behind_posts)
	stadium.get_node("RedLeftBehindZone").body_entered.disconnect(_on_pass_through_behind_posts)
	stadium.get_node("RedRightBehindZone").body_entered.disconnect(_on_pass_through_behind_posts)
	

func _on_exited_boundary(ball: Node2D) -> void:
	print("ball has crossed boundary")
	_stop_moving()


func _on_pass_through_goal_posts(ball: Node2D) -> void:
	print("ball has passed through goal posts")
	_stop_moving()


func _on_pass_through_behind_posts(ball: Node2D) -> void:
	print("ball has passed through behind posts")
	_stop_moving()


func _physics_process(delta: float) -> void:
	if is_moving:
		_move_toward(delta)


func kick_at(target: Vector2) -> void:
	move_source = global_position
	move_target = target
	is_moving = true


func _move_toward(delta: float) -> void:
	var direction = (move_target - global_position).normalized()
	$Sprite2D.rotation = direction.angle() + PI / 2
	velocity = direction * SPEED
	move_and_slide()

	_check_collision()

	_set_height()

	if global_position.distance_to(move_target) < 2:
		_stop_moving()

	_set_sprite_size_from_height()


func _check_collision() -> void:
	var collision = get_last_slide_collision()
	if collision:
		var collider = collision.get_collider()
		var stadium = _get_stadium()
		if collider in [stadium.get_node("BlueLeftBehindPost"), stadium.get_node("BlueRightBehindPost")]:
			print("Hit blue behind post")
			_stop_moving()
		if collider in [stadium.get_node("BlueLeftGoalPost"), stadium.get_node("BlueRightGoalPost")]:
			print("Hit blue goal post")
			_stop_moving()
		if collider in [stadium.get_node("RedLeftBehindPost"), stadium.get_node("RedRightBehindPost")]:
			print("Hit red behind post")
			_stop_moving()
		if collider in [stadium.get_node("RedLeftGoalPost"), stadium.get_node("RedRightGoalPost")]:
			print("Hit red goal post")
			_stop_moving()


func _set_height() -> void:
	# Sets height based on distance to peak
	var peak = (move_source + move_target) / 2
	var move_length = move_source.distance_to(move_target)
	var distance_to_peak = global_position.distance_to(peak)
	height = (move_length / 2 - distance_to_peak) / Globals.PIXEL_PER_METRE


func _stop_moving() -> void:
	is_moving = false
	height = 1


func _set_sprite_size_from_height() -> void:
	var new_scale = BASE_SPRITE_SCALE + HEIGHT_TO_SPRITE_SCALE * height
	var spin_scale = new_scale * lerpf(1.0, 0.5, fmod(height, HEIGHT_PER_SPIN) / HEIGHT_PER_SPIN)
	$Sprite2D.scale = Vector2(new_scale, spin_scale)


func _get_stadium() -> Node2D:
	return _get_match().get_node("Stadium")


func _get_match() -> Node2D:
	return get_parent()
