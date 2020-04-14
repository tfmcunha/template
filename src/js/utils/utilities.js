const str2json = function(str, notevil) {
  try {
    if (notevil) {
      return JSON.parse(
        str
          // wrap keys without quote with valid double quote
          .replace(/([\$\w]+)\s*:/g, function(_, $1) {
            return '"' + $1 + '":';
          })
          // replacing single quote wrapped ones to double quote
          .replace(/'([^']+)'/g, function(_, $1) {
            return '"' + $1 + '"';
          })
      );
    } else {
      return new Function('', 'var json = ' + str + '; return JSON.parse(JSON.stringify(json));')();
    }
  } catch (e) {
    return false;
  }
};

const getClosest = function(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get closest match
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }

  return null;
};

const getSiblings = function(el) {
  // Setup siblings array and get the first sibling
  var siblings = [];
  var sibling = el.parentNode.firstChild;

  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export { getClosest, getSiblings, str2json };
