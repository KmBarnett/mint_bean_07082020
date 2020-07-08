import React, { useState, useEffect } from 'react';
import CurrencyForm from './../CurrencyForm/CurrencyForm.js'
import CurrencyDisplay from './../CurrencyDisplay/CurrencyDisplay.js'
import './App.css';

function App() {
  const [submission, setSubmission] = useState()
  const [rates, setRates] = useState({})

  const submit = (submission) => {
    setSubmission(submission)
  }

  const fetchRates = async () => {
      const url = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_CURRENCY_API_KEY}`
      try {
        const res = await fetch(url)
        const data = await res.json()

        setRates(await data.rates)
      } catch (e) {
        console.log(e);
      }
  }

  useEffect(() => {
    fetchRates()
  },[])

  return (
    <main className="App">
      <header className="App-header">
        <h1>Whats My Cash Worth?</h1>
      </header>
      <CurrencyForm setSubmission={submit} />
      {submission && <CurrencyDisplay {...submission} rates={rates} />}
    </main>
  );
}

export default App;
