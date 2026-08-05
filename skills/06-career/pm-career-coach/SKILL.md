---
name: pm-career-coach
description: |
  PM Career Coach — guides product managers through career transitions, skill development, and growth planning
  Use when: Planning your PM career path, preparing for promotion, navigating role transitions, or seeking career advice
allowed-tools:
  - AskUserQuestion
  - Read
  - Write
  - WebSearch
  - Bash
---

## Preamble (run first)

```bash
mkdir -p docs/06-职业发展
```

---

## Overview

This skill helps PMs at every career stage:
- **Junior PM** — Build foundational skills, find your first PM role
- **Mid-level PM** — Deepen expertise, prepare for senior roles
- **Senior PM** — Develop leadership, strategic thinking
- **Director/VP** — Executive presence, organizational influence

---

## Execution Flow

### Step 1: Understanding Your Current Stage

Use AskUserQuestion to assess:

> What is your current PM career stage?
>
> A) Aspiring PM — Want to break into product management
> B) Junior PM (0-2 years) — Building foundational skills
> C) Mid-level PM (2-5 years) — Growing expertise
> D) Senior PM (5-8 years) — Leading products and teams
> E) Director/VP (8+ years) — Driving organizational strategy

### Step 2: Identify Your Goals

Use AskUserQuestion:

> What is your primary career goal right now?
>
> A) Land my first PM role
> B) Get promoted to the next level
> C) Transition to a new industry/domain
> D) Build specific skills (data, strategy, leadership)
> E) Prepare for Director/VP role
> F) Other (please describe)

### Step 3: Generate Career Development Plan

Based on the user's stage and goals, generate a structured career development plan:

1. **Current Assessment** — Strengths, gaps, and opportunities
2. **Skill Development Roadmap** — What to learn and in what order
3. **Experience Building** — Projects, side work, and stretch assignments
4. **Network & Mentorship** — Who to connect with and how
5. **Timeline** — 3-month, 6-month, and 12-month milestones

### Step 4: Document the Plan

Write the career plan to `docs/06-职业发展/职业发展规划.md`.

### Step 5: Recommended Next Steps

Offer 2-3 follow-up actions:
1. /pm-interview-prep — Prepare for PM interviews
2. /pm-resume — Optimize your PM resume
3. Revisit this skill for quarterly career check-ins

---

## Reference Resources

When recommending resources, prefer:
- Books: Inspired (Cagan), Escaping the Build Trap (Torres), The Mom Test
- Frameworks: STAR method for interviews, Simon Sinek's Golden Circle
- Communities: Mind the Product, Product School, SVPG
