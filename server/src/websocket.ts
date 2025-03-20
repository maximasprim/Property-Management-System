// import { Hono } from "hono";
// import { serve } from "@hono/node-server";
// import { WebSocketServer, WebSocket } from "ws";

// const app = new Hono();
// const wss = new WebSocketServer({ port: 8081 });

// const clients = new Set<InstanceType<typeof WebSocket>>();

// wss.on("connection", (ws) => {
//   clients.add(ws);
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log("Received:", message.toString());

//     // Broadcast message to all clients
//     clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message.toString());
//       }
//     });
//   });

//   ws.on("close", () => {
//     clients.delete(ws);
//     console.log("Client disconnected");
//   });
// });

// app.get("/", (c) => c.text("WebSocket server is running!"));

// serve(app);
// console.log("Server running on http://localhost:3000");
