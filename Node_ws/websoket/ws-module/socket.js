import { WebSocketServer as wss, WebSocket as ws } from "ws";
const wss = new ws.Server({ server });

app.set("wss", wss);

wss.on("connection", (ws, req) => {
  if (req.url === "/rooms") {
    ws.location = "index";
    ws.send(JSON.stringify(app.get("db").rooms));
  } else if (req.url.startsWith("/chat/")) {
    ws.location = req.url.split("/")[2];
    ws.on("message", (message) => {
      wss.clients.forEach((client) => {
        if (
          client !== ws &&
          client.readyState === ws.OPEN &&
          client.location === ws.location
        )
          client.send(message.toString());
      });
    });
  }
});

app.post("/newroom", (req, res) => {
  const { title } = req.body;
  const roomId = req.sessionID + Date.new();
  const { rooms } = app.get("db");
  rooms.push({ title, roomId });
  app.get("wss").client.forEach((client) => {
    if (client.location === "index" && client.readyState === client.OPEN)
      client.send(JSON.stringify(rooms));
  });
  return res.redirect(`/chat/${roomId}`);
});
