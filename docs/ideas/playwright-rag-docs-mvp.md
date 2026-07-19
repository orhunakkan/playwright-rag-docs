# Playwright RAG Docs — MVP

## Problem Statement
How might we give coding agents a locally-hosted, always-current source of truth for Playwright APIs and behavior, so they stop relying on stale training data when writing or debugging Playwright code?

## Recommended Direction
Build a local-only RAG pipeline for Playwright's **Node.js** documentation first, exposed to agents as an **MCP server tool** (e.g. `search_playwright_docs`). Ingestion pulls markdown directly from Playwright's official doc source on GitHub (pinned to a release tag) rather than scraping rendered HTML — cleaner content, and the corpus is inherently versioned to a specific Playwright release. Content is chunked per heading/method/concept (not whole-page, as the current `.md` files are) and indexed locally with a hybrid search engine (BM25 + vector) so exact API tokens like `page.locator` and conceptual queries like "how do I wait for network idle" both retrieve well — with no external API keys or cloud services required.

The repo is restructured now from the flat `agent-cli/ api/ guides/ mcp/` layout to `docs/nodejs/{agent-cli,api,guides,mcp}/`, since Python, Java, and .NET docs are a known near-term requirement and this avoids a breaking rename later. Once the Node.js pipeline is proven — ingestion, chunking, indexing, and retrieval quality all validated — the same pipeline gets reused per additional language.

Sync with upstream docs is manual for the MVP (`npm run sync` when you know Playwright shipped a release); scheduled automation is a fast-follow, not a blocker. A `diff_since(version)` "what changed" tool is a strong differentiator for a later iteration but is explicitly out of MVP scope.

## Key Assumptions to Validate
- [x] **Verified 2026-07-18:** Playwright's doc source is available at a discoverable GitHub path — but it's `microsoft/playwright.dev` (the website repo), not `microsoft/playwright`. The latter's `docs/src/api/*.md` is a shared custom DSL (multi-language fences + custom cross-ref syntax like `` [`method: X`] ``) meant for their internal doc generator, not for direct ingestion. `microsoft/playwright.dev` has already-resolved, per-language `.mdx` at `{nodejs,python,java,dotnet}/docs/{api,guides,...}/*.mdx` — confirmed by diffing `class-browser.mdx` across `nodejs/` and `python/`. Needs a light MDX-strip pass (Docusaurus `<Tabs>`/`<TabItem>`/`<x-search>`/`<font>`/anchor-tag noise) but no scraping and no DSL parsing.
- [x] **Verified 2026-07-18:** `mcp/` and `agent-cli/` full doc sets exist only under `nodejs/docs/` — Python/Java/.NET each have just one `getting-started-mcp.mdx` page, no full tool docs. The `docs/{python,java,dotnet}/...` restructure should therefore only have `api/` and `guides/`, not `mcp/`/`agent-cli/`.
- [x] **Corrected 2026-07-18:** there's no multi-version doc archive to pull from — `versions.json` in `playwright.dev` just contains `["stable"]`. "Version-pinned" means pinning ingestion to a git tag/commit of `playwright.dev`, not selecting from pre-built version folders.
- [ ] Per-heading/method chunking materially improves retrieval precision over whole-page chunks — validate with a handful of real queries against both before committing to the chunking strategy.
- [ ] A local embedding model (e.g. `all-MiniLM-L6-v2` via transformers.js) is good enough for short technical API text — spot-check against a few tricky queries (synonyms, exact method names) before trusting it.
- [ ] MCP is in fact the right delivery mechanism for how you'll actually use this day to day — confirm once a first working server exists and you've called it from a real agent session.

## MVP Scope
**In:**
- Restructure repo to `docs/nodejs/{agent-cli,api,guides,mcp}/`
- Ingestion script: pull Node.js doc markdown from GitHub source, pinned to a release tag
- Chunking: per heading/method/concept, with metadata (`language`, `docType`, `sourceUrl`, `playwrightVersion`)
- Local hybrid index (Orama or equivalent) + local embeddings (transformers.js or equivalent) — rebuilt from scratch on each sync, not mutated in place
- MCP server exposing a single search tool over the Node.js index
- Manual `sync` command to re-ingest on demand

**Out (see Not Doing):** everything not directly needed to prove "agent asks a Playwright question, gets an accurate, current, cited answer."

## Not Doing (and Why)
- **Python/Java/.NET content** — Node.js pipeline needs to work end-to-end first; adding languages before validating retrieval quality multiplies rework if the chunking/indexing approach needs to change.
- **Scheduled auto-sync (GitHub Action, cron)** — manual sync is enough to prove the pipeline; automating a process you haven't validated yet just automates potential mistakes.
- **`diff_since(version)` changelog tool** — a real differentiator, but a distinct feature built on top of versioned ingestion; adding it now would dilute focus on getting core search right.
- **Cloud-hosted API / multi-team hosting** — nothing today requires network access beyond your own machine; building server infra for hypothetical future consumers is premature.
- **HTML scraping of playwright.dev** — GitHub source pull is cleaner and versioned; scraping is a fallback only if the source-repo assumption above turns out to be wrong.

## Open Questions
- ~~Where exactly does Playwright's Node.js doc markdown source live, and is it clean enough to ingest?~~ **Resolved:** `microsoft/playwright.dev`, `{language}/docs/{api,guides,...}/*.mdx`, per-language already resolved, needs MDX-strip normalization.
- What specific chunking granularity (per-`<h2>`? per-method signature? per-code-example?) gives the best retrieval precision for this content — needs empirical testing, not just a guess.
- Since all four languages already live in the same `playwright.dev` repo, is there still value in building Node.js first and generalizing later, or is the ingestion pipeline now simple enough (same repo, same `.mdx` shape, just a different top-level folder per language) that all four languages could be in scope for the MVP itself?
