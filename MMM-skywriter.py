#!/usr/bin/env python
import sys
import json
import time
import signal
import skywriter

some_value = 5000

last_airwheel = 0
delay = 5000

def to_node(type, message):
	# convert to json and print (node helper will read from stdout)
	try:
		print(json.dumps({'type': type, 'data': message}))
	except Exception:
		pass
	# stdout has to be flushed manually to prevent delays in the node helper communication
	sys.stdout.flush()

to_node("status", 'Skywriter started...')

@skywriter.flick()
def flick(start,finish):

	if(start == "north" and finish == "south"):
		to_node("gesture", "down")

	elif(start == "south" and finish == "north"):
		to_node("gesture", "up")

	elif(start == "west" and finish == "east"):
		to_node("gesture", "right")

	elif(start == "east" and finish == "west"):
		to_node("gesture", "left")

	#else:
		# print "Invalid"

@skywriter.airwheel()
def spinny(delta):
	global some_value
	some_value += delta
	if some_value < 0:
		some_value = 0
	if some_value > 10000:
		some_value = 10000
	to_node("airwheel", some_value/100)

@skywriter.double_tap()
def doubletap(position):
	to_node("double_tap", position)

@skywriter.tap()
def tap(position):
	to_node("tap", position)

@skywriter.touch()
def touch(position):
	to_node("touch", position)

signal.pause()
