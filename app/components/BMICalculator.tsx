"use client";

import { useState } from "react";

export default function BMICalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBmi(null);
    setCategory(null);

    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    const heightVal = parseFloat(height);
    const weightVal = parseFloat(weight);

    if (isNaN(heightVal) || isNaN(weightVal) || heightVal <= 0 || weightVal <= 0) {
      setError("Please enter valid positive numbers.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/bmi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          height: heightVal,
          weight: weightVal,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to calculate BMI");
      }

      const data = await res.json();
      setBmi(data.bmi);
      setCategory(data.category);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <div className="text-center mb-8 mt-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
          BMI Check
        </h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">Instant Body Mass Index Calculator</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="height" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
            Height (meters)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <input
              type="number"
              id="height"
              step="0.01"
              placeholder="1.75"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 font-medium text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="weight" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
            Weight (kg)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <input
              type="number"
              id="weight"
              step="0.1"
              placeholder="65"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 font-medium text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center p-4 text-sm text-red-600 rounded-xl bg-red-50 border border-red-100 animate-pulse" role="alert">
            <svg className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-500/20 transform transition-all duration-200 hover:-translate-y-1 active:translate-y-0 ${
            loading
              ? "bg-slate-400 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-600/40 hover:from-blue-700 hover:to-indigo-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </span>
          ) : "Calculate BMI"}
        </button>
      </form>

      {bmi !== null && category && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative pt-1 mb-6">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                BMI Scale
              </span>
              <span className="text-xs font-bold text-slate-700">
                {bmi}
              </span>
            </div>
            <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-100 shadow-inner">
              <div style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ease-out ${
                 category === 'Underweight' ? 'bg-gradient-to-r from-yellow-300 to-yellow-500' :
                 category === 'Normal' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                 category === 'Overweight' ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                 'bg-gradient-to-r from-red-500 to-red-700'
              }`}></div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl text-center border transition-all duration-300 shadow-sm ${
             category === 'Underweight' ? 'bg-yellow-50/50 border-yellow-200' :
             category === 'Normal' ? 'bg-green-50/50 border-green-200' :
             category === 'Overweight' ? 'bg-orange-50/50 border-orange-200' :
             'bg-red-50/50 border-red-200'
          }`}>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">Result</p>
            <h2 className={`text-4xl font-black mb-1 ${
               category === 'Underweight' ? 'text-yellow-600' :
               category === 'Normal' ? 'text-green-600' :
               category === 'Overweight' ? 'text-orange-600' :
               'text-red-600'
            }`}>
              {category}
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Your BMI is <span className="text-slate-700 font-bold">{bmi}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
