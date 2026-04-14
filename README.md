# WalletScope — On-Chain Wallet Intelligence

> **Liquify Indexer API Hackathon Submission — Challenge 1 & Challenge 3**

**Live Demo:** https://wallet-scope1.vercel.app  
**GitHub:** https://github.com/Investorquab/walletscope

---

## What is WalletScope?

WalletScope is a clean, minimal wallet intelligence tool that gives any DeFi user institutional-grade on-chain analysis — without the complexity of platforms like Arkham or Dune.

Paste a wallet address. Get instant insights.

---

## Challenges Addressed

### Challenge 1 — Advanced Wallet Analysis Tool
WalletScope delivers deep, multi-dimensional wallet tracking powered by the Liquify Indexer API:

- **Real-time transaction history** — last 200 transactions fetched and categorized instantly
- **Smart categorization** — every transaction is automatically labeled: Received, Sent, Swap, or DeFi/Yield based on contract interaction patterns
- **Risk scoring (0–100)** — proprietary algorithm that scores wallets across 5 dimensions:
  - Failed transaction rate
  - Unique contract exposure
  - Large value transaction detection
  - Incoming vs outgoing activity ratio
  - Rapid transaction patterns (bot detection)
- **Multi-chain support** — Ethereum and Arbitrum via Liquify/Etherscan V2 API
- **Token holdings** — calculates net current balances (not just historical transfers)
- **AI behavioral analysis** — Llama 3.3 70B explains wallet behavior in plain English

### Challenge 3 — DeFi Tax Reporting Tool
WalletScope automates tax report generation for complex DeFi activity:

- **Automatic event classification** — swaps, yield income, transfers all categorized per tax framework standards (IRS/HMRC compatible)
- **Gain/loss calculation** — realized gains from swaps and yield farming estimated in USD
- **Net P&L summary** — total gains, losses, and taxable income estimate in one view
- **One-click CSV export** — structured report ready for accountants or tax software
- **AI tax advice** — plain-English guidance on short-term vs long-term treatment and optimization opportunities
- **Multi-contract indexing** — tracks interactions across lending, yield aggregators, and AMMs

---

## How It Works
User pastes wallet address
↓
Liquify/Etherscan V2 API fetches:

Transaction list (200 txs)
Token transfer history
Native token balance
↓
WalletScope engine:
Categorizes each transaction
Computes risk score across 5 factors
Calculates net token balances
Estimates taxable gains/losses
↓
Llama 3.3 70B (via Groq) analyzes:
Behavioral patterns
Risk explanation
Tax optimization advice
↓
Clean UI renders everything instantly
User exports CSV tax report

---

## Tech Stack

| Layer | Technology |
|---|---|
| Wallet Data | Liquify Indexer API + Etherscan V2 |
| AI Analysis | Llama 3.3 70B via Groq (free tier) |
| Backend | Vercel Serverless Functions (Node.js) |
| Frontend | Vanilla HTML/CSS/JS — zero dependencies |
| Hosting | Vercel |

---

## Why WalletScope Stands Out

**Design philosophy:** Every other submission will be a dark dashboard overloaded with charts. WalletScope goes the opposite direction — clean, white, minimal. Judges can actually use it without a tutorial.

**Security:** API keys live server-side in Vercel environment variables. Zero secrets exposed in frontend code.

**Speed:** No framework, no build step, no bloat. One HTML file + two serverless functions. Loads in under a second.

**Practical output:** The CSV tax export is a real deliverable users can hand to an accountant today.

---

## Roadmap (Post-Hackathon)

- Historical ETH price per transaction date for accurate tax calculations
- Full Liquify custom contract indexing for newly launched protocols
- BNB Chain and Optimism support
- Multi-wallet portfolio aggregation
- Scheduled monitoring with email alerts

---

## Setup (Local Development)

1. Clone this repo
2. Install Vercel CLI: `npm i -g vercel`
3. Add environment variables in Vercel dashboard:
   - `GROQ_API_KEY`
   - `ETHERSCAN_API_KEY`
4. Run locally: `vercel dev`
5. Open `http://localhost:3000`

---

## Team

Built solo for the Liquify Indexer API Hackathon 2026.  
GitHub: [@Investorquab](https://github.com/Investorquab)

---

*WalletScope — Making on-chain intelligence accessible to everyone.*
