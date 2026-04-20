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
	
	createConnnection(message: string) {
		
		this.socket = new WebSocket("ws://" + this.ipAddress + ":" + this.port);
		//console.log("test");
		//const socket = new WebSocket("ws://192.168.1.60:3050");
		
		//socket.onopen = function(e) {
		//	socket.send(`test electron`);
		//	socket.close();
		//}
		
		//this.socket.addEventListener("open", () => {
		//	this.socket.send(`test electron`);
			//this.socket.close();
		//});
		
		this.settupWebSocket(message);
		
		

		//return socket;
		
		//return "ab";
		
		
		
	}
	
	
	
	settupWebSocket(message: string) {
		
		//settup event to send message once the websocket has open
		this.socket.addEventListener("open", () => {
			this.socket.send(message);
			//this.socket.close();
		});
		
		//console.log("test");
		
		//settup event to send message once the websocket has open
		this.socket.addEventListener("message", (e) => {
			//this.socket.send(`test electron`);
			alert(e.data);
			this.socket.close();
		});
		
		
		
		
	}
	
	
	
	
	
	//settups event handlers for the websocket
	
	
	sendMessage (message: string) { 
		
		this.createConnnection(message);
		
	}
	
	closeConnection ( socket: WebSocket) {
		
		socket.close();
		
	}
	

	
	
		
}

