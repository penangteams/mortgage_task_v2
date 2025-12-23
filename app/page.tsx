"use client";
import React, { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import { calculateEMI } from "@/utils/emi";
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const MortgageCalculatorPage = () => {
  // Mortgage inputs
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [income, setIncome] = useState("");

  // API state
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
        console.log("DATA", data)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      });
  }, []);

  // EMI calculations
  const principal = Number(price) - Number(downPayment);
  const rate = Number(interestRate);
  const years = Number(tenure);
  const monthlyIncome = Number(income);
  const canCalculate = principal > 0 && rate > 0 && years > 0;
  const { emi, totalInterest } = canCalculate
    ? calculateEMI(principal, rate, years)
    : { emi: 0, totalInterest: 0 };

  // Loan eligibility
  let loanEligibilityMessage = "";
  if (canCalculate) {
    loanEligibilityMessage = emi <= monthlyIncome * 0.5
      ? "You are eligible for this loan."
      : "Your income might not be sufficient for this EMI.";
  }

  return (
    <>
     <div>
      {/* Top Menu */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link href="/contacts">
          <button   className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 
focus:outline-none focus:ring-2 focus:ring-green-500">Go to Contacts</button>
        </Link>
      </header>

      {/* React Hot Toast container */}

    </div>
    <div className="min-h-screen flex items-start justify-center bg-green-50 py-10 px-4">
      {/* Side-by-side container */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">

        {/* Left: API JSON */}
        <div className="flex-1 bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold text-green-700 mb-4">API Response</h2>
          {loading ? (
            <p className="text-gray-700">Loading...</p>
          ) : productData ? (
            <pre className="bg-green-50 p-4 rounded border border-green-200 overflow-auto text-sm whitespace-pre-wrap break-words">
              {JSON.stringify(productData, null, 2)}
            </pre>
          ) : (
            <p className="text-red-500">Failed to load API data.</p>
          )}
        </div>

        {/* Right: Mortgage Calculator */}
        <div className="flex-1 bg-white p-6 rounded shadow-lg">
          <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">Mortgage Calculator</h1>

          <InputField
            label="Property Price"
            value={price ? `$${price}` : ""}
            onChange={(e) => setPrice(e.target.value.replace(/\$/g, ""))}
          />
          <InputField
            label="Down Payment"
            value={downPayment ? `$${downPayment}` : ""}
            onChange={(e) => setDownPayment(e.target.value.replace(/\$/g, ""))}
          />
          <InputField
            label="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          <InputField
            label="Loan Tenure (Years)"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
          <InputField
            label="Monthly Income"
            value={income ? `$${income}` : ""}
            onChange={(e) => setIncome(e.target.value.replace(/\$/g, ""))}
          />

          {canCalculate && (
            <div className="mt-6 p-4 bg-green-100 rounded">
              <p className="text-green-800 font-semibold">
                Monthly EMI: <span className="font-normal">{formatCurrency(emi)}</span>
              </p>
              <p className="text-green-800 font-semibold">
                Total Interest: <span className="font-normal">{formatCurrency(totalInterest)}</span>
              </p>
              <p className="text-green-900 font-bold mt-2">{loanEligibilityMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    <Toaster/>
    </>
  );
};

export default MortgageCalculatorPage;
