# Tech stack upgrade

## Process

### Starting prompt

```txt
Claude, this is a fairly old app. It's essentially a static website where staff can go to generate email signatures

Let's modernise this by:

  - Converting it from JS to TS for typesafety
  - Review how it currently works and which packages or tech it stands on
  - Decide an upgrade path that maintains the functionality, and uses modern packages and tech
  - Use modern security practices, such as pinning GitHub actions to the latest SHAs, and ensuring dependencies are up to date with no known vulnerabilities
  - Ensure you use the web to fact check your knowledge about the latest versions of packages and tech

If any paths have multiple choices, ask me questions to resolve the ambiguity. Otherwise, just go ahead and plan the changes you think are best.

Let's ultrathink this one through and make sure we have a solid plan before we start coding.
```

### Questions and Answers

- Styling (MUI v7, Tailwind v4, Bulma V1, Keep Bulma + MUI mix)? MUI v7
- State management (React hook form, Zustand, Keep redux)? React hook form
- React version? (19, Keep 18)? React 19
- Refactor scope? (Modernise + Tidy, Minimal JS to TS and Deps, Deep refactor)? Modernise + Tidy

### Plan review

```txt
Using subagents (with the sonnet model), execute the following reviews aginst this plan:

  - Review from the perspective of a security engineer. Are there any security implications or considerations that need to be addressed?
  - Review from the perspective of a performance engineer. Are there any performance implications or considerations that need to be addressed?
  - Review from the perspective of a user experience (UX) designer. Are there any UX implications or considerations that need to be addressed?
  - Review from the perspective of a maintainability engineer. Are there any maintainability implications or considerations that need to be addressed?
  - Review for correctness and completeness. Are there any technical inaccuracies, missing steps, regressions, or potential issues that need to be addressed?

Combine the results into a single report and break it down by must action, should action, and could action. Any result findings you don't agree with, list them at the end with an explanation of why you disagree.

Update the plan to include all MUST and SHOULD actions. Include any COULD actions that would improve the overall quality and value.

Ask me questions to resolve any ambiguity or uncertainty.
```

### Process the results

```txt
Update the plan to include all MUST and SHOULD actions. Include any COULD actions that would improve the overall quality and value.
```

### Exit plan mode and execute the plan

### Post review

Things are need to address:

1. Pin the GitHub actions to the latest SHAs (Security)
