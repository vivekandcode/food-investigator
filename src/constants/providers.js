export const PROVIDERS = {
  groq: {
    id: 'groq',
    name: 'Groq',
    badge: 'FASTEST',
    badgeColor: 'text-accent border-accent/30 bg-accent/10',
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'LLaMA 3.3 70B', recommended: true },
      { id: 'llama-3.1-8b-instant', name: 'LLaMA 3.1 8B' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B' },
    ],
    envKey: 'VITE_GROQ_API_KEY',
    freeLimit: '14,400 req/day',
    signupUrl: 'https://console.groq.com',
    supportsImages: false,
    color: '#00ffa3',
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    badge: 'IMAGES',
    badgeColor: 'text-accent3 border-accent3/30 bg-accent3/10',
    models: [
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', recommended: true },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    ],
    envKey: 'VITE_GEMINI_API_KEY',
    freeLimit: '250 req/day',
    signupUrl: 'https://aistudio.google.com',
    supportsImages: true,
    color: '#7b61ff',
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    badge: '50+ MODELS',
    badgeColor: 'text-warn border-warn/30 bg-warn/10',
    models: [
      { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'LLaMA 3.3 70B', recommended: true },
      { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B' },
      { id: 'google/gemma-3-27b-it:free', name: 'Gemma 3 27B' },
      { id: 'qwen/qwen-2.5-72b-instruct:free', name: 'Qwen 2.5 72B' },
    ],
    envKey: 'VITE_OPENROUTER_API_KEY',
    freeLimit: 'Varies by model',
    signupUrl: 'https://openrouter.ai',
    supportsImages: false,
    color: '#ffd166',
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    badge: 'FREE',
    badgeColor: 'text-accent2 border-accent2/30 bg-accent2/10',
    models: [
      { id: 'mistral-small-latest', name: 'Mistral Small', recommended: true },
      { id: 'open-mistral-7b', name: 'Mistral 7B' },
      { id: 'open-mixtral-8x7b', name: 'Mixtral 8x7B' },
    ],
    envKey: 'VITE_MISTRAL_API_KEY',
    freeLimit: 'Free trial tier',
    signupUrl: 'https://console.mistral.ai',
    supportsImages: false,
    color: '#ff6b35',
  },
}

export const DEFAULT_PROVIDER = import.meta.env.VITE_DEFAULT_PROVIDER || 'groq'

export const ANALYSIS_PROMPT = `You are an expert food scientist and nutritionist. Analyze the following food product ingredients list.

Respond ONLY with a valid JSON object (no markdown, no backticks, no extra text) in exactly this structure:
{
  "productName": "guessed product name or 'Food Product'",
  "score": <integer 0-100>,
  "grade": "A+|A|B|C|D|F",
  "verdict": "one sentence summary of healthiness",
  "ingredients": [
    {
      "name": "ingredient name",
      "concern": "brief concern or benefit under 12 words",
      "level": "high|medium|low|positive",
      "emoji": "single relevant emoji"
    }
  ],
  "nutrition": {
    "energy": "value with unit or null",
    "protein": "value with unit or null",
    "carbs": "value with unit or null"
  },
  "summary": "2-3 sentence detailed health assessment paragraph",
  "alternatives": ["healthier alternative 1", "healthier alternative 2"]
}

Scoring: 80-100=very healthy, 60-79=moderate, 40-59=caution, 20-39=poor, 0-19=very unhealthy.
Only flag ingredients that are actually notable (concerning OR beneficial).
Keep concern descriptions concise and factual.`
