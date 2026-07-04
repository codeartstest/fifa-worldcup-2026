## Engineering Context

```json
{
  "Architecture Stack": [
    "NodeJS",
    "Angular",
    "Docker"
  ],
  "Repository": "codeartstest/fifa-worldcup-2026",
  "Jira Project": "SCRUM",
  "SonarCloud Org": "codeaartstest",
  "SonarCloud Project": "codeartstest_fifa-worldcup-2026",
  "JFrog Platform": "https://codeartsagentjfrog.jfrog.io"
}
```

---

# SDLC Agentic Flow — 9-Step Pipeline

## Pipeline Overview

```
Step 1: PM Agent — Requirement Breakdown (PRD + GitHub + Jira)
   │
   ├─→ Step 1b: Frontend/Backend Agent — Requirement Review (approve or flag gaps)
   │      │
   │      └─→ Step 2: PM Agent — Sprint Start & SDD Setup (Jira sprint + creating-sdd-directory skill)
   │             │
   │             └─→ Step 3: Frontend/Backend Agent — Development & Fix (Jira → In Progress)
   │                    │
   │                    └─→ Step 4: Code Reviewer Agent — Code Review (Semgrep MCP scan)
   │                           │
   │                           └─→ Step 5: Tester Agent — E2E Testing (Playwright skill)
   │                                  │
   │                                  └─→ Step 6: DevOps Engineer Agent — CI/CD (SonarCloud + build + JFrog upload via GitHub Actions)
   │                                         │
   │                                         └─→ Step 6b: DevOps Engineer Agent — JFrog Artifactory Verification
   │                                                │
   │                                                └─→ Step 7: PM Agent — Release Review (exclusive authority)
   │                                                       │
   │                                                       └─→ Step 8: PM Agent — Deployment on Huawei Cloud ECS
   │                                                              │
   │                                                              └─→ Step 9: PM Agent — Sprint Close & Retrospective
```

---

## Pipeline Progress (Current Run)

| Step | Status | Notes |
|------|--------|-------|
| 1. PM: Requirement Breakdown | ✅ Complete | PRD + 1 Epic (ES-24) + 7 Tasks (ES-25 to ES-31) |
| 1b. Frontend/Backend: Requirement Review | ✅ Complete | ES-29 flagged & updated, ES-30 updated |
| 2. PM: Sprint Start & SDD Setup | ✅ Complete | Sprint 134 active, 7 SDD dirs × 3 docs = 21 files |
| 3. Frontend/Backend: Development | ✅ Complete | All 7 features implemented, Jira → In Progress |
| 4. Code Reviewer: Semgrep Scan | ✅ Complete | 0 findings, all 7 tasks reviewed |
| 5. Tester: E2E with Playwright | ✅ Complete | 21 E2E test scenarios across 7 features, sign-off on all Jira tasks |
| 6. DevOps: CI/CD (SonarCloud+build+JFrog) | ✅ Complete | SonarCloud QG PASSED, build passed, artifacts uploaded |
| 6b. DevOps: JFrog Verification | ✅ Complete | Build #25 verified, 4 artifacts + 1 asset, Xray clean |
| 7. PM: Release Review | ✅ Complete | All 6 checks passed, ES-24 to ES-31 transitioned to Done |
| 8. PM: Huawei Cloud ECS Deployment | ⏭️ Skipped | No available host to deploy |
| 9. PM: Sprint Close & Retrospective | ✅ Complete | Sprint 134 closed, retrospective posted on ES-24 |

---

## Step Details

### Step 1: PM Agent — Requirement Breakdown
- **Owner**: PM Agent
- **Tools**: GitHub MCP, Jira MCP, PRD Skill
- **Actions**:
  1. Analyze GitHub repository structure
  2. Generate PRD via `prd` skill
  3. Break down requirements into Jira tasks with agent routing labels
  4. Link related issues (Blocks, Relates)
  5. Request requirement review from Frontend & Backend Agents via Jira comments
