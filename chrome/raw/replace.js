/**
 *
 * 1. Determine current page url
 * 2. Fetch replacements
 * 3. Run replacements
 *
 */

/**
 * Fetch replacements
 *
 */
// #todo Load from somewhere!
var replacements = [
  {
    'url'     : 'http://www.bbc.co.uk/news/world-europe-31072321',
    'old_text': 'Greek Prime Minister Alexis Tsipras',
    'new_text': 'Greek Prime Minister Alexis Lilliputia'
  },
  {
     'url'     : 'http://www.bbc.co.uk/news/world-europe-31072321',
     'old_text': 'German Chancellor Angela Merkel',
     'new_text': 'German Chancellor Angela Schmerkel'
  }
];

/**
 * Replacement function
 * http://stackoverflow.com/questions/10114212/chrome-extension-to-replace-text-dom-nodes-doesnt
 *
 */
function replaceText(old_text, new_text) {

  // Load all nodes
  var nodes = document.getElementsByTagName("*");

  // Loop through nodes
  for (var i = 0; i < nodes.length; i++) {

    // Find child nodes
    var subNodes = nodes[i].childNodes;

    // Loop through child nodes
    for (var j = 0; j < subNodes.length; j++) {

      var node = subNodes[j];

      // Check that child node is text node and has data
      if (node.nodeType === 3 && node.data) {

        // Set up a regex object for the text to look for
        var re = new RegExp(old_text, 'g');

        // Check that the node contains the text to replace
        if (node.data.match(re)) {

          // If there's a match then replace
          node.data = node.data.replace(re, new_text);

          // And log to the console
          console.log('Match found for "' + old_text + '"');

        }
      }
    }
  }
}

/**
 * Run replacements!
 *
 */
replacements.forEach( function(arrayItem) {
  replaceText(arrayItem.old_text, arrayItem.new_text);
});
