---
name: Update knowledge base and NotebookLM
description: >-
  On push to develop, regenerate KNOWLEDGE_BASE.md from product signals, open a PR when drift exists,
  and publish KB plus changed plan markdown to NotebookLM via the private notebooklm-mcp HTTP API.
on:
  push:
    branches: [develop]
  workflow_dispatch:

permissions:
  contents: read
  pull-requests: read
  issues: read

checkout:
  fetch-depth: 0

concurrency:
  group: kb-bot-${{ github.repository }}-develop
  cancel-in-progress: true

network:
  allowed:
    - defaults
    - github

tools:
  github:
    toolsets: [default]

tracker-id: kb-ntwrk-sync

strict: true

timeout-minutes: 35

safe-outputs:
  create-pull-request:
    title-prefix: '[kb-bot] '
    labels: [kb-bot, knowledge-base]
    draft: false
    base-branch: develop
    preserve-branch-name: true
    max: 1
    if-no-changes: warn
  noop:
    report-as-issue: false
  missing-tool:
    create-issue: false
  missing-data:
    create-issue: false
  jobs:
    notebooklm-sync:
      description: >-
        Upsert markdown into NotebookLM using the HTTP API from roomi-fields/notebooklm-mcp
        (POST /content/sources). Paths to publish are derived from the push diff; the agent only
        signals intent via acknowledge=true.
      runs-on: ubuntu-latest
      output: NotebookLM sync step completed
      inputs:
        acknowledge:
          description: Agent must set true so this job runs after KB/PR logic (paths come from git diff).
          required: true
          type: boolean
      permissions:
        contents: read
      env:
        NOTEBOOKLM_HTTP_BASE_URL: ${{ secrets.NOTEBOOKLM_HTTP_BASE_URL }}
        NOTEBOOKLM_NOTEBOOK_URL: ${{ secrets.NOTEBOOKLM_NOTEBOOK_URL }}
        NOTEBOOKLM_HTTP_TOKEN: ${{ secrets.NOTEBOOKLM_HTTP_TOKEN }}
      steps:
        - name: Checkout triggering commit
          uses: actions/checkout@v4
          with:
            ref: ${{ github.event.after }}
            fetch-depth: 0
        - name: Publish changed KB and plans to NotebookLM
          shell: bash
          run: |
            set -euo pipefail
            if [ -z "${NOTEBOOKLM_HTTP_BASE_URL:-}" ] || [ -z "${NOTEBOOKLM_NOTEBOOK_URL:-}" ]; then
              echo "NOTEBOOKLM_HTTP_BASE_URL or NOTEBOOKLM_NOTEBOOK_URL unset; skipping NotebookLM publish."
              exit 0
            fi
            BASE="${NOTEBOOKLM_HTTP_BASE_URL%/}"
            ZERO=0000000000000000000000000000000000000000
            AUTH=()
            if [ -n "${NOTEBOOKLM_HTTP_TOKEN:-}" ]; then
              AUTH=( -H "Authorization: Bearer ${NOTEBOOKLM_HTTP_TOKEN}" )
            fi
            PLANS_ROOT="docs/plans"
            mapfile -t CHANGED < <(
              if [ -z "${GH_AW_GITHUB_EVENT_BEFORE:-}" ] || [ "${GH_AW_GITHUB_EVENT_BEFORE}" = "${ZERO}" ]; then
                git diff-tree --no-commit-id --name-only -r "${GH_AW_GITHUB_EVENT_AFTER}" | grep -E "^KNOWLEDGE_BASE\\.md$|^${PLANS_ROOT}/.+\\.md$" || true
              else
                git diff --name-only "${GH_AW_GITHUB_EVENT_BEFORE}" "${GH_AW_GITHUB_EVENT_AFTER}" | grep -E "^KNOWLEDGE_BASE\\.md$|^${PLANS_ROOT}/.+\\.md$" || true
              fi
            )
            if [ "${#CHANGED[@]}" -eq 0 ]; then
              echo "No KNOWLEDGE_BASE.md or ${PLANS_ROOT}/*.md changes in this push; nothing to upload."
              exit 0
            fi
            for path in "${CHANGED[@]}"; do
              [ -z "${path}" ] && continue
              if [ ! -f "${path}" ]; then
                echo "Skip missing path: ${path}"
                continue
              fi
              title="${path##*/}"
              if [ "${path}" = "KNOWLEDGE_BASE.md" ]; then
                title="KNOWLEDGE_BASE.md"
              fi
              echo "Upsert NotebookLM source for ${path} (title=${title})"
              enc_title="$(jq -rn --arg t "$title" '$t|@uri')"
              curl -sS -X DELETE "${BASE}/content/sources?source_name=${enc_title}" \
                "${AUTH[@]}" -H "Accept: application/json" >/dev/null 2>&1 || true
              json_payload="$(jq -Rs --arg title "$title" --arg notebook_url "$NOTEBOOKLM_NOTEBOOK_URL" \
                '{source_type: "text", text: ., title: $title, notebook_url: $notebook_url}' < "$path")"
              curl -sS -f -X POST "${BASE}/content/sources" \
                "${AUTH[@]}" \
                -H "Content-Type: application/json" \
                -d "${json_payload}" | head -c 2000
              echo
            done
            echo "NotebookLM publish finished for ${#CHANGED[@]} file(s)."
