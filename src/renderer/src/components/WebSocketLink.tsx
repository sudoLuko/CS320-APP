//Brings in websocket from node.js
import WebSocket from 'ws';

export default class WebSocketLink {
	
	ipAddress: string
  	port: string

	constructor(ipAdress: string, port) {
		this.ipAdress = ipAdress;
		this.port = port;
	}
	
	createConnnection {
		
		let socket = new WebSocket("ws://" + this.ipAdress + ":" this.port);

		return socket
	}
	
	sendMessage (message: string, socket: WebSocket) { 
		
		socket.send("message");
		
	}
	
	closeConnection ( socket: WebSocket) {
		
		socket.close();
		
	}
	
}
