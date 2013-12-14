var $ = function(id) {
  return document.getElementById(id);
}

var App = {

getDefaultSiteKey : function() {
  if (typeof chrome === "undefined" || !chrome.tabs) {
    //not in extension mode
    return;
  }
  var x = this;
  chrome.tabs.getSelected(null, function(tab){
    if (!tab.url) {
      return;
    }
    var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
    var sitekey = window.localStorage.getItem(domain);
    var len = window.localStorage.getItem(domain + ":length");
    if (!sitekey) {
      var tokens = domain.split('.');
      var topLevelDomain = /aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx/;
      for (var i = tokens.length - 1; i >= 1; i = i - 1) {
        if (tokens[i].match(topLevelDomain)) {
          sitekey = tokens[i-1];
          break;
        }
      }
      if (!sitekey) {
        if (tokens.length <= 2) { sitekey = tokens[0]; }
        else { sitekey = tokens[1]; }
      }
    }
    if (!len) {
      len = 20;
    }
    x.domain = domain;
    x.sitekey = sitekey;
    x.output_length = len;
    $('site_key').value = sitekey;
    $('output_length').value = len;
    if ($('master_key').value) {
      onSubmitSiteKey(true);
    }
  });
},

onSubmitSiteKey : function(focus) {
  var site = $('site_key').value;
  var master = $('master_key').value;
  var len = $('output_length').value;
  var hmac = Crypto.util.bytesToBase64(Crypto.HMAC(Crypto.MD5, site, master, {asBytes:true}));
  this.hmac = hmac.replace(/=+$/,'').replace(/\+|\//g,'');
  var key = this.hmac.substring(0, len);
  $('output_key').value = key;
  agent = navigator.userAgent;
  if (!!agent.match(/iPhone/i)) {
    $('output_key').readOnly=false;
  } else {
    if (focus) {
      $('output_key').focus();
      $('output_key').select();
    }
  }

  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.executeScript(null, {
      code:'var ae=document.activeElement;if(ae.tagName && ae.tagName.toLowerCase()=="input" && ae.type && ae.type.toLowerCase()=="password"){ae.value="'+key+'";} else if(document.forms){for(var f=0;f<document.forms.length;++f){var form=document.forms[f];var pwdInput=null;for(var i=0;i<form.length;++i){if(form[i].type=="password"){pwdInput=form[i];break;}}if(pwdInput){pwdInput.value="'+key+'";break;}}}'
    });
  }

  if (site && site != this.sitekey) {
    window.localStorage.setItem(this.domain, site);
  }
  if (len && len != this.output_length) {
    window.localStorage.setItem(this.domain+":length", len);
  }
},

setFocus : function() {
  if ($('master_key').value) {
    $('site_key').focus();
  } else {
    $('master_key').focus();
  }
},

onLengthChange : function() {
  if (this.hmac) {
    this.onSubmitSiteKey(false);
  }
},

loadLikeButton : function() {
},

onPageLinkClick : function() {
  chrome.tabs.create({'url': 'https://www.facebook.com/pages/One-Password/243101302381935'}, null);
}

} // end of app

document.addEventListener('DOMContentLoaded', function () {
  App.getDefaultSiteKey();
  App.setFocus();
  App.loadLikeButton();
  f = document.forms[0];
  f.addEventListener('submit', function(evt) {
      App.onSubmitSiteKey(true);
      evt.preventDefault();
    });
  $('output_length').addEventListener('click', function(evt) {
      App.onLengthChange();
    });
  $('page_link').addEventListener('click', function(evt) {
      App.onPageLinkClick();
    });
})

