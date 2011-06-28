var $ = function(id) {
  return document.getElementById(id);
}

var App = {

getDefaultSiteKey : function() {
  if (!chrome || !chrome.tabs) {
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
      var topLevelDomain = /com|edu|gov|net|org|info/;
      if (tokens.length <= 2 || tokens[1].match(topLevelDomain)) {
        sitekey = tokens[0];
      } else {
        sitekey = tokens[1];
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
  $('output_key').value=this.hmac.substring(0, len);

  agent = navigator.userAgent;
  if (!!agent.match(/iPhone/i)) {
    $('output_key').readOnly=false;
  } else {
    if (focus) {
      $('output_key').focus();
      $('output_key').select();
    }
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
}

} // end of app
