import React, { useState, useEffect } from 'react';
import CurrencyForm from './../CurrencyForm/CurrencyForm.js'
import CurrencyDisplay from './../CurrencyDisplay/CurrencyDisplay.js'
import './App.css';

function App() {
  const [submited, setSubmitted] = useState(false)
  const [submission, setSubmission] = useState({})

  const submit = (submission) => {
    setSubmitted(true)
    setSubmission(submission)
  }

  return (
    <section className="App">
      <header className="App-header">
        <h1>Trip Currency Plan</h1>
      </header>
      <CurrencyForm setSubmission={submit} />
      {submited && <CurrencyDisplay {...submission} setSubmitted={setSubmitted} />}
    </section>
  );
}

export default App;
