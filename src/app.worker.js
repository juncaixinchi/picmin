// use `browserify` to convert `src/app.worker.js` to `public/worker.bundle.js`
//
// ```bash
// browserify src/app.worker.js -o public/worker.bundle.js
// ```
//
// usgae:
// ```js
// const worker = new Worker('worker.bundle.js');
// const data: ArrayBuffer = someBuffer.buffer;
// const quality: number = 75;
// worker.postMessage({ quality, buffer: data }, [data]);
// worker.onmessage = (ev) => {
//   const result: ArrayBuffer = ev.data;
// }
// ```
/* eslint-disable no-restricted-globals */

const mozjpeg = require('mozjpeg-js');

self.addEventListener('message', e => {
  const { buffer, quality } = e.data;
  const out = mozjpeg.encode(Buffer.from(buffer), { quality });
  const result = out.data.buffer;
  self.postMessage(result, [result]);
  self.close();
}, false)
