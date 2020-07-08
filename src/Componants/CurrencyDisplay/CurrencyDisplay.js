import React, { useEffect, useState } from 'react';
import './CurrencyDisplay.css';

function CurrencyDisplay({ baseCur, toCur, amount, setSubmitted }) {
const [conversion, setConversion] = useState()
  const fetchConversion = async () => {
    if (baseCur && toCur && amount) {
      const url = `https://openexchangerates.org/api/convert/${amount}/${baseCur}/${toCur}?app_id=${process.env.REACT_APP_CURRENCY_API_KEY}`
      try {
        const res = await fetch(url)
        const data = await res.json()

        setConversion(await data.response)
      } catch (e) {

      } finally {

      }
    }
  }

  const handleClick = () => {
    setSubmitted(false)
  }

  useEffect(() => {
    fetchConversion()
  },[])

  return (
    <section className="CurrencyDisplay">
      <button type='button' onClick={handleClick} name='submit'>X</button>
      <h3>Your:{amount} {baseCur}</h3>
      <h3>Is Worth {conversion} of {toCur} </h3>
    </section>
  );
}

export default CurrencyDisplay;
