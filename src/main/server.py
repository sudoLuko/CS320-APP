#Code for running a websocket server in python. Acts as a middle man between the typyscript client and the Mariadb server
#This file and all files related to handeling the server should eventually be moved to a separate repository 

import asyncio
import websockets
import json
#from serverdb.ServerDB import ServerDB
from serverdb import ServerDB

serverCrFile = open("credentials.json")
serverCR = json.load(serverCrFile)
#print(serverCR["username"])

MDB = ServerDB.startconnection(serverCR)

#print(MDB["cursor"])

#MDB = ServerDB.closeconnection(MDB)

#print(MDB["cursor"])

async def echo(websocket):
	async for message in websocket:
		#print(websocket)
		print(message)
		await websocket.send(message)
		
async def main():
	async with websockets.serve(echo, "localhost", 3050):
		await asyncio.Future() # run forever
		
asyncio.run(main())



