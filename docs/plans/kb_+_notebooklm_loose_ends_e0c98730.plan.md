---
name: KB + NotebookLM loose ends
overview: Close operational and validation gaps for the gh-aw workflow that regenerates KNOWLEDGE_BASE.md, opens deduplicated PRs on develop, and syncs KB/plan markdown to NotebookLM—without implementing repo changes in this phase.
todos:
  - id: infra-secrets
    content: "Human: Deploy notebooklm-mcp, network path to GHA, repo/org secrets per lock manifest, labels kb-bot + knowledge-base"
    status: pending
  - id: policy-merge
    content: "Human: Merge workflow to develop; align pre_activation roles + branch protection + merge ownership for [kb-bot] PRs"
    status: pending
  - id: e2e-validate
    content: "Shared: Execute numbered E2E plan; verify PR dedupe, notebooklm_sync logs/curl, NotebookLM UI; check GH_AW_GITHUB_EVENT_* in sync job"
    status: pending
  - id: playbook-backlog
    content: "Planning agent: First-run playbook for agent items JSON mismatches; document deferred plan auto-regenerate scope"
    status: pending
isProject: false
---

# Update knowledge base + NotebookLM — loose ends plan

## Executive summary

The workflow is defined in source [`.github/workflows/update-knowledge-base.md`](.github/workflows/update-knowledge-base.md) and compiled to [`.github/workflows/update-knowledge-base.lock.yml`](.github/workflows/update-knowledge-base.lock.yml); [`.gitattributes`](.gitattributes) marks `*.lock.yml` as generated with `merge=ours`. The lock manifest documents **eight** secret names (including gh-aw–specific tokens beyond the three NotebookLM vars). The workflow only runs on **`push` to `develop`** and **`workflow_dispatch`**, with **concurrency** `kb-bot-${{ github.repository }}-develop` and **`cancel-in-progress: true`**, which can cancel in-flight runs on rapid pushes. **`pre_activation`** gates execution on repo role membership (`admin`, `maintainer`, or `write` per `GH_AW_REQUIRED_ROLES`), so pushes from collaborators without those roles may **skip** the agent entirely—this must be aligned with who is allowed to trigger KB updates. The **`notebooklm_sync`** safe-output job runs on **`ubuntu-latest`** (not the gh-aw firewall stack) and performs **`curl`** to `NOTEBOOKLM_HTTP_BASE_URL`—so GitHub-hosted runners must reach your private MCP HTTP endpoint (VPN, Tailscale Funnel, reverse proxy, etc.). **First E2E should verify** that `GH_AW_GITHUB_EVENT_BEFORE` / `GH_AW_GITHUB_EVENT_AFTER` are actually defined in the **`notebooklm_sync`** job environment: the compiled lock file sets them on the **agent** job but the publish step’s `env` block only lists `NOTEBOOKLM_*` and `GH_AW_AGENT_OUTPUT`; if those variables are unset at runtime, `git diff-tree` / `git diff` behavior may be wrong or the step may fail under `set -euo pipefail`. Success means one sensible **`[kb-bot]`** PR when drift exists (per agent instructions + `max: 1` safe-output), **`noop`** when there is no net change, and NotebookLM sources updated for paths in the push diff under `KNOWLEDGE_BASE.md` and `docs/plans/*.md` only.

---

## Human checklist (dependency order, RACI tags)

**Infra (Human programmer)**

1. **[Human]** Deploy **`roomi-fields/notebooklm-mcp`** per upstream Docker/README (HTTP on **3000**, persistence **`/data`**, one-time Google auth via noVNC/setup-auth); **do not** expose noVNC without access controls.
2. **[Human]** Establish **network path** from **GitHub Actions** (`notebooklm_sync` uses **`ubuntu-latest`**) to `NOTEBOOKLM_HTTP_BASE_URL` (Tailscale sidecar, self-hosted runner in same network, HTTPS reverse proxy with auth, allowlisted egress, etc.).
3. **[Human]** Create/update **repository secrets** so names match the lock manifest (header in [`.github/workflows/update-knowledge-base.lock.yml`](.github/workflows/update-knowledge-base.lock.yml) lines 27–35 and JSON manifest line 2):
   - **`NOTEBOOKLM_HTTP_BASE_URL`** — base URL **without** trailing slash (script strips one `%/`; aligns with “no trailing slash” convention).
   - **`NOTEBOOKLM_NOTEBOOK_URL`** — full NotebookLM notebook URL for JSON field `notebook_url`.
   - **`NOTEBOOKLM_HTTP_TOKEN`** — optional; Bearer sent when non-empty.
   - **Gh-aw / GitHub automation tokens** (names from manifest): `COPILOT_GITHUB_TOKEN`, `GH_AW_CI_TRIGGER_TOKEN`, `GH_AW_GITHUB_MCP_SERVER_TOKEN`, `GH_AW_GITHUB_TOKEN`, plus default `GITHUB_TOKEN` behavior—configure per **org gh-aw / Copilot** documentation (exact provisioning is org-specific).
