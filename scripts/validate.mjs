#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Offline checks for this pack's intentionally small frontmatter and manifests.
// Format sources and official validator commands are linked in ../README.md.
const root = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const expected = [
  'agent-receipt', 'approval-policy', 'competitor-change-watch', 'daily-morning-brief',
  'inbox-follow-up', 'invoice-follow-up', 'meeting-prep-brief', 'press-and-podcast-list',
  'vendor-research-shortlist', 'weekly-investor-update', 'write-task-brief',
];
const toolSlugs = {
  'agent-receipt': 'ai-agent-receipt-template',
  'approval-policy': 'ai-agent-approval-policy',
  'write-task-brief': 'ai-task-brief-generator',
};

function checkName(name) {
  assert.equal(typeof name, 'string', 'name must be a string');
  assert.ok(name.length >= 1 && name.length <= 64 && namePattern.test(name), `invalid name: ${name}`);
}

function frontmatter(raw, folder) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
  assert.ok(match, 'expected YAML frontmatter and a nonempty Markdown body');
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    // These files use plain, single-line YAML scalars. Fail on complex YAML
    // rather than silently misreading it; use skills-ref for general YAML.
    const entry = line.match(/^(name|description|license): ([^\n]+)$/);
    assert.ok(entry, `unsupported frontmatter line: ${line}`);
    const [, key, value] = entry;
    assert.ok(!Object.hasOwn(fields, key), `duplicate field: ${key}`);
    assert.ok(!/[:#]\s|\s#|^[\[\]{},&*?!|>'"%@`]|^(?:null|true|false|~)$/i.test(value), `expected plain string: ${key}`);
    fields[key] = value.trim();
  }
  checkName(fields.name);
  assert.equal(fields.name, folder, 'name must match the parent folder');
  assert.ok(typeof fields.description === 'string' && fields.description.length >= 1 && fields.description.length <= 1024, 'description must have 1–1024 characters');
  assert.equal(fields.license, 'MIT', 'skill license must be MIT');
  assert.ok(match[2].trim(), 'instructions must not be empty');
  return match[2];
}

function inside(path) {
  assert.equal(typeof path, 'string', 'path must be a string');
  assert.ok(path.startsWith('./') && !path.includes('\\'), `path must start with ./ and use forward slashes: ${path}`);
  assert.ok(!path.split('/').includes('..'), `path cannot traverse parents: ${path}`);
  const full = resolve(root, path);
  const rel = relative(root, full);
  assert.ok(rel !== '..' && !rel.startsWith(`..${sep}`), `path leaves the pack: ${path}`);
  return full;
}

async function directory(path) {
  const full = inside(path);
  const actual = await realpath(full);
  assert.equal(actual, full, `component path cannot contain a symlink: ${path}`);
  assert.ok((await stat(actual)).isDirectory(), `missing component directory: ${path}`);
  return full;
}

async function json(path) {
  return JSON.parse(await readFile(join(root, path), 'utf8'));
}

function identity(manifest, canonical) {
  checkName(manifest.name);
  for (const field of ['name', 'version', 'description']) {
    assert.equal(manifest[field], canonical[field], `manifest ${field} must match root plugin.json`);
  }
}

// Exercise rejection cases as well as the real pack so checks fail closed.
function selfCheck() {
  const valid = '---\nname: example\ndescription: Use for an example task.\nlicense: MIT\n---\n# Example\n';
  frontmatter(valid, 'example');
  for (const name of ['', 'Example', '-example', 'example-', 'example--task', 'a'.repeat(65)]) {
    assert.throws(() => checkName(name));
  }
  for (const broken of [
    valid.replace('description: Use for an example task.\n', ''),
    valid.replace('description: Use for an example task.', `description: ${'a'.repeat(1025)}`),
    valid.replace('description: Use for an example task.', 'description: true'),
    valid.replace('license: MIT', 'license: MIT\nname: example'),
    valid.replace('license: MIT', 'license: MIT\nunknown: value'),
    valid.replace('description: Use for an example task.', 'description: Broken: YAML'),
  ]) assert.throws(() => frontmatter(broken, 'example'));
  assert.throws(() => frontmatter(valid, 'different-folder'));
  for (const path of ['/tmp/example', './../example', './skills/../../example', './skills\\example']) {
    assert.throws(() => inside(path));
  }
}

