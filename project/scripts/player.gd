extends CharacterBody2D

signal ball_taken

const SPEED = 50.0

var target: Vector2
var moving: bool = false
var has_ball: bool = false

func _physics_process(delta: float) -> void:
	# Check if a target is assigned
	if moving:
		# Calculate the direction vector
		var direction = target - self.position

		# Normalize the direction vector
		direction = direction.normalized()

		# Set the velocity based on direction and speed
		velocity = direction * SPEED

		# Move the character body and handle collisions
		move_and_slide()

		var collision: KinematicCollision2D = get_last_slide_collision()
		if collision && collision.get_collider().name == "Ball":
			moving = false
			ball_taken.emit()
			$Ball.visible = true


func run_to_target(t):
	moving = true
	target = t
