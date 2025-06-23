extends CharacterBody2D

const SPEED = 15 * Globals.PIXEL_PER_METRE

var is_moving = false
var move_target: Vector2


func _physics_process(delta: float) -> void:
	if is_moving:
		_move_toward(delta)


func _move_toward(delta: float) -> void:
	var direction = (move_target - self.global_position).normalized()
	velocity = direction * SPEED
	move_and_slide()

	if global_position.distance_to(move_target) < 2:
		stop_moving()


func kick_at(target: Vector2) -> void:
	move_target = target
	is_moving = true


func stop_moving() -> void:
	is_moving = false
