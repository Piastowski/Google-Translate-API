import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { options } from './App';

function translateText(fromLang, toLang, text) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", text);
  encodedParams.append("target", toLang);
  encodedParams.append("source", fromLang);

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '35d3f331a6msh9051d3bd6c23133p12d66bjsn8eca8c6b9663',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams
  };

  return axios.request(options).then(function (response) {
    return response.data.data.translations[0].translatedText;
  }).catch(function (error) {
    console.error(error);
    return '';
  });
}

function AppWrapper() {
  const [toLang, setToLang] = useState('');
  const [fromLang, setFromLang] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    async function fetchTranslation() {
      if (toLang && fromLang) {
        const translatedText = await translateText(fromLang, toLang, text);
        setText(translatedText);
      }
    }
    fetchTranslation();
  }, [toLang, fromLang]);

  return <App setToLang={setToLang} setFromLang={setFromLang} text={text} />;
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
