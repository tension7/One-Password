var $=function(d){return document.getElementById(d)},App={getDefaultSiteKey:function(){if(chrome&&chrome.tabs){var d=this;chrome.tabs.getSelected(null,function(b){if(b.url){var b=b.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1],a=window.localStorage.getItem(b),c=window.localStorage.getItem(b+":length");if(!a)var a=b.split("."),e=/com|edu|gov|net|org|info/,a=a.length<=2||a[1].match(e)?a[0]:a[1];c||(c=20);d.domain=b;d.sitekey=a;d.output_length=c;$("site_key").value=a;$("output_length").value=
c;$("master_key").value&&onSubmitSiteKey(!0)}})}},onSubmitSiteKey:function(d){var b=$("site_key").value,a=$("master_key").value,c=$("output_length").value;this.hmac=Crypto.util.bytesToBase64(Crypto.HMAC(Crypto.MD5,b,a,{asBytes:!0})).replace(/=+$/,"").replace(/\+|\//g,"");a=this.hmac.substring(0,c);$("output_key").value=a;agent=navigator.userAgent;agent.match(/iPhone/i)?$("output_key").readOnly=!1:d&&($("output_key").focus(),$("output_key").select());chrome&&chrome.tabs&&chrome.tabs.executeScript(null,
{code:'if(document.forms){for(var f=0;f<document.forms.length;++f){var form=document.forms[f];var pwdInput=null;for(var i=0;i<form.length;++i){if(form[i].type=="password"){pwdInput=form[i];break;}}if(pwdInput){pwdInput.value="'+a+'";break;}}}'});b&&b!=this.sitekey&&window.localStorage.setItem(this.domain,b);c&&c!=this.output_length&&window.localStorage.setItem(this.domain+":length",c)},setFocus:function(){$("master_key").value?$("site_key").focus():$("master_key").focus()},onLengthChange:function(){if(this.hmac)this.onSubmitSiteKey(!1)},
loadLikeButton:function(){$("like_button").innerHTML='<iframe src="http://www.facebook.com/plugins/like.php?app_id=248233821858017&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FOne-Password%2F243101302381935&amp;send=false&amp;layout=button_count&amp;width=50&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:21px;" allowTransparency="true"></iframe>'}};
