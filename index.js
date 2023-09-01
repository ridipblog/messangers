const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const env = require("dotenv");
app.set("view engine", "hbs");
app.use("/public", express.static("public"));
const encoded = bodyParser.urlencoded({ extended: true });
app.use(cookieParser());
app.use(session({ secret: "cookie", resave: true, saveUninitialized: true }));
env.config({ path: "./require/config.env" });
const User = require("./models/users");
require("./require/connection.js");
const port = process.env.PORT || 3000;
const registration = require("./route/registration");
const login = require("./route/login");
const home = require("./route/home");
const logout = require("./route/logout");
const update = require("./route/update");
const search = require("./route/search");
app.use("/", registration);
app.use("/", login);
app.get("/home", (req, res) => {
  if (req.session.uniqe_name) {
    res.render("home", {
      uniqe_name: req.session.uniqe_name,
      user_name: req.session.user_name,
      user_pass: req.session.user_pass,
      update_text: req.session.update_text,
    });
  } else {
    res.redirect("/login");
  }
});
app.use("/", home);
app.use("/", logout);
app.use("/", update);
app.use("/", search);
const server = app.listen(port);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName); // Join the specified room
  });
  //   socket.on("mesfun1", (readdata) => {
  //     io.sockets.emit("mesfun1", {
  //       message: readdata.message,
  //       username: readdata.username,
  //     });
  //   });
  socket.on("mesfun1", (readdata, roomName) => {
    // Emit the message to all clients in the specified room
    io.to(roomName).emit(
      "mesfun1",
      {
        message: readdata.message,
        username: readdata.username,
        //   roomName: roomName,
      },
      roomName
    );
  });
});
