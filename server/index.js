const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const users = require("./core/data/users.json");

const commands = ["date", "rate", "map", "complete"];

let connectedClientIds = [];

const io = require("socket.io")(http, {
  path: "/socket",
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

// SOCKET IO
io.on("connection", (socket) => {
  console.log(`${socket.id}|connected`);
  connectedClientIds.push(socket.id);

  console.log(connectedClientIds);
  socket.emit("msg-response", {
    author: "ottonova bot",
    message: "You are now connected",
  });

  socket.on("disconnect", () => {
    const clientIndex = connectedClientIds.findIndex((i) => i === socket.id);
    if (clientIndex > -1) {
      connectedClientIds = connectedClientIds.slice(clientIndex, 1);
    }
    console.log(`${socket.id}|disconnected`);
  });

  socket.on("message", (input) => {
    const msgResponse = getMsgResponse(input);
    socket.emit("msg-response", msgResponse);
    console.log(`${socket.id}|${input.message}`);
  });

  socket.on("option-select", (input) => {
    console.log(`${socket.id}|${input}`);
  });

  socket.on("command", (input) => {
    const cmdResponse = getCmdResponse(input);
    socket.emit("cmd-response", cmdResponse);
    console.log(`${socket.id}|${cmdResponse.command?.data}`);
  });
});

getMsgResponse = (output) => {
  return {
    author: "ottonova bot",
    message: `Hey ${output.author}, you said '${output.message}', right?`,
  };
};

getCmdResponse = (input) => {
  const type = commands.find((i) => i === input.message);
  let data;
  if (!type) {
    return {
      author: "ottonova bot",
      message: "Unrecognized command",
    };
  }

  switch (type) {
    case "date": {
      data = new Date();
      break;
    }
    case "map": {
      data = { lat: 36.87676, lng: 30.641101 };
      break;
    }
    case "rate": {
      data = [1, 8];
      break;
    }
    case "complete": {
      data = ["Yes", "No"];
      break;
    }
    default: {
      data = new Date().toString();
      break;
    }
  }

  return {
    author: "ottonova bot",
    command: {
      type,
      data: data,
    },
  };
};

// ////////////////

/// ENDPOINTS
app.get("/hello", (req, res) => {
  res.send({ response: "hello" });
});

app.post("/login", (req, res) => {
  const model = req.body;
  const result = users.find((i) => i.userName === model.userName && i.password === model.password);
  if (result) {
    res.send({ id: result.id, userName: result.userName });
  } else {
    res.status(400).send("Wrong Credentials");
  }
});

app.get("/getUserDetails/:id", (req, res) =>{
  const model = req.params;
  const result = users.find(i => i.id === model.id);
  if(result){
    res.send({ id: result.id, userName: result.userName});
  }else {
    res.status(403).send("User not Authenticated");
  }
});
//// //////////

http.listen(3000, () => console.error("listening on http://localhost:3000/"));
