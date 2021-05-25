var socket=io.connect('http://localhost:3000/');
// var socket=io.connect('https://e94f70a34666.ngrok.io');
var message=$('#mesboxid1');
var mesarea=$('#mesboxid');
var send=$('#mesbtnid');
var typed=$('#typing1');
var username=$('#user');
send.click(function(){
	socket.emit('mesfun1',{
		message:message.val().replace('\n','<br>'),
		username:username.text()
	});
	message.val('');
});
socket.on('mesfun1',(readdata)=>{
	mesarea.append('<p class="mesp">'+readdata.username+":-> <br>"+readdata.message+"</p>");
});
function updateintfun1(index)
{
	var input=document.getElementsByClassName('updateint');
	if(input[index].readOnly==true)
	{
		input[index].readOnly=false;
		input[index].type="text";
	}
	else
	{
		input[index].readOnly=true;
		if(index==2)
		{
			input[index].type="password";
		}
	}
}