- **Output**: Jira tasks in "To Do" status with labels `agent:frontend`, `agent:backend`, etc.

### Step 1b: Frontend/Backend Agent — Requirement Review
- **Owner**: Frontend Agent, Backend Agent
- **Tools**: Jira MCP, GitHub MCP
- **Actions**:
  1. Receive review request from PM Agent via Jira comment
  2. Evaluate requirements from frontend/backend perspective (feasibility, completeness, API contracts, dependencies, estimates)
  3. If requirements are clear → comment `@agent:pm Review approved`
  4. If requirements need changes → comment `@agent:pm Review feedback: <issues>`
  5. PM Agent updates requirements based on feedback
- **Gate**: Both agents must approve before proceeding to Step 2
- **Error throwback**: If review flags issues, PM Agent revises requirements and re-requests review

### Step 2: PM Agent — Sprint Start & SDD Setup
- **Owner**: PM Agent
- **Tools**: Jira MCP, Bash (Jira Agile REST API), creating-sdd-directory skill
- **Actions**:
  1. Find Jira board ID via REST API: `GET /rest/agile/1.0/board`
  2. Create sprint via REST API: `POST /rest/agile/1.0/sprint`
  3. Add all issues to sprint via REST API: `POST /rest/agile/1.0/sprint/{id}/issue`
  4. Start sprint (set state to "active"): `PUT /rest/agile/1.0/sprint/{id}`
  5. Invoke `creating-sdd-directory` skill for each task to initialize spec-driven development
  6. Populate spec.md, design.md, tasks.md from Jira requirements
  7. Post SDD-complete comments on all Jira tasks
- **Output**: Active sprint with all issues, SDD directories created

### Step 3: Frontend/Backend Agent — Development & Fix
- **Owner**: Frontend Agent, Backend Agent
- **Tools**: GitHub MCP, Jira MCP, Bash (linters)
- **Actions**:
  1. **Transition Jira task to "In Progress"** (mandatory)
  2. Create feature branch, write code
  3. Run local linters (ESLint, Prettier, Ruff, mypy)
  4. Write unit/component/API tests
  5. Push and create PR
  6. **Transition Jira task to "In Review"**
  7. Comment `@agent:code-reviewer PR #X ready for review`

### Step 4: Code Reviewer Agent — Code Review
- **Owner**: Code Reviewer Agent
- **Tools**: Semgrep MCP, GitHub MCP (PR review), Jira MCP
- **Actions**:
  1. Fetch tasks in "In Review" status
  2. Read PR diff and changed files
  3. **Scan code locally with Semgrep MCP** (security, quality, best practices)
  4. Run `github_run_secret_scanning` for leaked secrets
  5. Submit GitHub PR review (APPROVE / REQUEST_CHANGES)
  6. If CRITICAL issues → REQUEST_CHANGES, transition Jira BACK to "In Progress"
  7. If approved → comment `@agent:devops Code review approved`

### Step 5: Tester Agent — E2E Testing (Playwright)
- **Owner**: Tester Agent
- **Tools**: playwright-cli skill, Jira MCP
- **Actions**:
  1. **Transition Jira task to "In Progress"**
  2. Write E2E test scenarios via `playwright-cli` skill
  3. Run E2E tests
  4. If tests fail → create bug in Jira, transition original task BACK to "In Progress"
  5. If tests pass → comment `@agent:devops E2E sign-off complete, ready for CI/CD`

