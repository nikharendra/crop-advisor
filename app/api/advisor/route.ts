import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { crop, location } = await req.json();

    if (!crop || !location) {
      return NextResponse.json(
        { error: 'Crop and location are required.' },
        { status: 400 }
      );
    }

    // Step 1: Convert location name to lat/lon using Open-Meteo's free geocoding API
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        location
      )}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return NextResponse.json(
        { error: 'Location not found. Try a nearby bigger city name.' },
        { status: 404 }
      );
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Fetch current + short-term weather forecast
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=precipitation_sum,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
    );
    const weatherData = await weatherRes.json();

    // Step 3: Build a clear, structured prompt using real weather data
    const prompt = `
You are an agricultural advisor helping a small farmer who may not be tech-savvy.

Crop: ${crop}
Location: ${name}, ${country}
Current conditions: Temperature ${weatherData.current.temperature_2m}°C, Humidity ${weatherData.current.relative_humidity_2m}%, Wind ${weatherData.current.wind_speed_10m} km/h
5-day forecast: Max temps ${weatherData.daily.temperature_2m_max.join(', ')}°C, Min temps ${weatherData.daily.temperature_2m_min.join(', ')}°C, Expected rainfall ${weatherData.daily.precipitation_sum.join(', ')} mm

Give simple, practical advice in plain language (avoid jargon) covering:
1. Planting/growing guidance for this crop given current conditions
2. Irrigation advice (should they water more/less, and when)
3. Pest/disease risk based on humidity and temperature
4. Any urgent warning if weather looks risky (heavy rain, extreme heat, etc.)

Keep it concise, friendly, and actionable — like you're speaking directly to the farmer. Use short paragraphs or bullet points.
`.trim();
// Step 4: Call Groq (Llama model, OpenAI-compatible format)
    const aiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error('Groq error:', errText);
      return NextResponse.json(
        { error: 'AI service failed. Please try again.' },
        { status: 500 }
      );
    }

    const aiData = await aiRes.json();
    const advice = aiData.choices[0].message.content;

    return NextResponse.json({ advice, location: `${name}, ${country}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Something went wrong on our end.' },
      { status: 500 }
    );
  }
}