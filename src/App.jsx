import { useEffect, useState } from "react";
import "./App.css";
import { FaSync } from "react-icons/fa";
const host = "api.frankfurter.app";
function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("AUD");
  const [conveted, setConverted] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const rates = (amount/Number(conveted)).toFixed(2)
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Convert");
  }
  useEffect(function () {
    async function convertCurrency() {
      setIsLoading(true)
      const res = await fetch(
        `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const data = await res.json();
      setConverted(data.rates[to]);
      setIsLoading(false)
    }
    if(from === to) return setConverted(amount)
    convertCurrency()
  }, [from, to, amount]);

  return (
    <>
      <div className="app">
        <form onSubmit={handleSubmit} className="container">
          <h1 className="title">Currency Converter</h1>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            disabled={isLoading}
          />
          <div className="select-container">
            <div className="select-wrapper">
              <p>From</p>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="select"
                disabled={isLoading}
              >
                <option value="USD">USD</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
                <option value="EUR">EUR</option>
                <option value="ZAR">ZAR</option>
              </select>
            </div>
            <div className="icon">
              <FaSync />
            </div>
            <div className="select-wrapper">
              <p>To</p>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="select"
                disabled={isLoading}
              >
                <option value="USD">USD</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
                <option value="EUR">EUR</option>
                <option value="ZAR">ZAR</option>
              </select>
            </div>
          </div>
          <div className="amount">
            <h1>{conveted} {to}</h1>
          </div>
          <div className="rates">
            <span>1 {from}</span>
            <span>=</span>
            <span>{rates} {to}</span>
          </div>
          <div className="btn">
            <button type="submit">Convert</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
