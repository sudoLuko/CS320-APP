//Brings in websocket from node.js
//import WebSocket from 'ws';

//const WebSocket = require('ws');

export default class WebSocketLink {
	
	ipAddress: string
  	port: string
  	socket: WebSocket

	constructor(ipAddress: string, port) {
		this.ipAddress = ipAddress;
		this.port = port;
	}
	
	createConnnection() {
		
		this.socket = new WebSocket("ws://" + this.ipAddress + ":" + this.port);
		//console.log("test");
		//const socket = new WebSocket("ws://192.168.1.60:3050");
		
		//socket.onopen = function(e) {
		//	socket.send(`test electron`);
		//	socket.close();
		//}
		
		this.socket.addEventListener("open", () => {
			this.socket.send(`test electron`);
			this.socket.close();
		});
		
		

		//return socket;
		
		//return "ab";
		
		
		
	}
	
	sendMessage (message: string, socket: WebSocket) { 
		
		socket.send(message);
		
	}
	
	closeConnection ( socket: WebSocket) {
		
		socket.close();
		
	}
	

	
	
		
}

