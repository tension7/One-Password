var $ = function(id) {
  return document.getElementById(id);
}

var getDefaultSiteKey = function() {
  chrome.tabs.getSelected(null, function(tab){
    reg=/:\/\/\w+\.(\w+)/;
    res=reg.exec(tab.url);
    if (res.length >= 2) {
      $('site_key').value=res[1];
      if ($('master_key').value) {
        onSubmitSiteKey();
      }
    }
  });
}

var onSubmitSiteKey = function() {
  var site = $('site_key').value;
  var master = $('master_key').value;
  console.log(site);
  console.log(master);
  var hmac = Crypto.util.bytesToBase64(Crypto.HMAC(Crypto.MD5, site, master, {asBytes:true}));
  hmac = hmac.replace(/=+$/,'').replace(/\+|\//g,'').substring(0, 20);
  $('output_key').value=hmac;
  $('output_key').focus();
  $('output_key').select();
}

var setFocus = function() {
  if ($('master_key').value) {
    $('site_key').focus();
  } else {
    $('master_key').focus();
  }
}
