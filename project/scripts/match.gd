extends Node2D


func _on_start_timer_timeout() -> void:
	$BlueTeam.teleport_to_centre_bounce_positions()
	$RedTeam.teleport_to_centre_bounce_positions()
