import { ANALYSIS_PROMPT } from '../constants/providers'

// ── Groq ──────────────────────────────────────────────────────────
async function callGroq(apiKey, model, ingredientsText) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      messages: [
        { role: 'system', content: 'You are a food scientist. Always respond with valid JSON only.' },
        { role: 'user', content: `${ANALYSIS_PROMPT}\n\nIngredients to analyze:\n"${ingredientsText}"` },
      ],
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

// ── Gemini ────────────────────────────────────────────────────────
async function callGemini(apiKey, model, ingredientsText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `${ANALYSIS_PROMPT}\n\nIngredients to analyze:\n"${ingredientsText}"` }]
      }]
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

// ── Gemini Vision (image) ─────────────────────────────────────────
export async function callGeminiVision(apiKey, model, imageBase64) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const prompt = `${ANALYSIS_PROMPT}\n\nAnalyze the ingredient label visible in this image.`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
        ]
      }]
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

// ── OpenRouter ────────────────────────────────────────────────────
async function callOpenRouter(apiKey, model, ingredientsText) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'IngredientIQ',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      messages: [
        { role: 'system', content: 'You are a food scientist. Always respond with valid JSON only.' },
        { role: 'user', content: `${ANALYSIS_PROMPT}\n\nIngredients to analyze:\n"${ingredientsText}"` },
      ],
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error))
  return data.choices?.[0]?.message?.content || ''
}

// ── Mistral ───────────────────────────────────────────────────────
async function callMistral(apiKey, model, ingredientsText) {
  const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      messages: [
        { role: 'system', content: 'You are a food scientist. Always respond with valid JSON only.' },
        { role: 'user', content: `${ANALYSIS_PROMPT}\n\nIngredients to analyze:\n"${ingredientsText}"` },
      ],
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

// ── Main dispatcher ───────────────────────────────────────────────
export async function analyzeIngredients({ provider, model, apiKey, ingredientsText }) {
  let raw = ''
  switch (provider) {
    case 'groq':       raw = await callGroq(apiKey, model, ingredientsText); break
    case 'gemini':     raw = await callGemini(apiKey, model, ingredientsText); break
    case 'openrouter': raw = await callOpenRouter(apiKey, model, ingredientsText); break
    case 'mistral':    raw = await callMistral(apiKey, model, ingredientsText); break
    default: throw new Error(`Unknown provider: ${provider}`)
  }
  const clean = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
