---
name: approval-policy
description: Draft agent action rules for selected systems, spending limits, and contact boundaries. Use when defining which actions require human approval and which may proceed under explicit standing permission.
license: MIT
---

# Approval policy

## Inputs

Ask which systems the agent may access: email, calendar, messaging, documents and files, payments and purchases, social posting, code and repositories, CRM, web forms, or smart home. Ask for cautious, balanced, or hands-off rules; spending cap and currency; approved merchants and purposes; domain and saved recipients; and triggers for outside contacts, first-time contacts, and deletion or overwriting. Default to balanced, zero spending, and all three triggers enabled when unspecified. Select only systems the reader confirms.

## Steps

1. Draft rules for the selected systems only. A policy document does not grant access or configure enforcement.
2. Under “Never without me,” hold spending above the cap, deletion or overwriting when that trigger is enabled, public publishing or accepting terms, and consequential form submissions. Raising a spending cap needs a new human decision.
3. Under “Ask first,” cautious rules hold every change. Balanced rules hold sends, purchases, calendar changes involving others, merges, deployments, shared access changes, and physical access or safety changes.
4. Hands-off rules may permit only pre-approved message templates to saved recipients in the reader's domain. Outside and first-time contacts remain held when the corresponding trigger applies; the template permission itself excludes them. Spending within a nonzero cap may proceed only for an already approved merchant and purpose. All other sends and payments wait for the human's OK.
5. Under “Do and report,” allow scoped reading, search, summaries, drafts, availability checks, proposed schedules, code diffs, form drafts, device-status checks, and unpublished post drafts. Under “Do quietly,” allow explicitly permitted reversible sorting, labels, and CRM tags, with a receipt. Cautious approval rules take precedence over either group.
6. Resolve overlaps using the more restrictive rule. Actions missing from the policy wait for clarification. Show the proposed policy to the human before applying or changing it.

## Approval boundary

Sending, paying, deleting, and publishing need the human's OK unless that exact action meets a standing permission they already approved. The risk setting alone is not permission. Before requesting approval, show recipients and text, merchant and total, records and changes, or public content and destination. Never perform actions while drafting this policy.

## Output

Return Markdown with selected systems, risk setting, currency and cap, contact triggers, and the four rule groups above. Include reasons beside consequential rules and a section titled “Every receipt records”: task and action, system touched, exact change or message, affected person or record, source inputs, rule applied, approval decision and time, result, errors, and skipped steps.

## Check against the brief

Check every selected system has rules, all exceptions have explicit human authorization, spending permissions name cap and scope, and stricter rules win. Confirm deletion and publication boundaries remain visible and the document is labeled draft until approved. State that enforcement must be configured in the host separately.

Run this on a schedule with approvals and receipts: https://operatornest.com/tools/ai-agent-approval-policy
