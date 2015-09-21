function reporter(idList){

  var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName  = navigator.appName;
  var fullVersion  = ''+parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion,10);
  var nameOffset,verOffset,ix;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
   browserName = "Opera";
   fullVersion = nAgt.substring(verOffset+6);
   if ((verOffset=nAgt.indexOf("Version"))!=-1)
     fullVersion = nAgt.substring(verOffset+8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
   browserName = "Microsoft Internet Explorer";
   fullVersion = nAgt.substring(verOffset+5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
   browserName = "Chrome";
   fullVersion = nAgt.substring(verOffset+7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
   browserName = "Safari";
   fullVersion = nAgt.substring(verOffset+7);
   if ((verOffset=nAgt.indexOf("Version"))!=-1)
     fullVersion = nAgt.substring(verOffset+8);
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
   browserName = "Firefox";
   fullVersion = nAgt.substring(verOffset+8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
            (verOffset=nAgt.lastIndexOf('/')) )
  {
   browserName = nAgt.substring(nameOffset,verOffset);
   fullVersion = nAgt.substring(verOffset+1);
   if (browserName.toLowerCase()==browserName.toUpperCase()) {
    browserName = navigator.appName;
   }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix=fullVersion.indexOf(";"))!=-1)
     fullVersion=fullVersion.substring(0,ix);
  if ((ix=fullVersion.indexOf(" "))!=-1)
     fullVersion=fullVersion.substring(0,ix);

  majorVersion = parseInt(''+fullVersion,10);
  if (isNaN(majorVersion)) {
   fullVersion  = ''+parseFloat(navigator.appVersion);
   majorVersion = parseInt(navigator.appVersion,10);
  }

  screenWidth = $('html').width();
  screenHeight = $('html').height();

  var appname = 'reporter';

  $('head').append('<link rel="stylesheet" href="http://feedback.site/styles.css">');

  $('body').append('<div id="'+appname+'-container"><div id="'+appname+'-bg"></div><div id="'+appname+'-box"><textarea required="required" id="desc" name="desc" id="" cols="30" rows="10" placeholder="Description"></textarea><input required="required" id="mail" type="email" placeholder="E-Mail"><button id="send">send feedback</button><button id="cancel">cancel</button><span>powered by <a href="http://duotones.ch" target="_blank">duotones</a></span></div></div><div id="'+appname+'-feedback" class="visible">send feedback</div>');

  $('#'+ appname +'-feedback').on('click', function(){
    $('#'+ appname +'-bg, #'+ appname +'-box').addClass('active');
    $('#'+ appname +'-feedback').removeClass('visible');
  });

  Trello.authorize({
    interactive: true,
    type: "popup",
    expiration: "never",
    name: "Feedback",
    persist: "true",
    success: function() { onAuthorizeSuccessful(); },
    error: function() { onFailedAuthorization(); },
    scope: { read: true, write: true},
  });

  function onAuthorizeSuccessful() {
      var token = Trello.token(),
          today = new Date(),
          thisUrl = window.location.href;

      $('#'+appname+'-box #send').click(function(){
        var name = 'Frontend Feedback',
            mail = $('#'+ appname +'-box #mail').val(),
            desc = $('#'+ appname +'-box #desc').val();

        if(name.length > 0 && desc.length > 0) {

          Trello.post("/cards", { name: name, desc: " \n**Feedback:** "+ desc +" \n\n--- \n\n **Reporter:** ["+mail+"](mailto:"+mail+") \n **Browser name:** ```"+browserName+"``` \n **Major version:** ```"+majorVersion+"``` \n **Window Size (H×W):** ```" + screenHeight +" × "+ screenWidth +"px``` \n\n--- \n\n **Full version:** ```"+fullVersion+"``` \n **navigator.appName:** ```"+navigator.appName+"``` \n\n`"+navigator.userAgent+"`", idList: ""+idList+"", urlSource: thisUrl
          });

          $('#'+ appname +'-bg, #'+ appname +'-box').removeClass('active');
          $('#'+ appname +'-box #mail').val(''),
          $('#'+ appname +'-box #desc').val('');
          $('#'+ appname +'-feedback').addClass('visible');

        } else {
          if (name.length < 1){
            $('input').addClass('error');
          }
          if (desc.length < 1){
            $('textarea').addClass('error');
          }
        }
      });
  }

  $('#'+ appname +'-box #cancel').on('click', function(){
    $('#'+ appname +'-bg, #'+ appname +'-box').removeClass('active');
    $('#'+ appname +' #mail').val(''),
    $('#'+ appname +' #desc').val('');
    $('#'+ appname +'-feedback').addClass('visible');
  });

  function onFailedAuthorization() {
      console.log("Authorization failed.");
  }
};