async function validate() {
  selfCheck();
  const entries = await readdir(join(root, 'skills'), { withFileTypes: true });
  assert.deepEqual(entries.map((entry) => entry.name).sort(), expected, 'expected exactly the eleven named skills');
  for (const entry of entries) {
    assert.ok(entry.isDirectory(), `${entry.name} must be a real directory`);
    const skill = await directory(`./skills/${entry.name}`);
    const body = frontmatter(await readFile(join(skill, 'SKILL.md'), 'utf8'), entry.name);
    const destination = toolSlugs[entry.name] ? `tools/${toolSlugs[entry.name]}` : `workflows/${entry.name}`;
    const footer = `Run this on a schedule with approvals and receipts: https://operatornest.com/${destination}`;
    assert.ok(body.trimEnd().endsWith(footer), `${entry.name}: expected canonical final line`);
    assert.equal((body.match(/https:\/\/operatornest\.com\//g) || []).length, 1, `${entry.name}: expected one promotional link`);
  }

  const canonical = await json('plugin.json');
  checkName(canonical.name);
  assert.equal(canonical.name, 'operatornest-skills');
  assert.equal(canonical.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
  assert.ok(/^\d+\.\d+\.\d+$/.test(canonical.version), 'expected a release version');
  assert.ok(typeof canonical.description === 'string' && canonical.description.trim());
  assert.equal(canonical.license, 'MIT');
  assert.equal(canonical.author.name, 'OperatorNest');
  assert.equal(canonical.author.email, 'operatornest+github@gmail.com');
  assert.equal(canonical.homepage, 'https://operatornest.com');
  assert.equal(canonical.repository, 'https://github.com/OperatorNest/skills');
  const portableFields = ['$schema', 'name', 'version', 'description', 'author', 'homepage', 'repository', 'license', 'keywords', 'extensions'];
  assert.ok(Object.keys(canonical).every((key) => portableFields.includes(key)), 'unrecognized portable manifest field');
  assert.ok(canonical.keywords.every((keyword) => typeof keyword === 'string'));

  for (const client of ['claude', 'codex', 'cursor']) {
    const manifest = await json(`.${client}-plugin/plugin.json`);
    identity(manifest, canonical);
    assert.deepEqual(manifest.author, canonical.author);
    assert.equal(manifest.homepage, canonical.homepage);
    assert.equal(manifest.repository, canonical.repository);
    assert.equal(manifest.license, canonical.license);
    // Claude uses default discovery; explicit paths must target the same set.
    const skillPath = manifest.skills ?? './skills/';
    assert.equal(skillPath, './skills/');
    await directory(skillPath);
    assert.ok(!manifest.mcpServers && !manifest.apps && !manifest.hooks, `${client}: pack must work without services or hooks`);
  }
  identity(await json('gemini-extension.json'), canonical);
  const gemini = await json('gemini-extension.json');
  assert.deepEqual(Object.keys(gemini).sort(), ['description', 'name', 'version'], 'extension must remain skills-only');

  const claude = await json('.claude-plugin/marketplace.json');
  assert.equal(claude.name, 'operatornest');
  assert.deepEqual(claude.owner, canonical.author);
  assert.ok(claude.description.trim());
  assert.equal(claude.plugins.length, 1);
  assert.equal(claude.plugins[0].name, canonical.name);
  assert.equal(await directory(claude.plugins[0].source), root);

  const codex = await json('.agents/plugins/marketplace.json');
  assert.equal(codex.name, claude.name);
  assert.equal(codex.plugins.length, 1);
  const listing = codex.plugins[0];
  assert.equal(listing.name, canonical.name);
  assert.equal(listing.source.source, 'local');
  assert.equal(await directory(listing.source.path), root);
  assert.deepEqual(listing.policy, { installation: 'AVAILABLE', authentication: 'ON_INSTALL' });
  assert.equal(listing.category, 'Productivity');
  assert.ok((await readFile(join(root, 'LICENSE'), 'utf8')).startsWith('MIT License\n'));
  console.log('Skills pack: 11 skills, 4 client manifests, portable manifest, 2 catalogs; 0 issues. Rejection checks passed.');
}

try {
  await validate();
} catch (error) {
  console.error(`Skills pack validation failed: ${error.message}`);
  process.exitCode = 1;
}
