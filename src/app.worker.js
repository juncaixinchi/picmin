const mozjpeg = require('mozjpeg-js');

self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
  console.log(e);
  const { buffer, quality } = e.data;
  console.log(buffer, quality);
  const out = mozjpeg.encode(Buffer.from(buffer), { quality });
  const result = out.data.buffer;
  console.log(result);
  self.postMessage(result, [result]); // eslint-disable-line no-restricted-globals
  self.close(); // eslint-disable-line no-restricted-globals
}, false)
