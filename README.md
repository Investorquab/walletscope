# WalletScope — On-Chain Wallet Intelligence

> Submission for **Liquify Indexer API Hackathon** — Challenge 1 & Challenge 3

**Live Demo:** [your-github-username.github.io/walletscope]

---

## What it does

WalletScope is a clean, minimal wallet intelligence tool that rivals institutional platforms like Arkham and Dune — but built for any DeFi user, not just analysts.

### Challenge 1 — Advanced Wallet Analysis
- Multi-wallet tracking (add multiple addresses)
- Cross-chain support: Ethereum, Arbitrum, BNB Chain, Optimism
- Deep transaction categorization (swaps, yield, transfers, DeFi interactions)
- Token holdings breakdown
- Contract interaction analysis

### Challenge 3 — DeFi Tax Reporting
- Automatic categorization of all taxable events
- Gains/losses calculation across swap and yield transactions
- One-click CSV export for accountants
- AI-generated plain-English tax guidance

---

## AI-Powered Insights (Gemini)
Every wallet analysis includes:
- Behavioral pattern detection ("trader vs holder vs yield farmer")
- Risk scoring (0–100) with specific flag explanations
- Tax optimization advice
- Follow-up Q&A chips for deeper analysis

---

## Tech Stack
| Layer | Tool |
|---|---|
| Wallet Data | Liquify Indexer API + Etherscan |
| AI Analysis | Google Gemini 2.0 Flash |
| Frontend | Vanilla HTML/CSS/JS |
| Hosting | GitHub Pages |

---

## Setup

1. Clone this repo
2. Open `index.html`
3. Replace API key placeholders at the top of the `<script>` tag:
```js
const GEMINI_API_KEY    = "YOUR_GEMINI_API_KEY_HERE";
const ETHERSCAN_API_KEY = "YOUR_ETHERSCAN_API_KEY_HERE";
const LIQUIFY_API_KEY   = "YOUR_LIQUIFY_API_KEY_HERE";
```
4. Open in browser — no build step needed

---

## Why WalletScope stands out
- **Minimal UI** — opposite of overwhelming dark dashboards
- **All-in-one** — analysis + risk + tax in one tool
- **AI layer** — Gemini explains data in plain English, not just numbers
- **No install** — single HTML file, works anywhere

---

Built for the Liquify Hackathon 2026.
