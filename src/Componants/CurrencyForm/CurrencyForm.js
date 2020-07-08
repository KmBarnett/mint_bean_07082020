import React, {useEffect, useState} from 'react';

import './CurrencyForm.css';
import { curCodes } from './../../largeData.js'

function CurrencyForm({ setSubmission }) {
  const [countries, setCountries] = useState([])
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [baseCurrency, setBaseCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')

  const fetchCountries = async () => {
    try {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      const data = await res.json()
      let countries = await data.map(item => {
        let formated = {
          name: item.name,
          currencies: item.currencies,
          code: item.alpha3Code
        }
        return formated
      })
      setCountries(countries)
    } catch (e) {
      console.log(e);
    }
  }

  const resetState = () => {
    setCountries([])
    setDestination('')
    setAmount('')
    setBaseCurrency('')
    setToCurrency('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (toCurrency && baseCurrency && amount) {
      setSubmission({
        toCur: toCurrency,
        baseCur: baseCurrency,
        amount
      })
      resetState()
    }
  }

  const validDestionation = () => {
    const destinations = countries.map(country => country.name)
    return destinations.includes(destination)
  }

  const createDestinationOptions = () => {
    return countries.map((country, i) => <option key={`country${i}`} value={country.name}/>)
  }

  const createBaseCurOptions = () => {
    return curCodes.map((cur, i) => <option key={`base${i}`} value={cur}/>)
  }
  const createToCurOptions = () => {
    if (destination) {
      const { currencies } = countries.find(country => country.name === destination)
      return currencies.map((cur, i) => {
        return <option key={`cur${i}`} value={cur.code}>{cur.code}</option>
      })
    }
  }

  useEffect(() => {
    fetchCountries()
  },[])

  useEffect(() => {

  },[destination])

  // useEffect(() => {
  //   console.log(countries);
  // },[countries])

  return (
    <form className="CurrencyForm">
      <label htmlFor="countries-input">Destination:</label>
      <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder='Destination' type='text' list="countries" name="countries" id="countries-input"/>
      <datalist id="countries">
        {createDestinationOptions()}
      </datalist>
      <label htmlFor="amount-input">Amount:</label>
      <input placeholder='0' value={amount} onChange={(e) => setAmount(e.target.value)} type="number" id="amount-input" name="Amount"/>
      <label htmlFor="currencies-input">From:</label>
      <input value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} placeholder='From' type='text' list="currencies" name="currencies" id="currencies-input"/>
      <datalist id="currencies">
        {createBaseCurOptions()}
      </datalist>
      <label htmlFor="exchangeCur">To:</label>
      {validDestionation() ?
        <select defaultValue='' value={toCurrency} onChange={e => setToCurrency(e.target.value)} name="exchangeCur" id="exchangeCur">
          <option disabled value=''>Select Currency</option>
          {createToCurOptions()}
        </select> :
        <select value='' disabled={true} name="exchangeCur" id="exchangeCur">
          <option value=''>Select Currency</option>
        </select>
      }
      <button type='button' onClick={e => handleSubmit(e)} name='submit'>Convert!</button>
    </form>
  );
}

export default CurrencyForm;
