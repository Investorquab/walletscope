export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { address, type, chain } = req.query;
  if (!address) return res.status(400).json({ error: "No address", result: [] });

  const key = process.env.ETHERSCAN_API_KEY;
  const chainMap = { ethereum: 1, arbitrum: 42161, bnb: 56, optimism: 10 };
  const chainId = chainMap[chain] || 1;
  const base = `https://api.etherscan.io/v2/api?chainid=${chainId}&apikey=${key}`;

  let url = "";
  if (type === "txlist") {
    url = `${base}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc`;
  } else if (type === "tokentx") {
    url = `${base}&module=account&action=tokentx&address=${address}&page=1&offset=100&sort=desc`;
  } else if (type === "balance") {
    url = `${base}&module=account&action=balance&address=${address}&tag=latest`;
  } else if (type === "ethprice") {
    url = `https://api.etherscan.io/v2/api?chainid=1&apikey=${key}&module=stats&action=ethprice`;
  } else if (type === "tokenbalance") {
    // Get current token balances using tokenbalancemulti not tokentx
    url = `${base}&module=account&action=tokentx&address=${address}&page=1&offset=200&sort=desc`;
  } else {
    return res.status(400).json({ error: "Invalid type", result: [] });
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch(e) {
      return res.status(500).json({ error: "Invalid JSON", result: [] });
    }
    if (type === "txlist" || type === "tokentx" || type === "tokenbalance") {
      const result = Array.isArray(data.result) ? data.result : [];
      return res.status(200).json({ status: "1", result });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message, result: [] });
  }
}