### Step 6: DevOps Engineer Agent — CI/CD (GitHub Actions Manual)
- **Owner**: DevOps Engineer Agent
- **Tools**: GitHub MCP, Bash (PowerShell + GitHub API), Jira MCP, SonarCloud MCP
- **Includes**: SonarCloud scanning (Stage 1), build (Stage 2), JFrog upload (Stage 3)
- **Actions**:
  1. **Transition Jira task to "In Progress"**
  2. Verify/update GitHub Actions workflow (SonarCloud scan → build → JFrog upload on manual dispatch)
  3. **Manually trigger CI/CD** and **monitor workflow runs** — see `devops-agent.md` §5.3–5.4 for detailed PowerShell commands
  4. **SonarCloud Quality Gate check** (Stage 1): If QG fails → transition Jira BACK to "In Progress", comment `@agent:frontend` or `@agent:backend SonarCloud Quality Gate failed: <metric details>`
  5. If CI fails → identify failing job+step:
     - **Build/test error** (Stage 2 fails): transition Jira BACK to "In Progress", comment `@agent:frontend` or `@agent:backend Build/test failed at <step>: <error>`
     - **Pipeline config error** (Stage 1/3 fails, workflow YAML issue): DevOps self-fixes, re-trigger pipeline
  6. If CI passes (all 3 stages) → proceed to JFrog Artifactory verification (Step 6b)

### Step 6b: DevOps Engineer Agent — JFrog Artifactory Verification
- **Owner**: DevOps Engineer Agent
- **Tools**: JFrog MCP, Jira MCP, Bash (GitHub API)
- **NOTE**: Upload is handled by GitHub Actions pipeline. Agent only VERIFIES.
- **Actions**:
  1. **Build info**: `jfrog_artifactory_builds_list_build_runs` → find latest build number; cross-reference with GitHub Actions run number
  2. **Repository check**: `jfrog_artifactory_repositories_list` / `jfrog_artifactory_repositories_get` — verify repo exists, Xray indexed
  3. **Artifact inventory** (navigate folder by folder):
     - `jfrog_artifactory_storage_artifact_info(repo_key, item_path, list: true)` — list files at each level
     - Navigate: `angular-builds/` → `dev/` → `latest/` → `dist/` → `adesso-assessment/` → files + `assets/`
     - Verify key files: `index.html`, `favicon.ico`, `3rdpartylicenses.txt`, `assets/`
  4. **File details**: `jfrog_artifactory_storage_artifact_info(repo_key, item_path, stats: true)` — size, SHA, download count
  5. **Traceability**: Match JFrog upload timestamp to GitHub Actions Stage 3 completion time
  6. **Xray security scan**: `jfrog_artifactory_artifacts_get_summary` — check artifact security status
  7. If artifacts not found → check GitHub Actions secrets (JFrog credentials), re-trigger pipeline
  8. If Xray finds vulnerabilities → transition Jira BACK to "In Progress", comment `@agent:frontend` or `@agent:backend Xray vulnerability found: <details>`
  9. If all verified → proceed to Step 7 (Release Review)

### Step 7: PM Agent — Release Review (Exclusive)
- **Owner**: PM Agent (ONLY)
- **Tools**: Jira MCP, SonarCloud MCP, GitHub MCP
- **Actions**:
  1. Verify ALL tasks have Code Reviewer sign-off
  2. Verify ALL tasks have Tester E2E sign-off
  3. Verify SonarCloud Quality Gate passed (in CI/CD Step 6)
  4. Verify JFrog Artifactory artifacts are published and Xray-clean
  5. Verify CI/CD pipeline passed
  6. Verify no open bugs or security vulnerabilities
  7. If ALL checks pass → transition tasks to "Done", present to human for approval
  8. If ANY check fails → trigger error throwback to the failing step

### Step 8: PM Agent — Deployment on Huawei Cloud ECS (Exclusive)
- **Owner**: PM Agent (ONLY)
- **Tools**: Bash (SSH), Jira MCP
- **Actions**:
  1. Require human approval before deployment
  2. Pull Docker image from JFrog Artifactory registry
  3. SSH into Huawei Cloud ECS, deploy via docker-compose
  4. Verify deployment health check endpoint
  5. If deployment fails → rollback to previous image
   6. If deployment succeeds → comment `@agent:all Deployment complete`

