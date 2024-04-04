var express = require("express");
var http = require("http");
var path = require("path");

var appServer = express();
appServer.use(express.static(path.join(__dirname, "")));

appServer.get("*", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

http.createServer(appServer).listen(3007, function () {
  console.log("Express server listening on port");
});
