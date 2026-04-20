---
name: Auto-update knowledge base
overview: Add a GitHub Agentic Workflow (gh-aw) that regenerates `KNOWLEDGE_BASE.md` (and optionally `docs/plans/*.md`) on every push to `develop`, publishes repo updates via **`safe-outputs: create-pull-request`** (no direct `contents: write` on the agent job), and syncs the KB plus plans into **Google NotebookLM** using [`roomi-fields/notebooklm-mcp`](https://github.com/roomi-fields/notebooklm-mcp).
todos:
  - id: add-agentic-workflow-md
    content: Create `.github/workflows/update-knowledge-base.md` with `on: push` to `develop` (covers PR merges and manual pushes), loop guards, and prompt that regenerates the product-focused KB.
    status: pending
  - id: add-safe-output-pr
    content: Use gh-aw built-in **`create-pull-request`** safe output to land KB/plan updates on a dedicated branch targeting `develop` (title/body prefix e.g. `[kb-bot]`); agent job stays `contents: read` only.
    status: pending
  - id: configure-notebooklm-mcp
    content: Deploy `notebooklm-mcp` using the upstream **Docker / NAS** model (README Option 3) with a persisted `/data` volume, HTTP API on port 3000, and noVNC on 6080 for one-time Google auth; pin to `@roomi-fields/notebooklm-mcp` / upstream image build per team standards.
    status: pending
  - id: sync-kb-and-plans-to-notebooklm
    content: Extend the agent prompt + outputs so that after KB regeneration, the workflow upserts NotebookLM sources for `KNOWLEDGE_BASE.md` and for changed/new plan markdown files under `docs/plans/*.md` (this glob may evolve later).
    status: pending
  - id: document-notebooklm-ci-auth
    content: Document operations setup for Dockerized `notebooklm-mcp` (noVNC `setup-auth`, `/health` verification, volume backups, reverse proxy guidance) and the GitHub Actions secrets needed to reach the private HTTP API (base URL + auth token + notebook id), following upstream docs.
    status: pending
  - id: update-gitattributes
    content: Add `.github/workflows/*.lock.yml linguist-generated=true merge=ours` to `.gitattributes`.
    status: pending
  - id: compile-workflow
    content: Compile with `gh aw compile` to generate `.github/workflows/update-knowledge-base.lock.yml`.
    status: pending
  - id: validate-run
    content: "Validate: merge + manual push to `develop` both trigger; opening a PR when drift exists; no PR spam; after merge, NotebookLM reflects `develop` HEAD; optional skip rules for bot-only churn."
    status: pending
isProject: false
---

## Goal

Keep `KNOWLEDGE_BASE.md` continuously up to date by running an agent on every push to `develop`, landing changes via **pull request** (gh-aw `create-pull-request`), and syncing:

- the updated **Knowledge Base** markdown into **NotebookLM**, and
- any **created/updated plans** in the repo into **NotebookLM** as additional sources.

NotebookLM integration should use [`roomi-fields/notebooklm-mcp`](https://github.com/roomi-fields/notebooklm-mcp) (published npm package `@roomi-fields/notebooklm-mcp`) rather than calling Google Drive APIs directly.

## Key constraints (from gh-aw docs)

- Agent job must remain **read-only**; any GitHub write operation must be done via **safe-outputs**.
- Workflow must have both:
  - a `.github/workflows/<name>.md` agentic workflow file
  - a compiled `.github/workflows/<name>.lock.yml` file
- Ensure `.gitattributes` marks `*.lock.yml` as generated (`merge=ours` + linguist marker).

## Approach

### 1) Create an agentic workflow file

Create a new gh-aw markdown workflow at:

- `.github/workflows/update-knowledge-base.md`

Frontmatter (high level):

- **Trigger**: `on: push` for `branches: [develop]` only.
  - **Same event covers both cases you care about:** merging a PR into `develop` produces a **push** to `develop` (the merge commit); a **manual push** to `develop` is also a **push**. No separate `pull_request` trigger is required for “PR merged to develop” unless you want PR-specific metadata (e.g. PR title/body) in the agent context.
- **Loop prevention (PR model):** avoid infinite PRs / tight loops, e.g. skip `create-pull-request` when an automation PR is already open from this workflow; optionally skip when `github.actor` / commit message matches known bot patterns; ensure squash/merge commit messages or labels are documented so merges of the bot PR do not immediately re-open an identical PR (second run should diff generated output vs `develop` HEAD and `noop` when aligned). Tune during implementation.
- **Permissions**: keep agent read-only (e.g. `permissions: read-all` or `contents: read` minimum)
- **NotebookLM integration surface** (pick one during implementation, prefer the simplest that works with gh-aw):
  - **HTTP → Docker deployment** (recommended with Option 3): GitHub Actions / gh-aw calls the private `notebooklm-mcp` HTTP API (port 3000) for “add/update sources” operations.
  - **MCP**: only if gh-aw can reliably run/connect an MCP client to `notebooklm-mcp` in CI; otherwise treat MCP as local-dev tooling and keep CI on HTTP.
- **safe-outputs**:
  - **`create-pull-request`** (built-in): primary path for landing regenerated `KNOWLEDGE_BASE.md` and any updated `docs/plans/*.md` onto a bot branch targeting `develop` (keeps agent job read-only per gh-aw security guidance).
  - Optional **custom safe-output job** only if `create-pull-request` cannot express a needed multi-file patch; prefer the built-in output first.

Markdown body (agent prompt):

- Tell the agent to:
  - scan repo files that define user-facing capability (primarily `routes/*.php`, `resources/js/Pages/**/*.vue`, and relevant controllers/permissions where needed)
  - update `KNOWLEDGE_BASE.md` in the same “feature/capabilities” style already used
  - detect **plan changes** on this push (use `github.event.before`/`github.event.after` when available; otherwise fall back to `git diff` against the previous commit) for files under `docs/plans/*.md` (this glob is the current team convention and may change later)
  - use **NotebookLM integration** (HTTP API against the Dockerized server by default; MCP tools only if wired for CI) to upsert sources into the configured target notebook:
    - always upsert `KNOWLEDGE_BASE.md` content after it changes
    - upsert each changed/new plan markdown as its own source (use stable titles derived from filenames)
  - **only** call `create-pull-request` when regenerated content differs from the current `develop` checkout (KB and/or plans).
  - if nothing changed (KB unchanged and no plan files changed, and no stale-plan rewrites), emit `noop` and do not open a PR.
  - if KB is unchanged but plans changed (or only NotebookLM backfill is needed), still perform NotebookLM upserts; omit PR if there is no repo diff.
  - **optional (product decision):** if a plan under `docs/plans/*.md` is **stale relative to the repo**, regenerate that plan markdown and include it in the **same automation PR** as the KB (multi-file PR). Require explicit rules (diff thresholds, max files touched, never delete human sections) to reduce risk of bad rewrites.

### 2) Land changes via `create-pull-request` (not direct push)

- Configure gh-aw **`safe-outputs: create-pull-request`** with a stable branch naming convention (e.g. `automations/knowledge-base`) and `title-prefix` / labels so humans can filter.
- The agent output should include enough structured data for the PR body (summary of what changed, links to touched routes/pages) while keeping secrets out of logs.
- **Merge policy:** team merges the PR into `develop` (same as any other change); the next `push` to `develop` runs the workflow again—if the tree already matches generated output, the run should `noop` for PR creation.

### 2b) NotebookLM timing relative to PRs

- **After merge:** the authoritative markdown lives on `develop` at `HEAD`; NotebookLM sync should use that tree (either on the merge push, or on a follow-up step when the workflow detects no further PR is needed).
- **Before merge:** optionally skip NotebookLM or sync to a “staging” notebook only—document the product choice during implementation (default: sync **after** `develop` reflects merged content).

### 3) Sync markdown into NotebookLM via `notebooklm-mcp`

NotebookLM updates happen through **MCP tools** exposed by [`roomi-fields/notebooklm-mcp`](https://github.com/roomi-fields/notebooklm-mcp), not via direct Google Drive API calls from this repo.

**Important CI reality check (must be explicit in implementation notes):** `notebooklm-mcp` is built around **NotebookLM automation** and typically requires **Google authentication/session material** (see upstream README: MCP login flow / HTTP `setup-auth` / Docker+VNC flows). GitHub-hosted runners are not a drop-in replacement for a logged-in desktop.

Recommended default architecture for reliability (per team direction):

- Deploy `notebooklm-mcp` using **Docker / NAS / server** (“Option 3”) from the upstream README: [Docker (NAS, Server)](https://github.com/roomi-fields/notebooklm-mcp?tab=readme-ov-file#option-3-docker-nas-server).
- Follow the upstream Docker guide for ports, persistence, first-time auth, and production hardening: [Docker Deployment](https://github.com/roomi-fields/notebooklm-mcp/blob/main/deployment/docs/08-DOCKER.md).
  - **Ports**: HTTP API on **3000**, noVNC on **6080** (for initial Google login / `setup-auth`).
  - **Persistence**: bind-mount a Docker volume to `/data` so `chrome_profile/`, credentials, and encryption keys survive restarts.
  - **Security**: treat **6080/noVNC as highly sensitive**; do not expose publicly without auth (upstream recommends reverse proxy + access controls).
- From GitHub Actions / gh-aw, integrate at the **HTTP API layer** against the private deployment (same HTTP API that Docker exposes on port 3000), using repository secrets for:
  - base URL (internal hostname or reverse-proxied public URL)
  - notebook identifier (per upstream API docs)
  - any required API auth token / header scheme supported by the deployed server configuration

The workflow should still pin dependency/version to the npm distribution [`@roomi-fields/notebooklm-mcp`](https://www.npmjs.com/package/@roomi-fields/notebooklm-mcp) to match the GitHub repo the user selected (even if the running server is built from Docker; keep versions aligned operationally).

**Notebook targeting**

- Store the target notebook identifier as a GitHub Secret (exact field name depends on upstream API; implementors should follow the API docs rather than guessing IDs).

**What gets uploaded**

- `KNOWLEDGE_BASE.md` (full contents) whenever it changes.
- Any changed/new markdown under `docs/plans/*.md` for the triggering push.

**Repo convention note:** ensure `docs/plans/` exists in branches where plans are expected; if the folder is absent, the “plans changed” scan should simply yield no plan uploads.

### 4) Add required `.gitattributes` rule

Update `.gitattributes` to include:

- `.github/workflows/*.lock.yml linguist-generated=true merge=ours`

### 5) Compile the workflow

Using the gh-aw CLI:

- `gh aw compile update-knowledge-base` (or compile all)

This produces:

- `.github/workflows/update-knowledge-base.lock.yml`

### 6) Validate behavior

- **Merge a PR into `develop`** and confirm the workflow runs (push event).
- **Push directly to `develop`** and confirm the workflow runs (same trigger).
- When drift exists, verify **exactly one** open automation PR (no spam) and correct file diffs.
- Merge the automation PR; verify a follow-up run does **not** open a duplicate PR when already aligned.
- Verify NotebookLM contains updated sources for the KB and for any changed plan markdown (per timing choice in §2b).

## Files to change/add

- Add: `.github/workflows/update-knowledge-base.md`
- Add: `.github/workflows/update-knowledge-base.lock.yml`
- Update: `.gitattributes`

## Notes / assumptions

- **Repo files touched:** the baseline automation always refreshes **`KNOWLEDGE_BASE.md`** from product signals in the repo. **Optionally**, the same workflow can also **rewrite `docs/plans/*.md`** when drift checks show a plan no longer matches the “final” repo state (routes, pages, permissions, feature readiness). That is **doable** and usually **not computationally heavy** for a typical Laravel/Vue repo on a per-push workflow (cost is dominated by the LLM pass, not by scanning files).
- **Why it is more complicated than KB-only:** auto-editing plans raises **quality and safety** concerns (wrong summaries, dropped nuance, merge conflicts if humans edit the same plan concurrently). Mitigations: strict scope (only certain sections), max files per run, dry-run PR mode, or “open an issue / PR” instead of direct push for plan edits.
- **Compute profile:** drift detection itself is cheap (`git diff`, glob + file reads, optional static checks). **Regenerating** multiple markdown files via an agent adds **token/time cost** roughly linear in how much context you feed the model and how many plans you allow it to touch—still reasonable for a daily or on-push job if bounded (e.g. cap at N plans, skip if only trivial churn).
- **Repo write path:** updates land via **`create-pull-request`** (not direct push from automation), matching gh-aw guidance to avoid granting `contents: write` on the agent job.
- NotebookLM automation may be subject to Google-side reliability/ToS constraints; follow upstream disclaimers and prefer a **dedicated automation Google account** as recommended in [`notebooklm-mcp` README](https://github.com/roomi-fields/notebooklm-mcp/blob/main/README.md).
