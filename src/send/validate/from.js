const _ = require('cleaner-node');

const validateFrom = value => {
  if (typeof value === undefined) { return 'From DID required but not supplied.'; }
  if (typeof value !== 'string') { return 'From DID must be a string.'; }
  if (!_.strings.isDigits(value)) { return 'From DID must contain all digits.'; }
  if (value.length < 11) { return 'From DID is too short (must be 11 digits).'; }
  if (value.length > 11) { return 'From DID is too long (must be 11 digits).'; }
  if (value.split('')[0] !== '1') { return 'From DID is invalid.'; }
  return undefined;
}

module.exports = validateFrom;