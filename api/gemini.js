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

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(200).json({ text: "GROQ_API_KEY not set on server." });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
        temperature: 0.7
      })
    });

    const raw = await response.text();
    let data;
    try { data = JSON.parse(raw); } catch(e) {
      return res.status(200).json({ text: "Invalid response from Groq: " + raw.slice(0,100) });
    }

    if (data.error) return res.status(200).json({ text: "Groq error: " + data.error.message });

    const result = data?.choices?.[0]?.message?.content;
    if (!result) return res.status(200).json({ text: "No response from Groq." });

    res.status(200).json({ text: result });
  } catch (err) {
    res.status(200).json({ text: "Server error: " + err.message });
  }
}
