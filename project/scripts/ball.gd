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

	_set_height()

	if global_position.distance_to(move_target) < 2:
		_stop_moving()
	
	_set_sprite_size_from_height()


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
