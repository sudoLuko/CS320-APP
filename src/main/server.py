#Code for running a websocket server in python. Acts as a middle man between the typyscript client and the Mariadb server
#This file and all files related to handeling the server should eventually be moved to a separate repository 




import asyncio
import websockets
import json
from serverdb import ServerDB
from serverdb import Parshing

#example of json strings to receive
#x = '{ "command":"create_account", "code": { "username": "myusername", "password": "password1234", "firstname":"Myfirstnamev", "lastname":"Mylastname"}}'
#x = '{ "command":"login", "code": { "username": "myusername", "password": "password1234"}}'
#y = json.loads(x)




serverCrFile = open("credentials.json")
serverCR = json.load(serverCrFile)
#print(serverCR["username"])

(e, MDB) = ServerDB.startconnection(serverCR)

if e == 1:
	print("Could not connect to MariaDB")
	print("Error: ", end="")
	print(MDB)
	exit()

#print(MDB["cursor"])

if y["command"] == "create_account":
	(e, MDB) = Parshing.create_new_user(MDB, y["code"])
	if e == 4:
		print("MariaDB error, lost connect to MariaDB")
		exit()
	elif e == 1:
		print("The specfied username is alread in use. Please choose a different username")
	elif e == 0:
		print("Successfully added user to database")
	else:
		print("Error code not implemented")
		
if y["command"] == "login":
	(e, MDB) = Parshing.login_to_user(MDB, y["code"])
	if e == 2:
		print("The specfied username does not exist")
	if e == 1:
		print("password does not match for user")
	elif e == 0:
		(MDB, firstname, lastname) = MDB
		print("Successfully logged into user")
		print("Firstname: " + firstname + ", Lastname: " + lastname)
	else:
		print("Error code not implemented")
		

#MDB = ServerDB.closeconnection(MDB)

#print(MDB["cursor"])

async def echo(websocket):
	async for message in websocket:
		y = json.loads(message)
		if y["command"] == "create_account":
			(e, MDB) = Parshing.create_new_user(MDB, y["code"])
			if e == 4:
				print("MariaDB error, lost connect to MariaDB")
				exit()
			elif e == 1:
				print("The specfied username is alread in use. Please choose a different username")
			elif e == 0:
				print("Successfully added user to database")
			else:
				print("Error code not implemented")	
		elif y["command"] == "login":
			(e, MDB) = Parshing.login_to_user(MDB, y["code"])
			if e == 2:
				print("The specfied username does not exist")
			if e == 1:
				print("password does not match for user")
			elif e == 0:
				(MDB, firstname, lastname) = MDB
				print("Successfully logged into user")
				print("Firstname: " + firstname + ", Lastname: " + lastname)
			else:
				print("Error code not implemented")
		await websocket.send(message)
		
async def main():
	async with websockets.serve(echo, "0.0.0.0", 3050):
		await asyncio.Future() # run forever
		
asyncio.run(main())



