import express from "express";
import http from "http";

const app = express();
app.get("/", (req, res) => {
  res.send("Server running on 5010");
});

const server = http.createServer(app);
server.listen(5010, "127.0.0.1", () => {
  console.log("Server listening on 127.0.0.1:5010");
});
