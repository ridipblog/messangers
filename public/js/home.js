// var socket = io.connect("http://localhost:3000/");
// var socket=io.connect('https://e94f70a34666.ngrok.io');
var socket = io.connect("https://indie-wider-und-progress.trycloudflare.com/");
var message = $("#mesboxid1");
var mesarea = $("#mesboxid");
var send = $("#mesbtnid");
var typed = $("#typing1");
var username = $("#user");
send.click(function () {
  socket.emit("joinRoom", "myRoom");
  //   socket.emit("mesfun1", {
  //     message: message.val().replace("\n", "<br>"),
  //     username: username.text(),
  //   });
  socket.emit(
    "mesfun1",
    {
      message: message.val().replace("\n", "<br>"),
      username: username.text(),
    },
    "myRoom"
  );
  message.val("");
});
socket.on("mesfun1", (readdata, roomName) => {
  //   console.log(readdata.roomName);
  console.log(roomName);
  mesarea.append(
    '<p class="mesp">' +
      readdata.username +
      ":-> <br>" +
      readdata.message +
      "</p>"
  );
});
function updateintfun1(index) {
  var input = document.getElementsByClassName("updateint");
  if (input[index].readOnly == true) {
    input[index].readOnly = false;
    input[index].type = "text";
  } else {
    input[index].readOnly = true;
    if (index == 2) {
      input[index].type = "password";
    }
  }
}
