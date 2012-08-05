mkdir onepwd
cp popup.html CHANGELOG LICENSE manifest.json icon.png onepwd/
mkdir onepwd/js
cp js/2.2.0-crypto-md5.js js/2.2.0-crypto-min.js js/2.2.0-hmac-min.js js/main_mini.js onepwd/js
zip -r onepwd.zip onepwd
rm -rf onepwd
