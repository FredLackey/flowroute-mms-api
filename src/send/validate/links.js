const _ = require('cleaner-node');

const toUrl = value => {
  try {
    const url = new URL(value);
    return url;
  } catch (ex) {
    return undefined;
  }
}

const isValidUrl = value => {
  const url = toUrl(value);
  return url &&
    _.strings.isValid(url.protocol) &&
    (['http:', 'https:'].indexOf(url.protocol.toLowerCase()) >= 0) &&
    _.strings.isValid(url.hostname) &&
    _.strings.isValid(url.pathname);
}

const validateLinks = value => {
  if (typeof value === 'undefined') { return 'Media URLs requested but not supplied.'; }
  if (typeof value !== 'object' || !(value instanceof Array)) { return 'Media URLs URL is an invalid data type.'; }
  if (value.length === 0) { return 'An empty list of media URLs was supplied.'; }
  if (value.length !== value.filter(x => (x && isValidUrl(x))).length) { return 'Invalid values were found in the list of media URLs.'; }
  return undefined;
};

module.exports = validateLinks;