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

    const heightVal = parseFloat(height);
    const weightVal = parseFloat(weight);

    if (!height || !weight || isNaN(heightVal) || isNaN(weightVal) || heightVal <= 0 || weightVal <= 0) {
      setError("Please enter valid positive numbers for height and weight.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://shavon-lentando-noninformatively.ngrok-free.dev";
      const res = await fetch(`${apiUrl}/api/bmi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ height: heightVal, weight: weightVal }),
      });

      let data;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Unexpected response from server");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to calculate BMI");
      }

      setBmi(data.bmi);
      setCategory(data.category);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/50 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      <div className="text-center mb-8 mt-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
          BMI Check
        </h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">Instant Body Mass Index Calculator</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Height */}
        <div className="space-y-2">
          <label htmlFor="height" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
            Height (meters)
          </label>
          <input
            type="number"
            id="height"
            step="0.01"
            placeholder="1.75"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full pl-4 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 font-medium text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label htmlFor="weight" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            step="0.1"
            placeholder="65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full pl-4 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 font-medium text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Error */}
        {error && <div className="text-red-600 font-medium text-sm">{error}</div>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-lg shadow-xl transform transition-all duration-200 ${
            loading ? "bg-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          }`}
        >
          {loading ? "Calculating..." : "Calculate BMI"}
        </button>
      </form>

      {/* Result */}
      {bmi !== null && category && (
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-black">{category}</h2>
          <p className="text-slate-700 font-bold">Your BMI is {bmi}</p>
        </div>
      )}
    </div>
  );
}
