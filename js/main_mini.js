var $=function(e){return document.getElementById(e)};var App={getDefaultSiteKey:function(){if(typeof chrome==="undefined"||!chrome.tabs){return}var e=this;chrome.tabs.getSelected(null,function(t){if(!t.url){return}var n=t.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];var r=window.localStorage.getItem(n);var i=window.localStorage.getItem(n+":length");if(!r){var s=n.split(".");var o=/aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx/;for(var u=s.length-1;u>=1;u=u-1){if(s[u].match(o)){r=s[u-1];break}}if(!r){if(s.length<=2){r=s[0]}else{r=s[1]}}}if(!i){i=20}e.domain=n;e.sitekey=r;e.output_length=i;$("site_key").value=r;$("output_length").value=i;if($("master_key").value){onSubmitSiteKey(true)}})},onSubmitSiteKey:function(e){var t=$("site_key").value;var n=$("master_key").value;var r=$("output_length").value;var i=Crypto.util.bytesToBase64(Crypto.HMAC(Crypto.MD5,t,n,{asBytes:true}));this.hmac=i.replace(/=+$/,"").replace(/\+|\//g,"");var s=this.hmac.substring(0,r);$("output_key").value=s;agent=navigator.userAgent;if(!!agent.match(/iPhone/i)){$("output_key").readOnly=false}else{if(e){$("output_key").focus();$("output_key").select()}}if(typeof chrome!=="undefined"&&chrome.tabs){chrome.tabs.executeScript(null,{code:'var ae=document.activeElement;if(ae.tagName && ae.tagName.toLowerCase()=="input" && ae.type && ae.type.toLowerCase()=="password"){ae.value="'+s+'";} else if(document.forms){for(var f=0;f<document.forms.length;++f){var form=document.forms[f];var pwdInput=null;for(var i=0;i<form.length;++i){if(form[i].type=="password"){pwdInput=form[i];break;}}if(pwdInput){pwdInput.value="'+s+'";break;}}}'})}if(t&&t!=this.sitekey){window.localStorage.setItem(this.domain,t)}if(r&&r!=this.output_length){window.localStorage.setItem(this.domain+":length",r)}var o=1;if(n.search(/\d/)>=0){o+=10}if(n.search(/[A-Z]/)>=0){o+=26}if(n.search(/[a-z]/)>=0){o+=26}if(!n.match(/[A-Za-z0-9]/)){o+=10}var u=Math.log(o)*n.length/Math.log(2);if(u<40){console.log("show");console.log($("warning"));$("warning").style.visibility="visible"}else{console.log("hide");$("warning").style.visibility="hidden"}},setFocus:function(){if($("master_key").value){$("site_key").focus()}else{$("master_key").focus()}},onLengthChange:function(){if(this.hmac){this.onSubmitSiteKey(false)}},loadLikeButton:function(){},onPageLinkClick:function(){chrome.tabs.create({url:"https://www.facebook.com/pages/One-Password/243101302381935"},null)}};document.addEventListener("DOMContentLoaded",function(){App.getDefaultSiteKey();App.setFocus();App.loadLikeButton();f=document.forms[0];f.addEventListener("submit",function(e){App.onSubmitSiteKey(true);e.preventDefault()});$("output_length").addEventListener("click",function(e){App.onLengthChange()});$("page_link").addEventListener("click",function(e){App.onPageLinkClick()})})