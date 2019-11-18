import React from 'react';
import { useState, useEffect } from 'react';
import * as mozjpeg from 'mozjpeg-js';
import logo from './logo.svg';

import './App.css';

const App: React.FC = () => {
  const [files, setInput] = useState();

  useEffect(() => {
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

    if (!imageType.test(file.type))
    {
      alert("Please upload an image!");
      return;
    }

    reader.onload = (e: any) => {
      let img = document.getElementById("preview") as HTMLImageElement;
      img.src = e.target.result as string;
      const base64: string = img.src.substring(23);
      const buffer = Buffer.from(base64, 'base64');
      const out = mozjpeg.encode(buffer, { quality: 5 });
      let img2 = document.getElementById("preview2") as HTMLImageElement;
      const resultData = Buffer.from(out.data).toString('base64');
      img2.src = `data:image/jpeg;base64,${resultData}`;
      img.style.opacity = '1';
      img2.style.opacity = '1';
      console.log(img.src.length, img2.src.length, `${(100 - img2.src.length / img.src.length * 100).toFixed(1)}%`)
    };
    reader.readAsDataURL(file);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="file" id="input" multiple accept=".jpg, .jpeg" onChange={(e) =>setInput(e.target.files)} />
        <img id="preview" style={{ opacity: 0 }} width="50%" alt="preview"/>
        <img id="preview2" style={{ opacity: 0 }} width="50%" alt="preview2"/>
      </header>
    </div>
  );
}

export default App;
