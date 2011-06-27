var $ = function(id) {
  return document.getElementById(id);
}

var App = {

'getDefaultSiteKey' : function() {
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
    if (!sitekey) {
      var tokens = domain.split('.');
      var topLevelDomain = /com|edu|gov|net|org|info/;
      if (tokens.length <= 2 || tokens[1].match(topLevelDomain)) {
        sitekey = tokens[0];
      } else {
        sitekey = tokens[1];
      }
    }
    x.domain = domain;
    x.sitekey = sitekey;
    $('site_key').value = sitekey;
    if ($('master_key').value) {
      onSubmitSiteKey();
    }
  });
},

'onSubmitSiteKey' : function() {
  var site = $('site_key').value;
  var master = $('master_key').value;
  var hmac = Crypto.util.bytesToBase64(Crypto.HMAC(Crypto.MD5, site, master, {asBytes:true}));
  hmac = hmac.replace(/=+$/,'').replace(/\+|\//g,'').substring(0, 20);
  $('output_key').value=hmac;
  $('output_key').focus();
  $('output_key').select();
  if (site && site != this.sitekey) {
    window.localStorage.setItem(this.domain, site);
  }
},

setFocus : function() {
  if ($('master_key').value) {
    $('site_key').focus();
  } else {
    $('master_key').focus();
  }
}

} // end of app
