function reporter(e){function n(){var n=Trello.token(),a=new Date,r=window.location.href;$("#"+p+"-box #send").click(function(){var n=$("#"+p+"-box #name").val(),a=$("#"+p+"-box #desc").val();n.length>0&&a.length>0?(console.log(n,a),Trello.post("/cards",{name:n,desc:" \n**Feedback:** "+a+" \n\n--- \n\n **Browser name:** ```"+t+"``` \n **Major version:** ```"+o+"``` \n **Window Size (H×W):** ```"+screenHeight+" × "+screenWidth+"px``` \n\n--- \n\n **Full version:** ```"+s+"``` \n **navigator.appName:** ```"+navigator.appName+"``` \n\n`"+navigator.userAgent+"`",idList:""+e,urlSource:r}),$("#"+p+"-bg, #"+p+"-box").removeClass("active"),$("#"+p+"-box #name").val(""),$("#"+p+"-box #desc").val(""),$("#"+p+"-feedback").addClass("visible")):(n.length<1&&$("input#name").addClass("error"),a.length<1&&$("textarea").addClass("error"))})}function a(){console.log("Authorization failed.")}var r=navigator.appVersion,i=navigator.userAgent,t=navigator.appName,s=""+parseFloat(navigator.appVersion),o=parseInt(navigator.appVersion,10),d,c,l;-1!=(c=i.indexOf("Opera"))?(t="Opera",s=i.substring(c+6),-1!=(c=i.indexOf("Version"))&&(s=i.substring(c+8))):-1!=(c=i.indexOf("MSIE"))?(t="Microsoft Internet Explorer",s=i.substring(c+5)):-1!=(c=i.indexOf("Chrome"))?(t="Chrome",s=i.substring(c+7)):-1!=(c=i.indexOf("Safari"))?(t="Safari",s=i.substring(c+7),-1!=(c=i.indexOf("Version"))&&(s=i.substring(c+8))):-1!=(c=i.indexOf("Firefox"))?(t="Firefox",s=i.substring(c+8)):(d=i.lastIndexOf(" ")+1)<(c=i.lastIndexOf("/"))&&(t=i.substring(d,c),s=i.substring(c+1),t.toLowerCase()==t.toUpperCase()&&(t=navigator.appName)),-1!=(l=s.indexOf(";"))&&(s=s.substring(0,l)),-1!=(l=s.indexOf(" "))&&(s=s.substring(0,l)),o=parseInt(""+s,10),isNaN(o)&&(s=""+parseFloat(navigator.appVersion),o=parseInt(navigator.appVersion,10)),screenWidth=$("html").width(),screenHeight=$("html").height();var p="reporter";$("head").append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Marc3llo/reporter@master/reporter-0.1-min.css">'),$("body").append('<div id="'+p+'-container"><div id="'+p+'-bg"></div><div id="'+p+'-box"><input required="required" id="name" type="text" placeholder="Title"><textarea required="required" id="desc" name="desc" id="" cols="30" rows="10" placeholder="Description"></textarea><button id="send">send feedback</button><button id="cancel">cancel</button><span>powered by <a href="http://duotones.ch" target="_blank">duotones</a></span></div></div><div id="'+p+'-feedback" class="visible">send feedback</div>'),$("#"+p+"-feedback").on("click",function(){$("#"+p+"-bg, #"+p+"-box").addClass("active"),$("#"+p+"-feedback").removeClass("visible")}),Trello.authorize({interactive:!0,type:"redirect",expiration:"never",name:"Feedback",persist:"true",success:function(){n()},error:function(){a()},scope:{read:!0,write:!0}}),$("#"+p+"-box #cancel").on("click",function(){$("#"+p+"-bg, #"+p+"-box").removeClass("active"),$("#"+p+" #name").val(""),$("#"+p+" #desc").val(""),$("#"+p+"-feedback").addClass("visible")})}