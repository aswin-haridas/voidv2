//connect to websocket server
const socket = new WebSocket("ws://localhost:8080");
//connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server");
});
