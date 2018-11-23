const _ = require('cleaner-node');

const validateAccessKey = value => {
  if (typeof value === undefined) { return 'Access Key required but not supplied.'; }
  if (typeof value !== 'string') { return 'Access Key must be a string.'; }
  if (!_.strings.isDigits(value)) { return 'Access Key must contain all digits.'; }
  return undefined;
}

module.exports = validateAccessKey;