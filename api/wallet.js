export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { address, type, chain } = req.query;
  if (!address) return res.status(400).json({ error: "No address", result: [] });

  const ethKey = process.env.ETHERSCAN_API_KEY;

  // Different API endpoints per chain
  const chainAPIs = {
    ethereum: `https://api.etherscan.io/v2/api?chainid=1&apikey=${ethKey}`,
    arbitrum: `https://api.etherscan.io/v2/api?chainid=42161&apikey=${ethKey}`,
    bnb:      `https://api.bscscan.com/api?apikey=YourBscApiKey`,
    optimism: `https://api.etherscan.io/v2/api?chainid=10&apikey=${ethKey}`,
  };

  const currentChain = chain || "ethereum";
  const base = chainAPIs[currentChain] || chainAPIs.ethereum;

  let url = "";
  if (type === "txlist") {
    url = `${base}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=200&sort=desc`;
  } else if (type === "tokentx") {
    url = `${base}&module=account&action=tokentx&address=${address}&page=1&offset=200&sort=desc`;
  } else if (type === "balance") {
    url = `${base}&module=account&action=balance&address=${address}&tag=latest`;
  } else if (type === "ethprice") {
    url = `https://api.etherscan.io/v2/api?chainid=1&apikey=${ethKey}&module=stats&action=ethprice`;
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
    if (type === "txlist" || type === "tokentx") {
      const result = Array.isArray(data.result) ? data.result : [];
      return res.status(200).json({ status: "1", result });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message, result: [] });
  }
}
