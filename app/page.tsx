'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [crop, setCrop] = useState('');
  const [location, setLocation] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAdvice('');

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Try again.');
      }

      setAdvice(data.advice);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#cfebbd]">
      {/* HEADER */}
      
<header className="border-b border-[#1F3D2B]/10 bg-[#EAF3E4]">
  <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LOGO */}
    <div className="flex items-center gap-2">
      <Image
        src="/khetisaathi-logo.png"
        alt="KhetSaathi logo"
        width={85}
        height={65}
        className="object-contain"
      />

      <span className="font-bold text-[#1F3D2B] tracking-tight text-lg">
        KhetSaathi
      </span>
    </div>

    {/* NAVIGATION */}
    <nav className="hidden sm:flex items-center gap-6 text-sm font-large text-[#1F3D2B]/80">
      <a
        href="#advisor"
        className="text-[#0d0d0d] transition bg-[#cfebbd] hover:bg-[#c1f4a2] p-2 rounded-2xl"
      >
        Get Advice
      </a>

      <a
        href="#how-it-works"
        className="text-[#0d0d0d] transition bg-[#cfebbd] hover:bg-[#c1f4a2] p-2 rounded-2xl"
      >
        How It Works
      </a>

      <a
        href="#about"
        className="text-[#0d0d0d] transition bg-[#cfebbd] hover:bg-[#c1f4a2] p-2 rounded-2xl"
      >
        About
      </a>
    </nav>

    {/* TAGLINE */}
    <span className="hidden md:block text-xs uppercase tracking-widest text-[#6B4226]/90 font-medium">
      Crop &amp; Weather Advisor
    </span>

  </div>
</header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto w-full px-6 pt-16 pb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-5xl font-extrabold text-[#1F3D2B] leading-tight">
          Know your field,
          <br /> before you sow.
        </h1>
        <p className="mt-4 text-[#4B4A45] max-w-lg mx-auto sm:mx-0 text-base sm:text-lg">
          Enter your crop and location — get plain-language planting,
          irrigation, and pest guidance built from live weather data.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 justify-center sm:justify-start text-s font-medium text-[#6B4226]/80">
          <span>🌤️ Live weather</span>
          <span>🤖 AI reasoning</span>
          <span>🆓 Free to use</span>
        </div>
      </section>

      {/* MAIN FORM CARD */}
      <main
        id="advisor"
        className="flex-1 flex items-start justify-center px-6 pb-16 scroll-mt-20"
      >
        <div className="w-full max-w-lg bg-[#f6f3f7cf] rounded-2xl shadow-md border border-[#1F3D2B]/5 p-8">
          <p className="text-xs text-[#6B4226]/70 mb-4">
            Try: Wheat, Rice, Cotton, Tomato · Any city or village name
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1F3D2B] mb-1">
                Crop Name
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="e.g. Wheat, Rice, Tomato"
                required
                className="w-full border border-[#1F3D2B]/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8B84B]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F3D2B] mb-1">
                Location (City/Village name)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nagpur, India"
                required
                className="w-full border border-[#1F3D2B]/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8B84B]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d05357] text-white font-medium py-2 rounded-lg hover:bg-[#50a36d] disabled:opacity-50 transition"
            >
              {loading ? 'Getting Advice...' : 'Get Advice'}
            </button>
          </form>

          {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

          {advice && (
            <div className="mt-6 bg-[#F5F3EC] border border-[#1F3D2B]/10 rounded-xl p-4 whitespace-pre-line text-[#2B2A26] text-sm leading-relaxed">
              {advice}
            </div>
          )}

          <p className="text-[11px] text-[#6B4226]/60 mt-5 text-center">
            ⚡ Powered by live weather data + AI reasoning
          </p>
        </div>
      </main>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-white/60 border-y border-[#1F3D2B]/10 py-14 scroll-mt-16"
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1F3D2B] mb-8 text-center sm:text-left">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-[#EAF3E4] rounded-xl p-5">
              <span className="text-2xl">📍</span>
              <h3 className="font-semibold text-[#1F3D2B] mt-2">
                1. Enter details
              </h3>
              <p className="text-sm text-[#4B4A45] mt-1">
                Tell us your crop and where your field is located.
              </p>
            </div>
            <div className="bg-[#EAF3E4] rounded-xl p-5">
              <span className="text-2xl">🌦️</span>
              <h3 className="font-semibold text-[#1F3D2B] mt-2">
                2. We check the weather
              </h3>
              <p className="text-sm text-[#4B4A45] mt-1">
                Live temperature, rainfall, and forecast data is pulled for
                your exact location.
              </p>
            </div>
            <div className="bg-[#EAF3E4] rounded-xl p-5">
              <span className="text-2xl">🤖</span>
              <h3 className="font-semibold text-[#1F3D2B] mt-2">
                3. Get plain-language advice
              </h3>
              <p className="text-sm text-[#4B4A45] mt-1">
                AI turns the data into simple planting, irrigation, and pest
                guidance you can act on today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#1F3D2B] mb-3">
            Why KhetSaathi?
          </h2>
          <p className="text-[#4B4A45] leading-relaxed">
            Small farmers often don't have easy access to personalized,
            up-to-date agricultural guidance. KhetSaathi combines live
            weather data with AI to give simple, actionable advice — in
            plain language, for free, in seconds.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1F3D2B]/10 py-6 bg-white/60">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6B4226]/70">
          <span>🌾 KhetSaathi — built for Small farmers</span>
          <span>Weather data via Open-Meteo · Advice generated by AI</span>
        </div>
      </footer>
    </div>
  );
}