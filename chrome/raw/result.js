
/**
 * Convert the current url containing get vars into an object
 *
 *
 * For example, this url:
 *   http://google.com/?query=kittens&format=pictures
 * would convert into this object:
 *   {'query':'kittens','format':'pictures'}
 *
 */
function urlToObj(url) {

  // Parse the url
  var urlObj = document.createElement('a');
  urlObj.href = url;
  var urlVarsString = urlObj.search;

  // Snip off the leading '?'
  urlVarsString = urlVarsString.substring(1);

  // Create an array of 'key=value'
  var urlArgStrings = urlVarsString.split('&');

  // Create an object to populate with these key/value pairs
  var obj = {};

  // Loop through the key/value strings
  urlArgStrings.forEach( function(keyval) {

    // Split them
    var singleArgString = keyval.split('=');

    // Use them to create object properties
    obj[singleArgString[0]] = singleArgString[1];

  });

  // Result!
  return obj;

}

// Dig the replacement data out of the url
obj = urlToObj(document.location);

// Turn the object into json
jsonObject = JSON.stringify(obj);

// #todo Save somewhere!

// Print the output
setTimeout(function(){
  document.getElementById('message').innerHTML = "Saved: <br />" + jsonObject;
}, 1000);