### Step 9: PM Agent — Sprint Close & Retrospective
- **Owner**: PM Agent (ONLY)
- **Tools**: Bash (Jira Agile REST API), Jira MCP
- **Actions**:
  1. Verify ALL tasks are in "Done" status
  2. Close sprint via REST API: `PUT /rest/agile/1.0/sprint/{id}` with `state: "closed"`
  3. Generate sprint summary (completed vs. incomplete, velocity metrics)
  4. Post retrospective comment on Epic (ES-24)
  5. Archive SDD documents

---

## Error Throwback Protocol

See `pm-agent.md` — Error Throwback Protocol section for full details.

---

## Jira Status Lifecycle

See `pm-agent.md` — Jira Status Lifecycle section for full details.

---

## Jira Sprint Management (REST API)

See `pm-agent.md` §2.2 for sprint creation/management PowerShell commands.

---

## GitHub Actions Workflow Trigger (REST API)

See `devops-agent.md` §5.3–5.4 for auth setup, trigger, and monitoring commands.

---

## Agent Routing Labels, Domain Labels, Jira Comment Format, Jira Task Discovery JQL, Branch Naming Convention, PR Merge Gate

See `pm-agent.md` — these sections are defined there as the PM Agent owns agent coordination.

---

## Test Ownership

| Test Type | Owner | Tool |
|-----------|-------|------|
| Unit tests | Frontend/Backend Agent | Jest, Vitest, pytest |
| Component integration tests | Frontend Agent | Jest, Vitest |
| API unit tests | Backend Agent | pytest, Jest+Supertest, newman |
| E2E tests | Tester Agent (exclusive) | Playwright (playwright-cli skill) |

---

## Key Discoveries & Gotchas

1. **Jira API auth via Atlassian gateway only** — Jira API token does NOT work for direct REST API Basic Auth (`{cloudId}.atlassian.net` returns 401). Must use Atlassian API gateway (`api.atlassian.com/ex/jira/{cloudId}/rest/...`) with the MCP auth header from `mcp_settings.json`
2. **Adding issues to sprint via Jira MCP** — POST `/sprint/{id}/issue` returns 401 scope error via the API gateway. Instead, use `atlassian-rovo-mcp_editJiraIssue` with `customfield_10020: <sprint_id>` (number, not array) to set the Sprint field on each issue individually
3. **PowerShell syntax**: Use semicolons instead of `\n` for multi-statement commands; `&&` doesn't work in PowerShell
4. **SPA 404 limitation**: With `try_files $uri $uri/ /index.html`, Nginx always returns 200 — 404 for invalid routes must be handled client-side by Angular Router
5. **Angular 15 build**: Use `npx ng build --configuration=production`, NOT `npm run build --prod` (deprecated in Angular 15+)
6. **Semgrep MCP**: Can timeout in sandbox mode due to network restrictions; CLI fallback: `semgrep ci`
7. **npm install in sandbox**: Can timeout; may need non-sandbox mode for `npm ci` or `npm install`
8. **GitHub MCP lacks workflow dispatch**: Use `Invoke-RestMethod` with GitHub PAT from `.codeartsdoer/mcp/mcp_settings.json` to call `POST /repos/{owner}/{repo}/actions/workflows/main.yml/dispatches`
9. **Artifact upload breaks symlinks**: Splitting npm ci and npm run build into separate GitHub Actions jobs breaks `.bin` symlinks — keep install + build in the same job
10. **SonarCloud token ≠ GitHub PAT**: SonarCloud MCP requires a SonarCloud-specific token (from sonarcloud.io/account/security/), not a GitHub PAT
11. **SonarCloud Automatic Analysis conflicts with GitHub Actions**: If both are enabled simultaneously, the GitHub Actions workflow crashes with "You are running CI analysis while Automatic Analysis is enabled". To fix: go to SonarCloud → Project Dashboard → Administration → Analysis Method → turn OFF "SonarCloud Automatic Analysis" toggle. Requires Project Administrator permissions (org-level alone is insufficient). This must be done before triggering any CI/CD pipeline that includes a SonarCloud scan stage.