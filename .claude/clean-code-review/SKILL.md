---
name: clean-code-review
description: Always run this skill alongside any other reviewing skill or code review action so clean-code heuristics get applied on every review, not just when explicitly requested. Produces inline, PR-style comments and favors pragmatic readability/maintainability feedback over strict rule enforcement that would slow down fast iteration.
---

# Clean Code Diff Review

Reviews **changed code** (a diff, a PR, a set of edited files) against a curated,
paraphrased subset of Robert C. Martin's _Clean Code_ heuristics, focused on
readability and "code as communication." Outputs inline, PR-style comments.

## Philosophy

- Optimize for **readability and maintainability**, not rule-purity. This is a
  linter for communication, not a style-police pass.
- Every comment should answer "why would a future reader/maintainer trip over
  this?" If you can't articulate that, don't post the comment.
- Prefer **fewer, higher-value comments** over exhaustively tagging every minor
  deviation. Bundle related nitpicks into one comment rather than one per line.
- Never block on subjective style preferences (brace placement, one-vs-two blank
  lines, etc.) unless the diff itself is internally inconsistent (see G11, G24).
- Default to a "should-fix" vs "nice-to-have" split (see Output Format) rather
  than pass/fail — this skill informs, it doesn't gate.

## Scope: what this skill does and doesn't cover

**Included** — the full "communication" subset: Comments (C1–C5), Functions
(F1–F4), General (G1–G22, G24–G36), Names (N1–N7), Tests (T1, T3, T5, T6, T9).

**Excluded on purpose**:

- **Environment (E1–E2)** — build/CI process concerns, not visible in a code diff.
- **Java-specific (J1–J3)** — import-wildcard style, constant inheritance, enum-
  vs-int; these only apply to Java and aren't "communication" issues in other
  languages.
- **G18 (Inappropriate Static)** and **G23 (Prefer Polymorphism to
  Switch/Case)** — these are OO-design-purity calls, not readability issues, and
  enforcing them strictly fights fast iteration. Mention only if the switch
  statement itself is genuinely hard to follow (which is really G16/G30/G34).

Full paraphrased descriptions of every included heuristic are in
`references/heuristics.md` — read it before doing a review so the heuristic
codes below actually mean something concrete.

## Process

1. **Get the diff.** If given a git diff, PR link, or explicit file set, use
   that. If asked to "review this code" with no diff specified, run `git diff`
   (or `git diff <base>...<head>` if a base branch/commit is identifiable) to
   scope the review to changed lines. Do not review the whole file/codebase —
   stay scoped to what changed, plus enough surrounding context to judge it.
2. **Read `references/heuristics.md`** if not already loaded this session.
3. **Walk the diff hunk by hunk.** For each hunk, check it against the included
   heuristic categories. Prioritize:
   - New/changed comments (C1–C5)
   - New/changed function signatures and bodies (F1–F4, G30, G34)
   - New/changed names (N1–N7)
   - New/changed tests, or missing tests for new logic (T1, T3, T5, T6, T9)
   - Structural smells in the diff (duplication, feature envy, dead code, magic
     numbers, etc. — the rest of General)
4. **Skip pre-existing issues** outside the diff unless they're directly
   adjacent to changed code and materially relevant to understanding the
   change (e.g., a variable being renamed inconsistently with a sibling that
   wasn't touched).
5. **Draft inline comments** (see format below), then do a pass to cut any
   comment that's purely a style nitpick with no real communication cost.
6. **Post a short summary line** at the end: rough count of should-fix vs
   nice-to-have, and a one-sentence overall read on the diff's clarity.

## Output Format

Inline, PR-style comments anchored to a file and line/range. For each finding:

```
**file:line** — [SHOULD-FIX | NICE-TO-HAVE] (HEURISTIC-CODE — short name)
<1-3 sentence explanation in plain language, referencing what a reader would
trip over — not just citing the rule.>
Suggestion: <brief, concrete fix — a rename, an extraction, a restructure.
Skip this line if the fix is genuinely just "use your judgment.">
```

Example:

```
**payroll.ts:42** — SHOULD-FIX (F3 — Flag Argument)
`calculatePay(employee, true)` — the `true` here silently switches between
overtime and straight-time math. A reader at the call site can't tell what it
means without opening the function.
Suggestion: split into `calculateOvertimePay(employee)` and
`calculateStraightPay(employee)`.

**payroll.ts:58** — NICE-TO-HAVE (G25 — Magic Number)
`rate * 1.5` — the 1.5 overtime multiplier isn't named. Low risk since it's
locally obvious, but a named constant would make it greppable.
```

Close with:

```
Summary: 2 should-fix, 3 nice-to-have. Overall the diff is readable; the main
friction point is the flag argument in calculatePay.
```

If the diff has **no findings worth raising**, say so briefly instead of
manufacturing comments — silence (or "looks clean") is a valid outcome.

## When combined with another review skill/workflow

If this skill is running as part of a larger review process (another skill or
agent already producing its own comments), integrate rather than duplicate:

- Don't repeat findings the other pass already flagged under a different
  framing — merge into one comment if you're looking at the same line.
- Keep your comments clearly attributable to a heuristic code so it's obvious
  which pass raised what, if the outputs get merged into one PR review.
