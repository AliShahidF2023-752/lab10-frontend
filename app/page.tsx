import BMICalculator from "./components/BMICalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-8">
      <BMICalculator />

      <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <p className="text-sm font-semibold text-slate-700">
            Cloud Computing Lab
          </p>
        </div>
        <p className="mt-4 text-xs text-slate-500 font-medium leading-relaxed bg-white/30 p-3 rounded-xl border border-white/40">
          This application demonstrates a distributed architecture. <br/>
          The backend API is running on a separate deployed server machine.
        </p>
      </div>
    </main>
  );
}