4. **[Human]** Ensure **GitHub labels** **`kb-bot`** and **`knowledge-base`** exist on the repo (safe-output applies them to automation PRs; missing labels can break PR creation depending on API behavior).

**GitHub / repo policy (Human programmer)**

5. **[Human]** Merge workflow artifacts to **`develop`** when policy allows: [`.github/workflows/update-knowledge-base.md`](.github/workflows/update-knowledge-base.md), [`.github/workflows/update-knowledge-base.lock.yml`](.github/workflows/update-knowledge-base.lock.yml), [`.gitattributes`](.gitattributes) line for `*.lock.yml`.
6. **[Human]** Confirm **`pre_activation`** membership rules: only **`admin` / `maintainer` / `write`** triggers full workflow; decide whether KB updates must be limited to those roles or adjust org/repo policy if broader triggers are required (**product/org decision**).
7. **[Human]** **Branch protection / reviews**: confirm automation PRs from **`github-actions[bot]`** (or configured identity) can be merged under team rules; document **who merges** `[kb-bot]` PRs and how conflicts with `automations/knowledge-base` are handled.
8. **[Human]** For **plan upload** coverage in tests, ensure **`docs/plans/`** exists with at least one **`.md`** file included in a **develop** push (otherwise NotebookLM only sees KB when only `KNOWLEDGE_BASE.md` changes).

**Validation design (Shared: human executes, Planning agent specs)**

9. **[Shared]** Run **first E2E** using the numbered test plan below; capture **Actions logs** for `agent`, `safe_outputs`, and **`notebooklm_sync`**.
10. **[Planning agent backlog spec]** If agent **`items`** JSON does not match runtime (wrong types, missing `notebooklm_sync`, duplicate tools), document **exact log excerpts** (parsed safe-output handler, schema errors) and whether the fix belongs in the **`.md` body instructions**, **frontmatter** (`safe-outputs`, `notebooklm-sync` job), or **recompile** (`gh aw compile`).

**Optional backlog (Planning agent — document only)**

11. **[Planning agent]** **First-run playbook**: steps to capture `agent_output.json` / safe-output artifacts, compare to expected `items` shape from [`.github/workflows/update-knowledge-base.md`](.github/workflows/update-knowledge-base.md) (lines 191–201).
12. **[Planning agent]** **Deferred product scope** (no work unless requested): auto-regenerate stale `docs/plans/*.md` when drift vs repo is detected—the current workflow **by design** only uploads plans that **changed in the push diff** ([`.github/workflows/update-knowledge-base.md`](.github/workflows/update-knowledge-base.md) lines 164–169).

**Explicitly out of scope (per your constraints)**

- No **repository-variable**-based configurable plan root; convention stays **`docs/plans/*.md`** until humans edit the **`notebooklm-sync`** `grep` / `PLANS_ROOT` in frontmatter and recompile.

---

## Validation / test plan (first E2E on GitHub)

