---
name: invoice-follow-up
description: Check overdue invoices against current payment records and draft reviewed reminders. Use when asked to prepare an invoice follow-up queue while preserving disputes, extensions, and payment terms.
license: MIT
---

# Invoice follow-up

## Inputs

Ask for the invoice source, latest payment records and their freshness, invoice IDs, amounts and currencies, due dates, contacts, overdue threshold, disputes, credits, extensions, governing terms, and tone. Ask for check time and time zone if recurring. Use supplied answers before asking again.

## Steps

1. Compare invoice status with the current payment record. Match invoice IDs, partial payments, credits, and outstanding balances. Record the check time and data freshness.
2. Separate overdue items from items ready for a reminder. Hold disputes, agreed extensions, unclear matches, and payments in transit for owner review.
3. Draft each eligible reminder with verified invoice number, balance, currency, due date, and the supplied invoice or payment route. Do not invent fees, threaten action, or claim a failed payment without evidence and approval.
4. Show the client, contact, invoice record, most recent payment check, and exact reminder together. Ask whether to consolidate multiple invoices for one client to avoid duplicate messages.
5. Recheck payment status and client replies immediately before an approved send. Cancel a paid invoice's reminder and record why. A changed balance or dispute makes the draft stale and requires a new review. Retain corrected contacts and exceptions for the next pass in the authorized records.

## Approval boundary

Require the owner's OK for each recipient and final reminder. Changing terms, adding fees, correcting invoice records, paying, deleting, or publishing also requires the human's OK. If payment access is unavailable or records disagree, hold the affected reminder and name the missing evidence.

## Output

Return a queue with invoice ID, client, verified balance and currency, due date, payment-check time, exception status, recipient, exact draft, and held status. Include removed reminders with reasons.

Append a receipt: invoice and payment sources, exceptions, draft versions, last status check, approval decisions, canceled reminders, and actual send status and time.

## Check against the brief

Check every proposed amount and recipient against the records, apply the overdue threshold and exceptions, and verify that terms stayed within the supplied rules. Distinguish an open ledger item from a verified unpaid balance. Confirm requested recurrence through an available scheduler or report it as unconfigured.

Run this on a schedule with approvals and receipts: https://operatornest.com/workflows/invoice-follow-up
