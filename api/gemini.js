export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body || {};
  const prompt = body.prompt;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
      })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch(e) {
      return res.status(500).json({ error: "Invalid JSON from Gemini", raw: text.slice(0,200) });
    }

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis unavailable.";
    res.status(200).json({ text: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
