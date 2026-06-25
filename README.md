# Digital Twin AI Chatbot — Project Summary

**Live site:** https://digital-twin-portfolio-weld-nu.vercel.app
**Repo:** github.com/ChuLion/digital-twin-portfolio

## What This Is

An AI-powered "digital twin" embedded directly in my portfolio site — a chatbot that answers questions about my career, skills, and project history in my own voice, grounded entirely in my actual résumé and performance documentation. Visitors can ask things like *"What's your experience with dbt?"* or *"What roles are you looking for?"* and get a direct, sourced answer instead of having to dig through a static page.

The project doubles as a working demonstration of full-stack AI engineering: prompt design, retrieval-style grounding, multi-model evaluation, and the production hardening that separates a weekend demo from something safe to expose publicly.

## Capabilities

- **Grounded, citation-backed answers.** Every factual claim the twin makes is tagged to a source document (e.g. `[Profile.pdf]`, `[2025 EOY.pdf]`, `[Recent Work Summary]`). If something isn't covered by my actual documentation, it says so explicitly rather than guessing.
- **Hallucination-resistant by design.** The system prompt enforces a hard rule: no fabricated titles, dates, metrics, or skills. Anything outside the provided source material gets an honest "that's not something my résumé covers" response.
- **Multi-model A/B testing.** A server-enforced allowlist currently exposes three free-tier models via OpenRouter — NVIDIA Nemotron 3 Super, OpenAI gpt-oss-120b, and Google Gemma 4 31B — for live comparison of instruction-following quality and response latency before settling on a production default.
- **Streaming responses** via the Fetch Streams API for a responsive, real-time chat feel.
- **Tuned for chat, not résumé dumps.** Responses default to 3-5 sentences with citations consolidated once per answer, after an earlier version produced bulleted, citation-heavy walls of text that read more like a PDF than a conversation.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript |
| Styling | Tailwind CSS |
| UI | React, lucide-react icons |
| AI inference | OpenRouter (multi-provider model routing) |
| Hosting | Vercel (serverless functions) |
| Source control | Git / GitHub |

## Getting Started

Clone and install:

```bash
git clone https://github.com/ChuLion/digital-twin-portfolio.git
cd digital-twin-portfolio
npm install
```

Create a `.env.local` file in the project root:

```
OPENROUTER_API_KEY=your_key_here
```

Get a key at [openrouter.ai](https://openrouter.ai). The chat feature won't function without it — the rest of the site renders normally regardless.

Run the dev server:

```bash
npm run dev
```

Visit the local URL printed in the terminal (typically `http://localhost:3000`).

Build for production:

```bash
npm run build
```

**Deployment:** configured for Vercel. Connect the repo, add `OPENROUTER_API_KEY` under Project Settings → Environment Variables, and deploy. No other configuration is required.

## Engineering & Production Hardening

The interesting part of this project isn't the chat widget — it's everything around it that makes a public-facing endpoint with a paid API key safe to expose. Built and verified through an iterative code-review process (multiple independent passes covering security, accessibility, performance, and SEO), with every fix tested against real requests rather than accepted on a code read-through alone:

- **Server-side secret handling.** The OpenRouter API key never leaves the server; the client only ever talks to my own `/api/chat` route.
- **Server-enforced model allowlist.** The client can request a model, but the server rejects (`403`) anything outside an explicit allowlist — closing off the obvious abuse path of routing arbitrary, expensive models through my key.
- **Cost controls.** Per-message length caps (2,000 characters), a 30-message sliding conversation window (older messages are trimmed, not hard-rejected, so long conversations degrade gracefully instead of breaking), a `max_tokens` ceiling per response, and IP-based rate limiting (10 requests/minute, with proper `429` + `Retry-After` responses).
- **Input validation.** Malformed JSON, missing fields, and invalid message roles are all rejected with clear `400` responses instead of throwing an unhandled error.
- **Sanitized failure modes.** Upstream provider errors are logged server-side only; the client gets a generic, safe message — never raw error text that could leak configuration details.
- **Resilient retry logic.** A failed message can be retried without duplicating the user's turn or leaking the error placeholder back into the model's context — a subtle bug that's easy to miss and easy to ship by accident.
- **Accessibility & SEO baseline.** Skip-to-content link, state-aware ARIA labels, mobile-responsive navigation and chat panel, `robots.txt`/`sitemap.xml`, and JSON-LD structured data for search visibility.

## Known Limitations

In keeping with the same documentation standard I apply across my other public projects — status reflects reality, not a curated best case:

- **Rate limiting is in-memory**, scoped to a single server instance. Fine at current low-traffic, "share with a few people" scale; would need a shared store (e.g. Upstash Redis) before this could handle real concurrent traffic across multiple serverless instances.
- **Free-tier inference models** can be deprioritized, rate-limited, or withdrawn by their providers without notice — an accepted tradeoff for a portfolio demo, not something I'd rely on for a production SLA.
- **No automated test suite.** A deliberate scope call for a single-maintainer portfolio site — verification has instead happened through targeted manual and scripted testing at each change, not unit/integration coverage.
- **Model selector is temporary.** It's currently a visible testing tool, not a permanent feature; the production version will default to a single chosen model once evaluation is complete.

## Planned Enhancements

- **A more approachable first impression for non-technical visitors.** Right now the chat opens with a generic prompt; a recruiter without a technical background may not know what to ask. Planned: a warmer, plain-language intro plus 3-4 clickable suggested questions (e.g. *"What kind of role are you looking for?"*) so the feature doesn't depend on the visitor already knowing the right question to ask.
- **Centralized rate limiting** via Upstash Redis or similar, once traffic moves beyond the testing phase.
- **Conversation export**, so a recruiter can email themselves the transcript of a useful exchange.
- **Lock to a single production model** once the current A/B evaluation concludes.
- **Custom domain**, replacing the current Vercel preview URL once finalized.

## Why It's Here

This project sits alongside my other public analytics-engineering work (the MTA transit pipeline, the Puerto Rico real estate analysis) as a deliberately different kind of proof point: not a data pipeline, but a full-stack application — covering AI integration, security-conscious API design, and the kind of production discipline (cost controls, input validation, graceful failure handling) that matters just as much in an LLM-powered feature as it does in a BigQuery pipeline.