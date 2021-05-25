function inputfun1()
{
	var input=document.getElementsByClassName("logint")[1];
	if(input.type=="text")
	{
		input.type="password";
	}
	else
	{
		input.type="text";
	}
}