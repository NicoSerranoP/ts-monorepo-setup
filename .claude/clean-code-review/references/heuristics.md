# Clean Code Heuristics Reference

Paraphrased from Robert C. Martin's _Clean Code_ heuristics appendix, filtered to the
"code as communication" subset. Java-specific rules and the switch/polymorphism-strict
rule are intentionally omitted — see SKILL.md for the exclusion list.

Each entry: **CODE — Name**: what to look for, and why it matters for a human reader.

## Comments

- **C1 — Inappropriate Information**: Comments holding metadata that belongs in git history,
  issue trackers, or changelogs (authors, dates, ticket numbers). Flag comments that are
  really record-keeping, not technical notes about the code.
- **C2 — Obsolete Comment**: A comment that no longer matches the code it sits next to.
  Flag when a comment describes behavior that the diff has changed or removed.
- **C3 — Redundant Comment**: A comment that just restates what the code already says
  clearly (`i++; // increment i`, or Javadoc that repeats the signature). Flag these as
  noise.
- **C4 — Poorly Written Comment**: A comment worth having is worth writing well —
  grammatical, concise, not rambling, not stating the obvious.
- **C5 — Commented-Out Code**: Dead code left commented out "just in case." Always flag —
  source control remembers it, the comment doesn't need to.

## Functions

- **F1 — Too Many Arguments**: Prefer 0–2 arguments; 3+ is questionable. Suggest bundling
  related arguments into an object or splitting the function.
- **F2 — Output Arguments**: Arguments that get mutated to return a result are
  counterintuitive — readers expect arguments to be inputs. Suggest returning a value or
  mutating `this`/self instead.
- **F3 — Flag Arguments**: A boolean parameter that switches behavior is a sign the function
  does two things. Suggest splitting into two clearly named functions.
- **F4 — Dead Function**: A function/method that's never called anywhere. Flag for removal.

## General

- **G1 — Multiple Languages in One File**: Minimize mixing languages (SQL strings, HTML,
  embedded config) inside a single source file when it hurts readability.
- **G2 — Obvious Behavior Unimplemented**: A function's name implies behavior that isn't
  actually there (principle of least surprise violated).
- **G3 — Incorrect Behavior at Boundaries**: Missing handling/tests for edge cases and
  corner cases the change clearly touches.
- **G4 — Overridden Safeties**: Disabled tests, suppressed warnings, or bypassed checks
  introduced to make the build pass.
- **G5 — Duplication**: Repeated logic (copy-pasted blocks, repeated conditionals, similar
  algorithms) that could be extracted into a shared abstraction.
- **G6 — Wrong Level of Abstraction**: Low-level detail leaking into a high-level
  class/interface, or vice versa.
- **G7 — Base Class Depends on Derivatives**: A base class/interface referencing or knowing
  about its subclasses.
- **G8 — Too Much Information**: An interface/class exposing more methods, fields, or
  surface area than callers actually need. Suggest narrowing it.
- **G9 — Dead Code**: Unreachable branches, code behind conditions that can never be true,
  unused catch blocks.
- **G10 — Vertical Separation**: Variables/private helpers declared far from where they're
  used, forcing the reader to jump around.
- **G11 — Inconsistency**: Same concept named or handled differently in different places
  within the diff (e.g. `resp` vs `response`, or inconsistent error-handling style).
- **G12 — Clutter**: Unused variables, empty constructors, dead imports, comments that add
  nothing.
- **G13 — Artificial Coupling**: Two things placed together (constant in a class, enum
  nested in an unrelated type) with no real dependency between them.
- **G14 — Feature Envy**: A method that mostly reaches into another object's data/getters
  instead of operating on its own class's data.
- **G15 — Selector Arguments**: A trailing boolean/enum argument that silently switches
  which of several behaviors a function performs.
- **G16 — Obscured Intent**: Dense one-liners, unexplained abbreviations, or magic numbers
  that hide what the code is doing.
- **G17 — Misplaced Responsibility**: Code placed somewhere a reader wouldn't intuitively
  look for it, based on naming/conventions.
- **G19 — Use Explanatory Variables**: A complex expression that would be clearer if broken
  into well-named intermediate variables.
- **G20 — Function Names Should Say What They Do**: A name that doesn't tell you whether
  the function mutates state, what unit it operates in, or what it returns.
