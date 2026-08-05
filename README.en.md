<div align="center">

# super-pm — Product Manager Skills Pack

**Empowering every product manager to work efficiently** ☕️ 📺 🚀

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-≥2.0.0-orange.svg)](https://claude.ai/code)
[![GitHub Stars](https://img.shields.io/github/stars/konglong87/super-pm)](https://github.com/konglong87/super-pm)
[![Skills](https://img.shields.io/badge/skills-49-informational)](./skills/INDEX.md)

</div>

---

## 📖 About

**super-pm** is a comprehensive Product Manager Skill Pack for Claude Code, Cursor, Codex, and OpenCode. It provides full lifecycle product management workflow support through **49 battle-tested skills** across **7 modules**.

### Key Features

- ✅ **49 skills** — Covering demand insight, solution design, growth iteration, risk management, product strategy, career development, and expert perspectives
- ✅ **6 chain workflows** — Predefined multi-step commands for common PM scenarios
- ✅ **Lightweight** — Pure Markdown instructions, zero code dependencies
- ✅ **Smart interaction** — One question at a time, step-by-step guidance
- ✅ **Data flow** — Markdown documents auto-propagate between skills, human-readable
- ✅ **Risk-first** — Validate assumptions early, avoid wasted effort
- ✅ **Graceful fallbacks** — Error handling, cross-session recovery, flexible skipping

---

## 🚀 Quick Start

### One-line Install

```bash
npx skills add https://github.com/konglong87/super-pm
```

| Command | Description |
|---------|-------------|
| `npx skills add https://github.com/konglong87/super-pm` | Install all skills |
| `npx skills add https://github.com/konglong87/super-pm --skill "pm-demand"` | Install a single skill |
| `npx skills add https://github.com/konglong87/super-pm --list` | List available skills |
| `npx skills add https://github.com/konglong87/super-pm -g` | Global install |
| `npx skills add https://github.com/konglong87/super-pm --agent claude-code cursor` | Platform-specific install |

### Claude Code (Recommended ⭐ — Marketplace)

```
/plugin marketplace add konglong87/super-pm
/plugin install super-pm@super-pm-marketplace
```

### OpenCode (macOS/Linux)

```bash
git clone https://github.com/konglong87/super-pm.git ~/.config/opencode/super-pm
mkdir -p ~/.config/opencode/skills && ln -s ~/.config/opencode/super-pm/skills ~/.config/opencode/skills/super-pm
```

### Codex (macOS/Linux)

```bash
git clone https://github.com/konglong87/super-pm.git ~/.codex/super-pm
mkdir -p ~/.agents/skills && ln -s ~/.codex/super-pm/skills ~/.agents/skills/super-pm
```

### Cursor (macOS/Linux)

```bash
git clone https://github.com/konglong87/super-pm.git ~/.cursor/super-pm
mkdir -p ~/.cursor/skills && ln -s ~/.cursor/super-pm/skills ~/.cursor/skills/super-pm
```

### Windows (PowerShell)

```powershell
# Claude Code (Recommended — Marketplace)
/plugin marketplace add konglong87/super-pm
/plugin install super-pm@super-pm-marketplace

# OpenCode
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.config\opencode\super-pm"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\skills"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.config\opencode\skills\super-pm" -Target "$env:USERPROFILE\.config\opencode\super-pm\skills"

# Codex
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.codex\super-pm"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\super-pm" "$env:USERPROFILE\.codex\super-pm\skills"

# Cursor
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.cursor\super-pm"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.cursor\skills"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.cursor\skills\super-pm" -Target "$env:USERPROFILE\.cursor\super-pm\skills"
```

---

## 🛤️ Chain Workflows

Six chain commands automate multi-step PM processes. Each step pauses for your confirmation — you can skip any step.

| Command | Description | Chain |
|---------|-------------|-------|
| `/discover` | Product discovery | Market → Competitor → Demand → Priority |
| `/write-prd` | Write PRD | Demand → Clarify → MVP → Docs |
| `/plan-launch` | Launch planning | Release → Risk → Cross-team → Agile |
| `/analyze-growth` | Growth analysis | AARRR → Report → Growth → Iteration |
| `/define-strategy` | Product strategy | Position → Business Model → OKR → Roadmap |
| `/validate-idea` | Idea validation | Demand → Brainstorm → Market → MVP |

---

## 🗺️ Golden Paths

### Path A: New Product from Zero to One (Most Common ⭐)

```
/discover → /write-prd → /plan-launch
```

Or step by step:
```
/pm-brainstorm → /pm-demand → /pm-market → /pm-priority → /pm-mvp → /pm-docs → /pm-tech → /pm-release
```

### Path B: Existing Product Growth

```
/analyze-growth
```

### Path C: Strategic Decision

```
/define-strategy
```

---

## 📊 Skill Catalog (49 skills)

### Demand Insight (11 skills)

| Skill | Description |
|-------|-------------|
| `/pm-brainstorm` | Brainstorming — diverge then converge, with inspiration spark mode |
| `/pm-demand` | Demand validation — systematic pain point analysis |
| `/pm-clarify` | Requirement clarification — define details and edge cases |
| `/pm-market` | Market analysis — competitive and industry research |
| `/pm-search` | Online research — market/competitor/data/sentiment/compliance |
| `/pm-priority` | Prioritization — RICE/KANO/MoSCoW models |
| `/pm-mvp` | MVP scoping — minimum viable product definition |
| `/pm-pool` | Backlog management |
| `/pm-journey` | User journey mapping |
| `/pm-competitor` | Competitor monitoring — ongoing tracking with anomaly alerts |
| `/pm-interview` | User interview — qualitative research design and execution |

### Solution Design (9 skills)

| Skill | Description |
|-------|-------------|
| `/pm-docs` | Document generation (BRD/MRD/PRD) |
| `/pm-proto` | Prototyping guidance |
| `/pm-brand-motion` | Brand motion design with demo HTML |
| `/pm-tech` | Technical feasibility analysis |
| `/pm-feature` | Feature detail breakdown |
| `/pm-data` | Data metrics framework |
| `/pm-position` | Product positioning |
| `/pm-user-story` | User story writing |
| `/pm-prd-review` | PRD/BRD/MRD review — completeness, feasibility, risk |

### Growth Iteration (10 skills)

| Skill | Description |
|-------|-------------|
| `/pm-aarrr` | AARRR growth analysis |
| `/pm-growth` | Growth strategy |
| `/pm-report` | Data reports (weekly/monthly/quarterly) |
| `/pm-feedback` | User feedback analysis |
| `/pm-abtest` | A/B test design |
| `/pm-iteration` | Iteration planning |
| `/pm-retro` | Iteration retrospective |
| `/pm-roadmap` | Product roadmap |
| `/pm-geo` | GEO / AI search optimization |
| `/pm-okr` | OKR goal management |

### Risk Management (5 skills)

| Skill | Description |
|-------|-------------|
| `/pm-agile` | Agile management |
| `/pm-cross` | Cross-team collaboration |
| `/pm-risk` | Risk management |
| `/pm-release` | Launch execution plan |
| `/pm-change` | Requirement change management |

### Product Strategy (5 skills)

| Skill | Description |
|-------|-------------|
| `/pm-business-model` | Business model canvas |
| `/pm-decision` | Strategic decision support |
| `/pm-funnel` | Funnel analysis |
| `/pm-portfolio` | Product portfolio management (BCG matrix) |
| `/pm-resource` | Resource allocation and ROI |

### Career Development (3 skills)

| Skill | Description |
|-------|-------------|
| `/pm-career-coach` | Career coach — junior to director level guidance |
| `/pm-interview-prep` | Interview preparation — product sense, execution, behavioral, strategy |
| `/pm-resume` | Resume optimization — STAR + metrics + ATS-ready |

### Expert Perspectives (1 skill)

| Skill | Description |
|-------|-------------|
| `/steve-jobs-perspective` | Steve Jobs thinking and expression DNA — conversational advisor |

### Tools (5 skills)

| Skill | Description |
|-------|-------------|
| `start-super-pm` | Entry point — auto-detect task type and route |
| `super-pm-upgrade` | Version upgrade tool |
| `/pm-preview` | Live document preview |
| `/pm-selfcheck` | Health check for skill pack integrity |
| `/super-pm` | Root entry — keyword semantic router plus flow recommendation engine |

---

## 💡 Inspiration Spark Mode ⭐

When you don't know what product to build, let AI spark inspiration!

Just run `/pm-brainstorm` and select **E) Inspiration Spark Mode**. The AI will search across 4 dimensions (industry pain points, tech trends, life scenarios, cross-domain inspiration) and generate 10 product ideas.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

**PM-Skills Team** © 2026
