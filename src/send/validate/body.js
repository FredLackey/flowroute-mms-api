const _ = require('cleaner-node');

const LIMIT_ASCII = 160;
const LIMIT_EXTENDED = 70;

function isASCII(str, extended) {
  return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
}

const validateBody = value => {
  if (typeof value === 'undefined') { return 'Body required but not supplied.'; }
  if (typeof value !== 'string') { return 'Body is an invalid data type.'; }
  if (value.trim().length === 0) { return undefined; }
  if (!isASCII(value.trim(), true)) { return 'Body contains invalid characters.'; }
  if (isASCII(value.trim(), true) && value.length > LIMIT_EXTENDED) { return `Body is too long (${LIMIT_EXTENDED} chars for extended characters.)`; }
  if (isASCII(value.trim(), false) && value.length > LIMIT_ASCII) { return `Body is too long (${LIMIT_ASCII} chars for basic characters.)`; }
  return undefined;
};

module.exports = validateBody