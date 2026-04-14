export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { address, type } = req.query;
  if (!address) return res.status(400).json({ error: "No address provided", result: [] });

  const key = process.env.ETHERSCAN_API_KEY;
  let url = "";

  if (type === "txlist") {
    url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=${key}`;
  } else if (type === "tokentx") {
    url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=50&sort=desc&apikey=${key}`;
  } else if (type === "balance") {
    url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${key}`;
  } else {
    return res.status(400).json({ error: "Invalid type", result: [] });
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch(e) {
      return res.status(500).json({ error: "Invalid JSON from Etherscan", result: [] });
    }

    if (type === "txlist" || type === "tokentx") {
      const result = Array.isArray(data.result) ? data.result : [];
      return res.status(200).json({ status: "1", result });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message, result: [] });
  }
}
