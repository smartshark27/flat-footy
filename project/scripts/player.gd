extends CharacterBody2D

signal ball_taken

const RUN_SPEED: float = 50.0

enum State {
	STANDING,
	SEEKING_BALL,
	HAS_BALL,
	PASSING
}

var state: State = State.STANDING
var move_target: Vector2


func _physics_process(delta: float) -> void:
	if state == State.SEEKING_BALL:
		_move_toward(move_target)

		var collision: KinematicCollision2D = get_last_slide_collision()
		if collision && collision.get_collider().name == "Ball":
			$Camera2D.make_current()
			state = State.HAS_BALL
			ball_taken.emit()
			$Ball.visible = true
	elif state == State.HAS_BALL:
		_move_toward(Vector2(position.x, 0))


func _move_toward(target: Vector2) :
	# Calculate the direction vector
	var direction = target - self.position
	# Normalize the direction vector
	direction = direction.normalized()
	# Set the velocity based on direction and speed
	velocity = direction * RUN_SPEED
	# Move the character body and handle collisions
	move_and_slide()


func seek_ball(t):
	state = State.SEEKING_BALL
	move_target = t
