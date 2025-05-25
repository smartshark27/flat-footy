extends Node2D

@export var ball: RigidBody2D
@export var attack_direction: String

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	$Player.state = Globals.PlayerState.SEEKING_BALL
	$Player2.state = Globals.PlayerState.SEEKING_BALL


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
