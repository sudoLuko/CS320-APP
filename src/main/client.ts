//For testing. Will be moved into renderer

//Brings in websocket from node.js
const WebSocket = require('ws');

//Create interface for getting stdin and out from user. Used for testing
//client messages sent to server
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//create a new websocket pointed at localhost:3050
let socket = new WebSocket("ws://localhost:3050");


//open the socket
socket.onopen = function(e) {
	//test qustions to test sending random data to the server
	rl.question("What is your name ? ", function(name){
		socket.send(`My name is: ${name}`);
		rl.question("What year is it ? ", function(year){
			socket.send(`It is the year: ${year}`);
			//close interface for reading from stdin
			rl.close();
			//close the connect and end the program
			socket.close();
		});
	});
};

//print out received messages from server to stdout. Used for testing.
//communication
socket.onmessage = function(event) {
  console.log(`Received from server: ${event.data}`);
};

