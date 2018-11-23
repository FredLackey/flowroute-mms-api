const _ = require('cleaner-node');
const request = require('request');
const validate = require('./validate');

const URL = 'https://api.flowroute.com/v2.1/messages';
const HEADERS = {
  'Content-Type': 'application/vnd.api+json',
  Accept: 'application/vnd.api+json'
};

const createData = (to, from, body, mediaLinks, callbackUrl) => {
  return {
    data: {
      type: 'message',
      attributes: {
        to: to.trim(),
        from: from.trim(),
        body: body.trim(),
        is_mms: "true",
        dlr_callback: _.strings.trimToUndefined(callbackUrl),
        media_urls: mediaLinks
      }
    }
  }
}

const send = (to, from, body, mediaLinks, callbackUrl, accessKey, secretKey, done) => {
  const options = {
    url: URL,
    method: 'POST',
    auth: {
      username: accessKey.trim(),
      password: secretKey.trim()
    },
    headers: HEADERS,
    body: JSON.stringify(createData(to, from, body, mediaLinks, callbackUrl))
  };
  request(options, (err, response, body) => {
    if (err) { return done(err); }
    if (Number(response.statusCode) === 202) {
      if (!_.strings.isValid(body)) {
        return done('Details not received');
      }
      try {
        body = JSON.parse(body);
      } catch (ex) {
        return done('Cannot parse body.');
      }
      if (!body || !body.data || !body.data.id) {
        return done('Unknown provider response.');
      }
      return done(null, ({
        id: body.data.id
      }));
    }
    return done(resposne);
  })
}

const withCallback = (to, from, body, mediaLinks, callbackUrl, accessKey, secretKey, done) => {
  const err = validate.to(to) ||
    validate.from(from) ||
    validate.body(body) ||
    validate.links(mediaLinks) ||
    validate.callbackUrl(callbackUrl) ||
    validate.accessKey(accessKey) ||
    validate.secretKey(secretKey);
  if (err) { return done(err); }

  send(to, from, body, mediaLinks, callbackUrl, accessKey, secretKey, done);
}

const withoutCallback = (to, from, body, mediaLinks, accessKey, secretKey, done) => {

  const err = validate.to(to) ||
    validate.from(from) ||
    validate.body(body) ||
    validate.links(mediaLinks) ||
    validate.accessKey(accessKey) ||
    validate.secretKey(secretKey);
  if (err) { return done(err); }

  send(to, from, body, mediaLinks, undefined, accessKey, secretKey, done);
};

module.exports = {
  withCallback,
  withoutCallback
}