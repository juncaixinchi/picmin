import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';

import './App.css';

const App: React.FC = () => {
  const [files, setInput] = useState();
  const [quality, setQuality] = useState(75);

  const fire = () => {
    if (!files) return;
    let reader: FileReader;
    if (window.FileReader) {
      reader = new FileReader();
    } else {
      alert("Your device doesn't support uploading images.");
      return;
    }

    if (!files || files.length === 0) return;

    let file = files[0];
    let imageType = /^image\//g;

    if (!imageType.test(file.type)) {
      alert("Please upload an image!");
      return;
    }

    reader.onload = (e: any) => {
      const data: ArrayBuffer = e.target.result;
      const worker = new Worker('worker.bundle.js');

      // send Transferable Objects
      worker.postMessage({ quality, buffer: data }, [data]);

      const now = new Date().getTime()
      worker.onmessage = (ev) => {
        const img1Data = Buffer.from(data).toString('base64');
        const img2Data = Buffer.from(ev.data).toString('base64');
        let img = document.getElementById("preview") as HTMLImageElement;
        let img2 = document.getElementById("preview2") as HTMLImageElement;
        img.src = `data:image/jpeg;base64,${img1Data}`;
        img2.src = `data:image/jpeg;base64,${img2Data}`;
        img.style.opacity = '1';
        img2.style.opacity = '1';
        console.log(img.src.length, img2.src.length, `${(100 - img1Data.length / img2Data.length * 100).toFixed(1)}%`)

        // close worker
        worker.terminate();
      };
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ width: 600, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 200 }}>输出图像质量:</div>
          <div style={{ width: 100 }}>{`${quality}%`}</div>
          <input
            id="qualityInput"
            style={{ width: 200 }}
            type="range" max={100} min={0} value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
        </div>
        <input type="file" id="input" multiple accept=".jpg, .jpeg" onChange={(e) => setInput(e.target.files)} />
        <img id="preview" style={{ opacity: 0 }} width="50%" alt="preview" />
        <img id="preview2" style={{ opacity: 0 }} width="50%" alt="preview2" />
        <button onClick={() => fire()} >Fire</button>
      </header>
    </div>
  );
}

export default App;
