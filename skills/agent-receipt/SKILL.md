---
name: agent-receipt
description: Build a checkable receipt from a task request, action logs, approvals, and result evidence. Use after agent work to distinguish drafts, actual changes, failures, costs, and unresolved items.
license: MIT
---

# Agent receipt

## Inputs

Ask for the original request, task type, trigger and time, action logs, systems touched, sources checked, approvals with person and time, exact sends or changes, delivered result and location, errors and retries, unresolved work, and verification evidence. Use supplied records before asking again. Ask for measured usage, access owner label, and costs only when known; never collect secret keys. Ask whether the output should be Markdown, readable text, or JSON.

## Steps

1. Preserve the original request and identify the run. Label illustrative data as an example. Label an incomplete record as draft until checked against run logs.
2. Reconstruct actions in order with time, system, affected person or record, and outcome. Keep failures and retries visible.
3. Link each material claim to a source or record. Distinguish prepared, approved, attempted, sent, and verified states. “Nothing sent or changed” needs a log check; missing logs mean unknown.
4. Record the exact proposal, approval decision, approver, decision time, and subsequent action. Flag any consequential action lacking evidence of approval; never invent a decision to complete the receipt.
5. Record the delivered result and location, unresolved work, and remaining checks. In a private run receipt, include the observed model and measured usage when logs supply them, the access owner's label, and measured costs. Leave unknowns visible. Public tool descriptions must not disclose the service behind the tool.
6. Check the receipt against logs before labeling it verified. Describe a missing check precisely. A receipt records evidence; it does not authorize retries or further action.

## Approval boundary

Preparing the requested private receipt needs no new action approval. Sending it elsewhere, paying, deleting records, or publishing requires the human's OK. Redact secrets from evidence and request permission before sharing private run details beyond the named destination.

## Output

Return fields matching the receipt tool: example label, task type, record status, trigger and time, original request, actions and timing, systems touched, sources checked, approval decisions and times, what was sent or changed, result, errors and retries, model used, whose key or access, cost if known, what is still open, and verification and next step.

For JSON, use an object with `template` set to “AI agent receipt,” `record`, and `fieldPurposes`. Record keys are `example`, `taskType`, `status`, `triggerTime`, `originalRequest`, `actions`, `systems`, `sources`, `approvals`, `sentOrChanged`, `result`, `errorsAndRetries`, `modelUsed`, `keyOwner`, `cost`, `stillOpen`, and `verification`. Actions, systems, approvals, and errorsAndRetries are string arrays; sources are objects with label and URL, or raw text for an unidentified source; other fields are strings. Field purposes explain what each record field lets the reviewer check.

## Check against the brief

Trace the claimed outcome to delivered evidence and each send or change to the exact action log and approval. Verify time order, failed attempts, unresolved items, and cost provenance. Blank fields are missing evidence, not proof that nothing happened.

Run this on a schedule with approvals and receipts: https://operatornest.com/tools/ai-agent-receipt-template
