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
	
def add_user(MDB, username, password, firstname, lastname):
	MDB["cursor"].execute('INSERT INTO Users (username, password, firstname, lastname) VALUES (%s, %s, %s, %s)', (username, password, firstname, lastname))
	MDB["conn"].commit()
	return MDB

def search_user(MDB, username):
	MDB["cursor"].execute('SELECT * FROM Users WHERE username = %s', (username,))
	return MDB
	
def delete_user(MDB, username):
	MDB["cursor"].execute('DELETE FROM Users WHERE username = %s', (username,))
	MDB["conn"].commit()
	return MDB

def is_connected(MDB):
    try:
       MDB["conn"].ping()
    except:
        return False
    return True

#Used for resetting KANFLOW database to default empty comfiguration.
#Should not really be used, mostly here to keep track for the
#needed reset commands
def reset_KANFLOW(MDB):
	MDB["cursor"].execute("DROP TABLE Users")
	MDB["cursor"].execute("CREATE TABLE Users(nid int unsigned auto_increment, username nvarchar(128) not null, password nvarchar(128) not null, firstname nvarchar(128) not null, lastname nvarchar(128) not null, primary key(nid), unique key(username))")
	MDB["conn"].commit()
