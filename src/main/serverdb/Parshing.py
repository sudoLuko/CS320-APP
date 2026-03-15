#Fusnctions used for checking commands from the client and getting results for those commands.

import json
#from serverdb.ServerDB import ServerDB
import ServerDB

def create_new_user(MDB, code):
	
	#give an error code if none valid connection was passed in
	if ServerDB.is_connected(MDB) == False:
		return (4, MDB)
	
	#if user asked to create a new user without giving a username, return with an error code
	if "username" not in code:
		return (2, MDB)
	
	#if user asked to create a new user without giving a password, return with an error code
	if "password" not in code:
		return (3, MDB)
	
	#return with error code if user with specified username already exists
	MDB = ServerDB.search_user(MDB, code["username"])

	if MDB["cursor"].rowcount > 0:
		return(1, MDB)
		
	#If no such user exists, then create the new user and return with success
	MDB = ServerDB.add_user(MDB, code["username"], code["password"])
	return (0, MDB)

def login_to_user(MDB, code):
	
	# serach for specificed user
	MDB = ServerDB.search_user(MDB, code["username"])
	
	#check if username used for login does not exist
	if MDB["cursor"].rowcount == 0:
		return(2, MDB)
	
	#check if password matches for user
	results = MDB["cursor"].fetchone()
	#if successfull, then return with results
	if results[1] == code["password"]:
		return (0, MDB)
	#otherwise, return with a, error code
	else:
		return (1, MDB)
	

