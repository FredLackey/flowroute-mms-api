const _ = require('cleaner-node');

const toUrl = value => {
  try {
    const url = new URL(value);
    return url;
  } catch (ex) {
    return undefined;
  }
}

const validateCallbackUrl = value => {
  if (typeof value === 'undefined') { return 'Callback requested but not URL supplied.'; }
  if (typeof value !== 'string') { return 'Callback URL is an invalid data type.'; }
  if (value.trim().length === 0) { return undefined; }
  const url = toUrl(value);
  if (!url || !url.protocol || !url.hostname || !url.pathname) { return 'Callback URL is invalid.'; }
  return undefined;
};

module.exports = validateCallbackUrl;