#class for connecting to Mariadb server, sending command, and receivng results from the Mariadb server.

#import mariadb module for working mariadb database
import mariadb
#import json module for parsing json strings
import json
#import sys

def startconnection(serverCR):
	try:
		conn = mariadb.connect(
			user = serverCR["username"],
			password = serverCR["password"],
			host = serverCR["host"],
			port = int(serverCR["port"]),
			database = serverCR["database"],
		)
		
		cursor = conn.cursor()
	
	#If cannot successffully login to mariadb, then return an error code with the error so that 
	#administrator can better handle it
	except mariadb.Error as e:
		return(1, e)
		
	#print(cursor)	
	MDB = {"conn": conn, "cursor": cursor}
	return (0, MDB)
	
def closeconnection(MDB):
	MDB["cursor"].close()
	MDB["conn"].close()
	return MDB
	
def search(MDB, command):
	MDB["cursor"].execute(command)
	return MDB
	
def insert(MDB, command):
	MDB["cursor"].execute(command)
	MDB["conn"].commit()
	return MDB
	
def add_user(MDB, username, password):
	MDB["cursor"].execute('INSERT INTO Users (usernames, passwords) VALUES (%s, %s)', (username, password))
	MDB["conn"].commit()
	return MDB

def search_user(MDB, username):
	MDB["cursor"].execute('SELECT * FROM Users WHERE usernames = %s', (username,))
	return MDB
	
def delete_user(MDB, username):
	MDB["cursor"].execute('DELETE FROM Users WHERE usernames = %s', (username,))
	MDB["conn"].commit()
	return MDB

def is_connected(MDB):
    try:
       MDB["conn"].ping()
    except:
        return False
    return True
