//Brings in websocket from node.js
//import WebSocket from 'ws';

//const WebSocket = require('ws');

export default class WebSocketLink {
	
	ipAddress: string
  	port: string
  	//socket: WebSocket

	constructor(ipAdress: string, port) {
		this.ipAdress = ipAdress;
		this.port = port;
	}
	
	createConnnection() {
		
		//let socket = new WebSocket("ws://" + this.ipAdress + ":" this.port);
		console.log("test");
		//const socket = new WebSocket("ws://localhost:3050");
		
		//socket.addEventListener("open", (event) => {
		//	socket.send("Hello Server!");
		//}

		//return socket;
		
		return "ab";
		
		
		
	}
	
	sendMessage (message: string, socket: WebSocket) { 
		
		socket.send(message);
		
	}
	
	closeConnection ( socket: WebSocket) {
		
		socket.close();
		
	}
	
}
