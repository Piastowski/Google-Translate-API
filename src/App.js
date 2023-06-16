import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [toLang, setToLang] = useState('');
  const [fromLang, setFromLang] = useState('');
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');

  useEffect(() => {
    const plEn = document.getElementById('plEn');
    const enPl = document.getElementById('enPl');
    const plDe = document.getElementById('plDe');
    const dePl = document.getElementById('dePl');
    const plEs = document.getElementById('plEs');
    const esPl = document.getElementById('esPl');

    plEn.addEventListener('click', () => {
      setToLang('en');
      setFromLang('pl');
    });

    enPl.addEventListener('click', () => {
      setToLang('pl');
      setFromLang('en');
    });

    plDe.addEventListener('click', () => {
      setToLang('de');
      setFromLang('pl');
    });

    dePl.addEventListener('click', () => {
      setToLang('pl');
      setFromLang('de');
    });

    plEs.addEventListener('click', () => {
      setToLang('es');
      setFromLang('pl');
    });

    esPl.addEventListener('click', () => {
      setToLang('pl');
      setFromLang('es');
    });
  }, []);

  useEffect(() => {
    const fetchTranslation = async () => {
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

      try {
        const response = await axios.request(options);
        setTranslation(response.data.data.translations[0].translatedText);
      } catch (error) {
        console.error(error);
      }
    };

    if (text && toLang && fromLang) {
      fetchTranslation();
    }
  }, [text, toLang, fromLang]);

  return (
    <main>
      <header>
        <section id='plEn'>Polski na Angielski</section>
        <section id='enPl'>Angielski na Polski</section>
        <section id='plDe'>Polski na Niemiecki</section>
        <section id='dePl'>Niemiecki na Polski</section>
        <section id='plEs'>Polski na Hiszpański</section>
        <section id='esPl'>Hiszpański na Polski</section>
      </header>
      <section><h1>Wpisz frazę do przetłumaczenia:</h1></section>
      <section>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <div id='translation'>{translation}</div>
      </section>
    </main>
  );
}

export default App;
