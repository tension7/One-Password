var $=function(d){return document.getElementById(d)},App={getDefaultSiteKey:function(){if(chrome&&chrome.tabs){var d=this;chrome.tabs.getSelected(null,function(a){if(a.url){var a=a.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1],b=window.localStorage.getItem(a),c=window.localStorage.getItem(a+":length");if(!b){for(var e=a.split("."),g=/aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx/,f=e.length-1;f>=1;f-=1)if(e[f].match(g)){b=e[f-1];break}b||
(b=e.length<=2?e[0]:e[1])}c||(c=20);d.domain=a;d.sitekey=b;d.output_length=c;$("site_key").value=b;$("output_length").value=c;$("master_key").value&&onSubmitSiteKey(!0)}})}},onSubmitSiteKey:function(d){var a=$("site_key").value,b=$("master_key").value,c=$("output_length").value;this.hmac=Crypto.util.bytesToBase64(Crypto.HMAC(Crypto.MD5,a,b,{asBytes:!0})).replace(/=+$/,"").replace(/\+|\//g,"");b=this.hmac.substring(0,c);$("output_key").value=b;agent=navigator.userAgent;agent.match(/iPhone/i)?$("output_key").readOnly=
!1:d&&($("output_key").focus(),$("output_key").select());chrome&&chrome.tabs&&chrome.tabs.executeScript(null,{code:'if(document.forms){for(var f=0;f<document.forms.length;++f){var form=document.forms[f];var pwdInput=null;for(var i=0;i<form.length;++i){if(form[i].type=="password"){pwdInput=form[i];break;}}if(pwdInput){pwdInput.value="'+b+'";break;}}}'});a&&a!=this.sitekey&&window.localStorage.setItem(this.domain,a);c&&c!=this.output_length&&window.localStorage.setItem(this.domain+":length",c)},setFocus:function(){$("master_key").value?
$("site_key").focus():$("master_key").focus()},onLengthChange:function(){if(this.hmac)this.onSubmitSiteKey(!1)},loadLikeButton:function(){$("like_button").innerHTML='<iframe src="http://www.facebook.com/plugins/like.php?app_id=248233821858017&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FOne-Password%2F243101302381935&amp;send=false&amp;layout=button_count&amp;width=50&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:21px;" allowTransparency="true"></iframe>'}};
