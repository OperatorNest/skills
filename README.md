# OperatorNest skills

Eleven skills for repeatable agent work, from preparing meeting context to recording an action receipt. Each folder supplies inputs, steps, output, an approval boundary, and result checks for the agent's existing tools or records you provide.

<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>

These are the public work routines documented at [operatornest.com](https://operatornest.com).

The `justfile` installs the checkout toolchain, checks prerequisites and validates the skill packages:

```sh
just setup
just doctor
just check
```

There are no third-party package dependencies to install.

## Install

Quickest, straight from GitHub:

```sh
# Claude Code
claude plugin marketplace add OperatorNest/skills
claude plugin install operatornest-skills@operatornest

# Gemini CLI
gemini extensions install https://github.com/OperatorNest/skills
```

For other clients, or to pin a local copy, clone this repository, or download and extract its archive. From the checkout root, set the absolute pack path:

```sh
git clone https://github.com/OperatorNest/skills.git
cd skills
PACK="$(pwd)"
```

### Claude Code

```sh
claude plugin marketplace add "$PACK"
claude plugin install operatornest-skills@operatornest
```

Invoke `/operatornest-skills:write-task-brief`. For one session, use `claude --plugin-dir "$PACK"`. See the [marketplace installation guide](https://code.claude.com/docs/en/plugin-marketplaces).

### Codex

```sh
codex plugin marketplace add "$PACK"
```

Restart the ChatGPT desktop app, open the Plugins Directory, select OperatorNest skills, and install `operatornest-skills`. Invoke `$write-task-brief` in Codex. The [official packaging guide](https://developers.openai.com/plugins/build/plugins) documents local marketplaces and the supported compatibility manifest.

### Gemini CLI

```sh
gemini extensions install "$PACK"
```

Use `/skills list` to check discovery. See the [extension reference](https://geminicli.com/docs/extensions/reference/).

### Cursor

Copy the pack into a fresh local plugin directory:

```sh
mkdir -p "$HOME/.cursor/plugins/local"
cp -R "$PACK" "$HOME/.cursor/plugins/local/operatornest-skills"
```

Restart Cursor and check Customize for the plugin's skills. Invoke `/write-task-brief`. For an existing installation, replace the old copy deliberately before copying. See the [plugin guide](https://cursor.com/docs/plugins).

### Other Agent Skills clients

Copy the individual folders in `skills/` into your client's documented skill directory. Each folder works alone and follows the [Agent Skills specification](https://agentskills.io/specification).

## Skills

| Skill | Use |
|---|---|
| `competitor-change-watch` | Compare named sources with prior checks and report material changes. |
| `weekly-investor-update` | Draft a sourced update from a defined reporting period. |
| `inbox-follow-up` | Prepare replies for scoped threads with unresolved obligations. |
| `invoice-follow-up` | Check payment records and prepare held reminders. |
| `daily-morning-brief` | Report completed work, today's commitments, decisions, and gaps. |
| `meeting-prep-brief` | Prepare private meeting context with identity and chronology checks. |
| `vendor-research-shortlist` | Compare candidates against hard requirements and preferences. |
| `press-and-podcast-list` | Verify relevant recent work and public contact routes before drafting pitches. |
| `write-task-brief` | Turn a request into inputs, steps, approvals, receipt fields, and timing. |
| `approval-policy` | Draft action rules and explicit standing permissions for selected systems. |
| `agent-receipt` | Record actual actions, approvals, evidence, failures, and open work. |

## Validate

For checkout validation, run `just setup` to install Node 26 and pnpm 12, then run from the checkout root (published artifacts support Node.js 22 or later):

```sh
node scripts/validate.mjs
```

No dependencies need installation. Checks cover scalar frontmatter, folder names, release metadata, component paths, catalogs, and rejection cases. Client loading and task outcomes require checks in the client you use.

Skills do not connect accounts, enforce host permissions, or create schedules. Review the requested actions and approve consequential steps in your client.

## Contribute and report

Read [CONTRIBUTING.md](CONTRIBUTING.md), propose a job or report a bug through [issues](https://github.com/OperatorNest/skills/issues), and report vulnerabilities through [SECURITY.md](SECURITY.md). Code uses the [MIT license](LICENSE).
