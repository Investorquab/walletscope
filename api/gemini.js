export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body = req.body || {};
  if (typeof body === "string") { try { body = JSON.parse(body); } catch(e) {} }
  const prompt = body.prompt;
  if (!prompt) return res.status(400).json({ text: "No prompt provided" });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ text: "Gemini API key not configured." });

    // Try gemini-1.5-flash first (higher free quota), fallback to pro
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-pro"];
    let lastError = "";

    for (const model of models) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 400 }
        })
      });

      const raw = await response.text();
      let data;
      try { data = JSON.parse(raw); } catch(e) { lastError = raw.slice(0,100); continue; }

      if (data.error) { lastError = data.error.message; continue; }

      const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (result) return res.status(200).json({ text: result });
    }

    res.status(200).json({ text: "AI analysis temporarily unavailable (quota exceeded). Wallet data above is accurate." });
  } catch (err) {
    res.status(500).json({ text: "Server error: " + err.message });
  }
}
