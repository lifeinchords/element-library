// Adapted from Make Parallels:
// https://github.com/parallelsio/core-modules/blob/3f42c79fced7a52258a982f1a9d78ccf4f422eea/meteor-app/lib/utilities.js

// Usually, we'd just use jQuery's .position method.
// In situations where the element is display:none, we can use the transform 
// property, if it's set, to get the position 
function getTransformedPosition(element){
  var cssTransform = element.style["transform"] || element.style["webkitTransform"];
  var pattern = /[,();]|(px)|(em)|(rem)|(translate)|(matrix)|(3d)/gi;

  // slice + dice the string with a regexp to remove everything except
  // for number values. Split the string into an array.
  var array = _.words(cssTransform.replace(pattern, ''));

  return { 
    top: array[0],
    left: array[1]
  };
};