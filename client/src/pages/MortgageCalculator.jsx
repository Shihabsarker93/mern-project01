import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateMortgage = () => {
    setError('');
    setLoading(true);

    if (!loanAmount || !interestRate || !loanTerm || !downPayment) {
      setError('Please fill out all fields.');
      setLoading(false);
      return;
    }

    const principal = loanAmount - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    const payment = (principal * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayments));

    if (isFinite(payment)) {
      setMonthlyPayment(payment.toFixed(2));
    } else {
      setError('An error occurred during calculation. Please check your inputs.');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 py-16">
      <div className="max-w-lg w-full mx-auto p-6 rounded-xl shadow-xl bg-slate-800 text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center text-amber-400">Mortgage Calculator</h2>

        <div className="mb-4">
          <label className="block mb-1 text-slate-300 font-medium">Loan Amount:</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800"
            placeholder="Enter loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-slate-300 font-medium">Interest Rate (%):</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800"
            placeholder="Enter interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-slate-300 font-medium">Loan Term (years):</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800"
            placeholder="Enter loan term in years"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-slate-300 font-medium">Down Payment:</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800"
            placeholder="Enter down payment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-amber-400 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-500 transition duration-300 mt-3"
          onClick={calculateMortgage}
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {monthlyPayment && !error && (
          <h3 className="text-xl font-semibold mt-6 text-center text-amber-400">
            Estimated Monthly Payment: {monthlyPayment} ৳/$
          </h3>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;

