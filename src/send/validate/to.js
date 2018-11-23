const _ = require('cleaner-node');

const validateTo = value => {
  if (typeof value === undefined) { return 'To DID required but not supplied.'; }
  if (typeof value !== 'string') { return 'To DID must be a string.'; }
  if (!_.strings.isDigits(value)) { return 'To DID must contain all digits.'; }
  if (value.length < 11) { return 'To DID is too short (must be 11 digits).'; }
  if (value.length > 11) { return 'To DID is too long (must be 11 digits).'; }
  if (value.split('')[0] !== '1') { return 'To DID is invalid.'; }
  return undefined;
}

module.exports = validateTo;