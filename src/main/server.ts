//Should eventually be moved to a separate repository eventually

//import websocketserver from ws (webserver)
const { WebSocketServer } = require('ws');

//create a websocket ws server at port 3050
const wss = new WebSocketServer({ port: 3050 });

//receive a connection to websocketserver
wss.on('connection', function connection(ws) {
	//receive a message from that commection
	ws.on('message', function message(data) {
		
		//replace this section with specification on what to do based on what was what was received.
		
		//print out the what was received to stdout. For testinng connection
		console.log('Server received: %s', data);
		//Send messge back to test that message can be sent back to client
		ws.send(`Server received: ${data}`);
    });
});