1. **Preconditions**: Secrets set (at minimum NotebookLM three + gh-aw tokens per org); labels exist; `notebooklm-mcp` reachable from GitHub’s network path; workflow merged on **`develop`**.
2. **Trigger A — No drift**: Push to **`develop`** that does **not** change `KNOWLEDGE_BASE.md` or `docs/plans/*.md`. **Expect**: Agent may **`noop`** for PR; **`notebooklm_sync`** runs but log shows **“No … changes in this push; nothing to upload.”** (no `curl` to MCP for content).
3. **Trigger B — KB drift only**: Change product signals or KB content so regenerated KB differs from `develop` HEAD; agent should open **one** PR: title **`[kb-bot]`** prefix, labels **`kb-bot`** + **`knowledge-base`**, base **`develop`**, branch per safe-output (`preserve-branch-name`, **`automations/knowledge-base`** per instructions). **Expect**: `safe_outputs` **processed_count** / PR URL outputs; no second open duplicate if instructions followed (agent searches open PRs).
4. **Trigger C — Plans in diff**: Include a change under **`docs/plans/*.md`** in the same or a follow-up push to **`develop`**. **Expect**: **`notebooklm_sync`** logs list upserts with **titles** = basename for plans, **`KNOWLEDGE_BASE.md`** for root KB; **`curl`** exit **0**; response snippet (first 2000 chars) non-empty JSON if API returns body.
5. **NotebookLM UI**: Open the target notebook; confirm **sources** appear or update for **`KNOWLEDGE_BASE.md`** and changed plan titles; spot-check **text** matches repo after merge.
6. **`workflow_dispatch`**: Run manually from Actions UI; confirm same **activation** path and that **`github.event.before`/`after`** semantics still produce sensible diff behavior for dispatch (document if dispatch uses empty SHAs—**open question** if behavior differs from `push`).
7. **Failure injection (staging)**:
   - Wrong **`NOTEBOOKLM_HTTP_TOKEN`**: expect **401** on `POST`, non-zero exit from `curl -f` → step **fails** (job failure).
   - Unreachable **base URL**: **timeout** / connection refused → fail.
   - Missing **`NOTEBOOKLM_HTTP_BASE_URL`** or **`NOTEBOOKLM_NOTEBOOK_URL`**: expect **skip** message and **exit 0** (by design).
8. **Critical compile/runtime check**: In **`notebooklm_sync`** logs, confirm **`GH_AW_GITHUB_EVENT_BEFORE`** / **`AFTER`** are populated (or diff command uses correct SHAs). If unset or wrong, treat as **blocker**: adjust source frontmatter so the compiled job exports `${{ github.event.before }}` / `${{ github.event.after }}` into the publish step env, then **`gh aw compile`**—document in playbook.

---

## Risks / rollback

| Risk                                      | Mitigation / rollback                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Duplicate automation PRs**              | Agent instructed to search open `[kb-bot]` + labels; **`max: 1`** on `create_pull_request`; human closes superseded PRs; **`concurrency` + cancel-in-progress** can abort runs—avoid burst pushes to `develop` during testing.                                                                         |
| **Missing labels**                        | Create **`kb-bot`** and **`knowledge-base`** before relying on automation.                                                                                                                                                                                                                             |
| **Unreachable MCP URL**                   | Fix network path or use self-hosted runner in same LAN; rollback = disable secrets to force **skip** (no publish) while keeping PR path.                                                                                                                                                               |
| **Auth failures**                         | Align Bearer token with server config; rotate secret.                                                                                                                                                                                                                                                  |
| **Agent output / `items` shape mismatch** | Capture **`agent`** artifact and safe-output logs; fix instructions or tool list; recompile lock.                                                                                                                                                                                                      |
| **`pre_activation` false**                | Workflow appears “skipped” or agent never runs—grant appropriate repo role or adjust gh-aw policy with org admin.                                                                                                                                                                                      |
| **Protected paths / files**               | Safe-output config includes **`protected_path_prefixes`** `.github/`, `.agents/` and **`protected_files`** including **`AGENTS.md`** ([`GH_AW_SAFE_OUTPUTS_HANDLER_CONFIG`](.github/workflows/update-knowledge-base.lock.yml) ~1367)—automation PRs cannot modify those; KB-only changes remain valid. |
| **Merge conflicts on long-lived branch**  | Human resolves on **`automations/knowledge-base`** or resets branch per team process.                                                                                                                                                                                                                  |

---

## Open questions (blockers / org decisions)

1. **Who may trigger** the workflow given **`pre_activation`** requires **`admin`/`maintainer`/`write`** on the repository?
2. **`workflow_dispatch`**: Does `github.event.before` / `after` behave like **`push`** for diff purposes, or should dispatch tests use a **push**-only validation path?
3. **NotebookLM source identity**: Is **DELETE by `source_name`** + **POST** (current script) acceptable for concurrent notebooks, or does the team need a naming convention to avoid collisions across environments?
4. **Gh-aw secrets**: Which of `COPILOT_GITHUB_TOKEN`, `GH_AW_*` are **auto-injected** by GitHub vs must be **manually** created at repo/org level for this org?
