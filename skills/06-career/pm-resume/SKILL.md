---
name: pm-resume
description: |
  PM Resume Optimization — analyze, improve, and tailor your PM resume for specific roles
  Use when: Updating your PM resume, tailoring for a specific role, or getting feedback on your resume
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

This skill helps you:
1. **Analyze** your current resume for PM-specific strengths and gaps
2. **Improve** bullet points using STAR + metrics framework
3. **Tailor** your resume for specific roles and companies
4. **Format** for ATS (Applicant Tracking System) compatibility

---

## Execution Flow

### Step 1: Input Resume

Ask the user to paste their current resume or describe their experience.

Use AskUserQuestion:

> How would you like to start?
>
> A) Paste my current resume for analysis
> B) Describe my experience and get a template
> C) Optimize for a specific role/company
> D) Get tips and best practices for PM resumes

### Step 2: Analysis & Improvement

For each bullet point, apply the PM resume framework:
- **What** (action) + **How** (method) + **Impact** (metric)
- Use strong action verbs: led, launched, drove, defined, improved
- Quantify results: increased by X%, reduced by Y%, impacted Z users

### Step 3: Generate Optimized Resume

Write the improved resume to `docs/06-职业发展/优化简历.md`.

### Step 4: Recommended Next Steps

1. /pm-interview-prep — Prepare for interviews
2. /pm-career-coach — Career planning
3. Re-run this skill for a different role
