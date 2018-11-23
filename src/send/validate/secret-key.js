const _ = require('cleaner-node');

const validateSecretKey = value => {
  if (typeof value === undefined) { return 'Secret Key required but not supplied.'; }
  if (typeof value !== 'string') { return 'Secret Key must be a string.'; }
  if (!_.strings.isValid(value)) { return 'Secret Key is invalid.'; }
  return undefined;
}

module.exports = validateSecretKey;