- **G21 — Understand the Algorithm**: Code that clearly works by trial-and-error (a pile of
  ad hoc conditionals) rather than a deliberate, understood approach.
- **G22 — Make Logical Dependencies Physical**: A module assumes something about another
  module (a size limit, a format) without asking for it explicitly — should be passed in or
  queried instead of assumed.
- **G24 — Follow Standard Conventions**: Deviations from the codebase's existing style
  (brace placement, naming pattern, file layout) with no stated reason.
- **G25 — Replace Magic Numbers with Named Constants**: Raw numeric/string literals whose
  meaning isn't self-evident from context.
- **G26 — Be Precise**: Sloppy precision — unchecked nulls, floating point for money,
  assumptions about single results from a query, unhandled concurrency.
- **G27 — Structure over Convention**: Where a real invariant exists, prefer a structural
  enforcement (abstract method, type system) over a naming convention that can be violated.
- **G28 — Encapsulate Conditionals**: A boolean expression inline in an `if`/`while` that
  would be clearer extracted into a well-named function.
- **G29 — Avoid Negative Conditionals**: `if (!x.shouldNotDoY())` style double-negatives.
  Prefer the positive phrasing.
- **G30 — Functions Should Do One Thing**: A function with multiple distinct
  responsibilities glued together (loop + condition + action all inline).
- **G31 — Hidden Temporal Couplings**: Functions/methods that must be called in a specific
  order, but nothing in their signatures makes that order visible or enforced.
- **G32 — Don't Be Arbitrary**: Structural choices with no discernible reason, inviting
  future inconsistency.
- **G33 — Encapsulate Boundary Conditions**: Repeated `+1`/`-1` boundary math scattered
  around instead of captured once in a named variable.
- **G34 — Functions Should Descend One Level of Abstraction**: A function mixing a
  high-level concept with low-level syntax/details in the same body.
- **G35 — Keep Configurable Data at High Levels**: Defaults/config constants buried deep in
  low-level functions instead of exposed near the entry point.
- **G36 — Avoid Transitive Navigation**: Chains like `a.getB().getC().doSomething()` that
  leak knowledge of the whole object graph to a caller that should only know `a`.

_(G18 "Inappropriate Static" and G23 "Prefer Polymorphism to If/Else" are skipped per the
strictness exclusions below — they lean into OO-design-purity territory that's out of scope
for this skill.)_

## Names

- **N1 — Choose Descriptive Names**: Cryptic single-letter or abbreviated names for
  anything beyond a tiny loop scope.
- **N2 — Names at the Right Level of Abstraction**: A name that leaks implementation detail
  (e.g. `phoneNumber` for something that's really a generic "connection identifier").
- **N3 — Use Standard Nomenclature**: Ignoring established patterns/vocabulary already used
  in the codebase or language ecosystem (e.g. not naming a decorator-pattern class with
  "Decorator").
- **N4 — Unambiguous Names**: A name so generic it could mean several different things
  (`doRename` when there's also a nested `renamePage`).
- **N5 — Use Long Names for Long Scopes**: Short/cryptic names surviving across a large
  scope where they lose meaning; conversely, don't over-elaborate names in tiny scopes.
- **N6 — Avoid Encodings**: Hungarian-notation-style prefixes (`m_`, `str`, `vis_`) that
  modern tooling makes unnecessary.
- **N7 — Names Should Describe Side Effects**: A name like `getX()` that actually creates
  or mutates state, not just retrieves it.

## Tests

- **T1 — Insufficient Tests**: Obvious untested branches/conditions/edge cases in the diff.
- **T3 — Don't Skip Trivial Tests**: Easy, cheap-to-write tests that were left out even
  though they'd document expected behavior.
- **T5 — Test Boundary Conditions**: Off-by-one and edge-of-range cases not covered.
- **T6 — Exhaustively Test Near Bugs**: If the diff is a bugfix, check that nearby/similar
  cases got test coverage too, not just the one reported case.
- **T9 — Tests Should Be Fast**: New tests that are slow (real network calls, large sleeps,
  heavy I/O) risk getting skipped or deleted later.

_(T2, T4, T7, T8 are about tooling/process rather than something visible in a diff, so they
rarely produce an inline comment — mention them only if directly relevant.)_
