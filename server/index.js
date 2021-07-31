const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const users = require("./core/data/users.json");

const commands = ["date", "rate", "map", "complete"];

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
  console.log("user connected with id of " + socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected " + socket.id);
  });

  socket.on("message", (output) => {
    const msgResponse = getMsgResponse(output);
    socket.emit("msg-response", msgResponse);
  });

  socket.on("command", (output) => {
    const cmdResponse = getCmdResponse(output);
    socket.emit("cmd-response", cmdResponse);
    console.log('cmd-response', cmdResponse);
  });
});

getCmdResponse = (output) => {
  const type = commands.find((i) => i === output.message);
  let data;
  if (!type) {
    return {
      author: "ottonova bot",
      message: "Unrecognized command",
    };
  }
  
  switch(type) {
    case 'date': {
      data = new Date();
      break;
    }
    case 'map': {
      data = 'Map Data';
      break;
    }
    case 'rate': {
      data = 'Rate Data';
      break;
    }
    case 'complete': {
      data = 'Complete Data';
      break;
    }
    default: {
      data = new Date();
      break;
    }
  }

  return {
    author: "ottonova bot",
    command: {
      type,
      data: data
    }
  };
};

getMsgResponse = (output) => {
  return {
    author: "ottonova bot",
    message: `Hey ${output.author}, you said '${output.message}', right?`,
  };
};

// ////////////////

/// ENDPOINTS
app.get("/hello", (req, res) => {
  res.send({ response: "hello" });
  console.log("hello");
});

app.post("/login", (req, res) => {
  const model = req.body;
  const result = users.find(
    (i) => i.userName === model.userName && i.password === model.password
  );
  if (result) {
    console.log();
    res.send({ userName: model.userName });
  } else {
    res.status(400).send("Wrong Credentials");
  }
  console.log("login");
});
//// //////////

http.listen(3000, () => console.error("listening on http://localhost:3000/"));
