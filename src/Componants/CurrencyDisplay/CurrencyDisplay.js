import React, { useEffect, useState } from 'react';
import './CurrencyDisplay.css';

function CurrencyDisplay({ baseCur, toCur, amount, rates }) {
const [conversion, setConversion] = useState('')



  const convert = () => {
    const total = amount * rates[toCur]
    setConversion(Math.trunc(total))
  }

  useEffect(() => {
    convert()
  }, [baseCur, toCur, amount])

  return (
    <section className="CurrencyDisplay">
      <h3>Your:{amount} {baseCur}</h3>
      <h3>Is Worth {conversion} of {toCur} </h3>
    </section>
  );
}

export default CurrencyDisplay;
