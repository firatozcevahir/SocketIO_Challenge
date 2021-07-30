const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const users = require("./core/data/users.json");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.get("/hello", (req, res) => {
  res.send({ response: "hello" });
  console.log("hello");
});

app.post("/login", (req, res) => {
  const model = req.body;
  const result = users.find(i => i.userName === model.userName && i.password === model.password);
  if (result) {
    res.send(true);
  } else {
    res.status(400).send("Wrong Credentials");
  }
  console.log("login");
});

io.on("connection", (s) => {
  console.log("connected");
});

http.listen(3000, () => console.error("listening on http://localhost:3000/"));
