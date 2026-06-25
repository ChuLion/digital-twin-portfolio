# Code Review

Date: 2026-06-24
Scope: Full repository review of the Next.js app, API route, metadata/SEO files, and project docs
Checks run: `npm run lint`, `npm run build`
Severity: P1 = high, P2 = medium, P3 = low

## Findings

### P1 - Public chat proxy has only per-instance in-memory throttling and no stronger abuse controls

Files:
- [src/app/api/chat/route.ts](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/api/chat/route.ts:124)
- [src/app/api/chat/route.ts](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/api/chat/route.ts:147)

The `POST /api/chat` route is publicly callable and spends a server-side `OPENROUTER_API_KEY`, but the only protection is an in-memory `Map` keyed by IP. The comment already notes this does not coordinate across concurrent serverless instances. In practice, that means the effective rate limit becomes easy to bypass under horizontal scaling, and the endpoint remains exposed to quota burn or nuisance traffic.

Remedial actions:
- Move rate limiting to a shared store such as Upstash Redis, Vercel KV, or another centralized backend.
- Add origin checks or a signed/session-based gate if this endpoint is not intended to be a fully public API.
- Add timeout handling and upstream failure telemetry so abusive or hung requests do not quietly consume server capacity.

### P1 - SEO and site identity point at a different domain than the API referer

Files:
- [src/app/layout.tsx](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/layout.tsx:5)
- [src/app/layout.tsx](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/layout.tsx:44)
- [src/app/robots.ts](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/robots.ts:9)
- [src/app/sitemap.ts](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/sitemap.ts:4)
- [src/app/api/chat/route.ts](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/api/chat/route.ts:193)

`metadataBase`, JSON-LD, `robots.txt`, and `sitemap.xml` all advertise `digital-twin-portfolio-weld-nu.vercel.app`, while the chat proxy sends `https://jesusdeleon.dev` as the OpenRouter referer. If the intended production URL is the custom domain, crawlers and social previews will be told the wrong canonical identity. If the Vercel preview domain is intentional, then the referer is the outlier. Either way, the project currently has two competing production identities.

Remedial actions:
- Define a single canonical site URL and use it consistently for `metadataBase`, JSON-LD `url`, `robots`, `sitemap`, and provider referer metadata.
- Pull the canonical URL from an environment variable so preview and production deployments do not drift.

### P2 - Retrying a failed Digital Twin request replays bad context and duplicates the user turn

Files:
- [src/components/DigitalTwin.tsx](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/components/DigitalTwin.tsx:45)
- [src/components/DigitalTwin.tsx](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/components/DigitalTwin.tsx:97)

On retry, `send(text)` rebuilds history from the current `messages` array, which already contains the failed user turn and the synthetic assistant error message. It then appends the same user message again. That means retries can send duplicated user prompts and local UI error text back to the model, polluting the conversation state and making later answers less reliable.

Remedial actions:
- Keep a sanitized conversation history that excludes local transport errors.
- On retry, replace the failed assistant placeholder instead of appending a second user turn.
- Consider storing message IDs so a retry can target the failed exchange deterministically.

### P2 - The chat panel has a fixed `380px` width and will overflow narrow mobile viewports

File:
- [src/components/DigitalTwin.tsx](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/components/DigitalTwin.tsx:137)

The panel uses `w-[380px]` with `right-6`. On smaller phones, that can exceed the viewport width and clip the panel off-screen. This is a real mobile UX bug, not just a design preference.

Remedial actions:
- Replace the fixed width with a viewport-aware rule such as `w-[min(380px,calc(100vw-3rem))]`.
- Consider switching to a bottom sheet treatment on small screens.

### P2 - The entire landing page is forced into the client bundle for a small mobile-nav interaction

File:
- [src/app/page.tsx](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/page.tsx:1)

`src/app/page.tsx` is marked `"use client"` only to support the mobile menu state. That causes the whole page, including static sections like Hero, About, Career, Impact, Portfolio, and Contact, to hydrate as client code. For a mostly static portfolio, this is unnecessary bundle and hydration cost.

Remedial actions:
- Keep the route as a Server Component and move the mobile nav into a small client subcomponent.
- Leave `DigitalTwin` client-only, but let the content sections remain server-rendered.

### P2 - The public API route does not handle malformed JSON requests explicitly

File:
- [src/app/api/chat/route.ts](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/src/app/api/chat/route.ts:161)

`await req.json()` is called without a parse guard. If a client sends invalid JSON, the route will throw and fall back to a generic 500 instead of returning a clear 400-series response. Because this is a public endpoint, malformed input should be treated as a normal client error path.

Remedial actions:
- Wrap `req.json()` in `try/catch` and return `400 Bad Request` for invalid JSON.
- Validate that each message also has an allowed `role`, not just a bounded `content` string.

### P3 - README is stale boilerplate and no longer describes the real project

File:
- [README.md](/Volumes/JDL%20Personal/jesusdeleonmini/projects/site/README.md:1)

The README still describes a fresh `create-next-app` scaffold, references `app/page.tsx`, mentions `next/font`, and contains generic Vercel marketing text. None of that reflects the current portfolio site, the Digital Twin feature, required environment variables, or deployment expectations.

Remedial actions:
- Replace the README with project-specific setup, architecture, and deployment notes.
- Document the `OPENROUTER_API_KEY` requirement and the intended production domain.
- Add a short explanation of the Digital Twin feature and its operational caveats.

## Open Questions and Assumptions

- This review assumes `jesusdeleon.dev` is the intended production domain because it is used in the OpenRouter referer, but the code currently publishes the Vercel URL everywhere else.
- I did not review the contents of the PDFs for factual accuracy against the rendered claims; this review is about code, behavior, and operational risk.
- There are no automated tests in the repository, so chat behavior and responsive UX risks were assessed from code paths plus build/lint validation rather than test coverage.

## Verification Summary

- `npm run lint` passed.
- `npm run build` passed.
- No application code was changed as part of this review; only this `review.md` file was updated.
