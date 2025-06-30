extends Node2D

@export var attack_direction: String
@export var player_texture: Texture2D


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print("Initialisating team")
	_init_players()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _init_players() -> void:
	for player in _get_players():
		_init_player(player)


func _init_player(player: CharacterBody2D) -> void:
	player.get_node("Sprite2D").texture = player_texture


func _get_players() -> Array[CharacterBody2D]:
	var players: Array[CharacterBody2D] = []
	players.assign(get_children().filter(func(p): return p.is_in_group("players")))
	return players
