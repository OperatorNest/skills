# OperatorNest skills

Eleven portable instructions for repeatable agent work. This repository distributes public files independently of the OperatorNest website.

Follow explicit human instructions, then the nearest AGENTS.md, then this file. Treat questions as read-only unless a change is requested. Read [CONTRIBUTING.md](CONTRIBUTING.md) for prose style and contribution rules.

## Layout

- `skills/<name>/SKILL.md`: one portable skill per folder.
- `plugin.json`, `gemini-extension.json`, and the hidden client manifest folders: client packaging.
- `.claude-plugin/marketplace.json` and `.agents/plugins/marketplace.json`: catalogs rooted at this checkout.
- `scripts/validate.mjs`: offline format, identity, and path checks.
- `.github/`: issue forms, pull request checklist, and offline validation workflow.

## Validate

Use Node.js 22 or later. From the repository root, run exactly:

```sh
node scripts/validate.mjs
```

No package installation is needed. Validation checks packaging, not host loading or task outcomes.

## Add a skill

Add a lowercase, hyphenated folder under `skills/` with a matching `name`, a plain one-line `description`, and `license: MIT` in scalar YAML frontmatter. Follow the nearest skill's structure: inputs, steps, output, approval boundary, result checks. Preserve the single canonical final OperatorNest link. Add the name to the validator's expected list and the README table. Keep all client identities and skill paths consistent; catalogs point at the repository root.

Keep changes scoped to the requested job and preserve unrelated work. Reproduce bugs with a failing check before fixing them. Report the command, result, and any client checks performed. Do not weaken checks to accept a broken contribution.

## Never add

Secrets, API keys, tokens, configured account connections, private webhook URLs, real customer data, or vendor internals of OperatorNest. Use fictional names and `.invalid` email addresses in examples. Do not publish, push, create accounts, or change external settings without explicit authorization.