---

# Knowledge base + NotebookLM (develop push)

You run inside a checked-out copy of `${{ github.repository }}` on ref `${{ github.event.after }}` (the `develop` tip for this push).

## Product goal

1. Keep root `KNOWLEDGE_BASE.md` accurate as a **product / capabilities** document (Romanian-facing UX, role-based access, what is shipped vs placeholder). It must **not** read like `AGENTS.md` or a stack handbook.
2. When the regenerated KB and/or tracked plan files differ from `develop` **HEAD**, land updates with the **`create_pull_request`** safe-output MCP tool (never push directly). Use branch name **`automations/knowledge-base`**, base **`develop`**, title prefix already configured as `[kb-bot] `.
3. After KB/PR decisions, **always** call the **`notebooklm_sync`** safe-output tool with `acknowledge: true` so the follow-up job can publish from git history (see frontmatter job). Publishing uses the Docker-hosted HTTP API from [`roomi-fields/notebooklm-mcp`](https://github.com/roomi-fields/notebooklm-mcp) ([API](https://github.com/roomi-fields/notebooklm-mcp/blob/main/deployment/docs/03-API.md), [Docker](https://github.com/roomi-fields/notebooklm-mcp/blob/main/deployment/docs/08-DOCKER.md)); do **not** call Google Drive APIs from this workflow.

## Configurable plan path

- Plan markdown is matched under **`docs/plans/*.md`** (edit the `notebooklm-sync` job `grep` in this workflow’s frontmatter if that convention changes). If the directory is missing, there are zero plan uploads.

## Inputs to study (priority order)

- `routes/*.php`, `resources/js/Pages/**/*.vue` (and `resources/js/pages/**/*.vue` if present), permission enums / route middleware comments when needed, navigation/sidebar components.
- Current `KNOWLEDGE_BASE.md` for tone and structure.

## Detect plan files touched on this push

Use bash (from repo root):

```bash
BEFORE='${{ github.event.before }}'
AFTER='${{ github.event.after }}'
ZERO=0000000000000000000000000000000000000000
PLANS_ROOT='docs/plans'
if [ -z "$BEFORE" ] || [ "$BEFORE" = "$ZERO" ]; then
  git diff-tree --no-commit-id --name-only -r "$AFTER" | grep -E "^${PLANS_ROOT}/.+\\.md$" || true
else
  git diff --name-only "$BEFORE" "$AFTER" | grep -E "^${PLANS_ROOT}/.+\\.md$" || true
fi
```

NotebookLM uploads for plans are handled by the **`notebooklm-sync` job** using the same diff rules; you do **not** need to upload plans yourself from the agent.

## Regenerate `KNOWLEDGE_BASE.md`

1. Re-read the product signals above. Update `KNOWLEDGE_BASE.md` in the **same style** as the current file: purpose/audience, capabilities by area, honest “placeholder vs active” navigation table, no stack dump.
2. **Do not** auto-regenerate stale `${PLANS_ROOT}/*.md` in this workflow iteration—only existing changed plan files on disk are synced downstream.

## PR spam / loop controls

Before opening a PR:

1. Use GitHub MCP search for an **open** PR into `develop` with labels **`kb-bot` and `knowledge-base`** (or title starting `[kb-bot]` from this automation). If one exists and your regenerated tree would produce the **same** net diff as merging that PR, **do not** open another PR—finish with `noop` explaining the duplicate automation PR is already open.
2. If an automation PR is open but your new regeneration **adds** meaningful changes compared to `develop` HEAD, you may still open/update via `create_pull_request` (safe output deduplicates branch naming; prefer a single long-lived branch name **`automations/knowledge-base`** in the tool input when required by the tool schema).
3. If regenerated `KNOWLEDGE_BASE.md` is **byte-identical** to `git show HEAD:KNOWLEDGE_BASE.md` and there are **no** `${PLANS_ROOT}/*.md` edits in your working tree that are not already at HEAD, **do not** open a PR.

## NotebookLM timing (default)

Sync runs **after** this push is on `develop` (this workflow only triggers on `develop`). The publish job reads **`${{ github.event.before }}` → `${{ github.event.after }}`** so merged PR content is included. If you ever change that ordering, explain why in the PR body.

## Required final outputs

Always emit **both**:

1. **`notebooklm_sync`** with `acknowledge: true` (boolean) so HTTP publish runs for `KNOWLEDGE_BASE.md` and changed `${PLANS_ROOT}/*.md` per the push diff.
2. **`create_pull_request`** when (and only when) KB and/or plan markdown in the working tree differs from `develop` HEAD and duplicate-open-PR rules pass; otherwise **`noop`** with a short message.

Use the combined `items` shape (example structure—fill with real content):

```json
{
  "items": [
    { "type": "notebooklm_sync", "acknowledge": true },
    { "type": "noop", "message": "KB already matches develop; no PR." }
  ]
}
```

Or swap the second item for the `create_pull_request` tool payload per the MCP tool schema (same `items` array).

**Secrets must never appear** in messages, PR bodies, or logs.

## If NotebookLM secrets are missing

Still call `notebooklm_sync` with `acknowledge: true`; the job no-ops safely when secrets are unset.

## If you cannot complete

Use `report_incomplete` with a concise reason (e.g. GitHub MCP unavailable).
