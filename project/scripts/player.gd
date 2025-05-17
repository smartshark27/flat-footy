extends CharacterBody2D


const SPEED = 50.0

var target: Vector2

func _physics_process(delta: float) -> void:
	# Check if a target is assigned
	if target != null:
		# Calculate the direction vector
		var direction = target - self.position

		# Normalize the direction vector
		direction = direction.normalized()

		# Set the velocity based on direction and speed
		velocity = direction * SPEED

		# Move the character body and handle collisions
		move_and_slide()
