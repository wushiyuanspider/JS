function ajax(url,fnSucc,fnFailed){
				//1创建Ajax对象
					if(window.XMLHttpRequest){
						var oAjax = new XMLHttpRequest();
					}else{
						var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
					}
				

					//2连接服务器
					//open(方法， 文件名)
					oAjax.open('GET',url,true);

					//3.发送请求
					oAjax.send();


					//4.接收返回
					oAjax.onreadystatechange = function(){
					//	oAjax.readyState //浏览器和服务器，进行到哪一步了
					
						if(oAjax.readyState == 4){
							if(oAjax.status == 200){
								fnSucc(oAjax.responseText);	
							}else{
								if(fnFailed){
									fnFailed(oAjax.status);
								}	
							}
						}

					}
}	
