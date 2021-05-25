function searchfun1()
{
	var usersp=document.getElementsByClassName('usersp1');
	var input=document.getElementsByClassName('searchint')[0].value;
	var box=document.getElementsByClassName('usersdiv1');
	var temp="";
	var bool1=true;
	var text="";
	var arr=[];
	var arr1=[];
	input=input.trim().toLowerCase();
	if(input=="")
	{
		alert("Enter A Uniqe Name");
	}
	else
	{
		for(var i=0;i<usersp.length;i++)
		{
			temp=usersp[i].textContent;
			for(var j=0;j<input.length;j++)
			{
				if(temp[j]==input[j])
				{
					bool1=true;
				}
				else
				{
					bool1=false;
					break;
				}
			}
			if(bool1)
			{
				arr.push(i);
			}
			else
			{
				arr1.push(i);
			}
		}
		for(var i=0;i<arr.length;i++)
		{
			box[arr[i]].style.display="flex";
		}
		for(var i=0;i<arr1.length;i++)
		{
			box[arr1[i]].style.display="none";
		}
	}
}