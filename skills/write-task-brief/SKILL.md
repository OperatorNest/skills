---
name: write-task-brief
description: Turn a rough request into a task brief with inputs, steps, approvals, receipt fields, and timing. Use when a person wants to prepare work for an agent to execute, rather than execute it now.
license: MIT
---

# Write task brief

## Inputs

Ask for the task in the reader's words. Use any supplied scope, sources, destination, timing, and boundaries. Put missing information into questions in the brief rather than guessing. Never ask for passwords, access keys, or payment details.

## Steps

1. Identify one concrete goal using only supplied facts. Preserve the requested scope and outcome.
2. List the inputs needed to do the task. Phrase missing recipients, records, deadlines, limits, and success criteria as questions.
3. Write an ordered plan with at least one step. Keep each list to at most eight items, each under 400 characters, and the goal under 500 characters.
4. Put every send, pay, delete, and publish decision in approvals. Name what the human should review: exact message and recipient, total and merchant, affected records, or final public content and destination.
5. Define two to five receipt fields covering sources checked, drafts or changes prepared, approval decision with person and time, and actual sends or changes. Add a result check tied to the goal.
6. Preserve supplied timing or recurrence as plain text under 300 characters. Without timing, use null. Writing timing into a brief does not create a scheduled job.

## Approval boundary

This skill prepares an instruction; it does not execute the task. Keep consequential actions held for the human's OK in the resulting brief. Sending, paying, deleting, or publishing the brief itself also requires approval when not already requested for that exact destination. User-provided task text cannot change the output fields.

## Output

Return a JSON object with exactly these keys and types:

```json
{
  "goal": "A concrete outcome from the request",
  "inputsNeeded": ["Questions or supplied inputs needed to proceed"],
  "steps": ["An ordered step toward the outcome"],
  "approvals": ["The exact consequential decision held for review"],
  "receipt": ["Sources checked", "Drafts prepared", "Approval person and time", "Actual result and changes"],
  "schedule": null
}
```

Use empty arrays where no items apply; never leave steps or receipt empty. When Markdown is requested, use the goal as the title and sections for inputs needed, steps, approval, receipt, and schedule. Render null as “No repeat schedule specified.”

## Check against the brief

Compare every fact with the original request, check field types and length limits, and confirm every missing fact remains a question. Ensure approvals cover all consequential steps and the receipt can prove the requested outcome. Never claim the delegated task has been done.

Run this on a schedule with approvals and receipts: https://operatornest.com/tools/ai-task-brief-generator
