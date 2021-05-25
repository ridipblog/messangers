function showmenu(show,hide)
{
	var div=document.getElementsByClassName('mainmenu');
	div[show].style.display="flex";
	div[hide].style.display="none";
}
function inputfun1()
{
	var input=document.getElementsByClassName("regint")[2];
	if(input.type=="text")
	{
		input.type="password";
	}
	else
	{
		input.type="text";
	}
}