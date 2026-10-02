# Contributing

Open a skill request with the job, required inputs, expected result, and a fictional example. For a bug, include the file, client version, reproduction steps, and expected behavior. Read [AGENTS.md](AGENTS.md) before changing files.

Keep each pull request about one job. Add the skill, update its README entry and validator coverage, and run this command with Node.js 22 or later from the repository root:

```sh
node scripts/validate.mjs
```

Keep skill inputs, steps, output, approval boundary, and result checks explicit. Update the expected skill list when adding a folder.

## Style

- Write in active voice and sentence case.
- Use American English and plain words.
- Answer the heading in the first two sentences.
- Keep one idea per paragraph.
- Name the action, input, and result instead of an abstract benefit.
- Label fictional examples and link the source for factual claims.
- Cut sentences that add no information; end when the answer is complete.
- Avoid hype, emoji, exclamation marks, and em dashes.

Contributions use the [MIT license](LICENSE). Follow the [code of conduct](CODE_OF_CONDUCT.md); report vulnerabilities through [SECURITY.md](SECURITY.md).
