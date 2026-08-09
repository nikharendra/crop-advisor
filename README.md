# 🌾 KhetSaathi — Crop & Weather Advisor

**HackDevengers 1.0 Submission — Open Innovation Track**

## The Problem
Small farmers often lack access to personalized, up-to-date agricultural guidance. Generic advice doesn't account for their specific crop, location, or real-time weather conditions — leading to poor planting decisions, wasted water, and unmanaged pest risk.

## The Solution
KhetSaathi lets a farmer enter their crop and location, then combines **live weather data** with **AI reasoning** to generate simple, plain-language advice on:
- Planting & growing conditions
- Irrigation timing
- Pest & disease risk
- Urgent weather warnings

No jargon. No sign-up. Free to use.

## How It Works
1. User enters crop name + location
2. App geocodes the location and fetches a 5-day weather forecast (Open-Meteo)
3. Weather data + crop info is sent to an AI model with a structured prompt
4. AI returns clear, actionable advice — displayed instantly

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Weather Data:** Open-Meteo (free, no API key required)
- **AI:** Groq API (Llama 3.3 70B)
- **Deployment:** Vercel

## Live Demo
🔗 Link-https://crop-advisor-pink.vercel.app/

## Run Locally
\`\`\`bash
git clone https://github.com/nikharendra/crop-advisor.git
cd crop-advisor
npm install
\`\`\`

Create a \`.env.local\` file with:
\`\`\`
GROQ_API_KEY=your_groq_api_key
\`\`\`

Then run:
\`\`\`bash
npm run dev
\`\`\`

## Built By
[Your Name] — solo build for HackDevengers 1.0