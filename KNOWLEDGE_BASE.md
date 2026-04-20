# eNotar Platform — What the product does

This document describes **what the application is for** and **what users can do today**, from a product perspective. It is not a technical handbook.

---

## Purpose and audience

**eNotar** is an internal operations product for a **notarial office** and its staff. It supports day‑to‑day coordination: opening new work from clients, tracking tasks, managing the team, handling time off, and staying on top of system messages.

The interface is aimed at **Romanian-speaking** users: labels, navigation, and most in‑app copy are in **Romanian**.

Access is **role-based**: each person only sees actions and areas their role allows. Some menu entries exist for future modules; those are called out below.

---

## Account and security

- **Sign in** with email and password; **sign out** when finished.
- **Forgot password** flow: request a reset link, set a new password, confirmation screen after success.
- **Email verification** for accounts that require a verified address.
- **Confirm password** when the application needs extra certainty before a sensitive change.
- **Change password** from the account area while logged in.

---

## Personal settings

Users with access to settings can:

- **Profile** — update personal details shown in the app.
- **Security** — manage password and related security preferences.
- **Notifications** — choose how they want to be notified (channels and preferences the product supports).
- **Browser push** — opt in so important alerts can reach them even when the tab is not active (where the organization has enabled this).

---

## Tasks (“Activități”)

For users who may work on tasks, the product supports:

- Two **views**: **office (birou)** and **personal** task lists, so work can be split by context.
- **Creating, editing, and removing** tasks (within the rules of their role).
- **Filtering and sorting** lists to find work quickly.
- **Attachments** on a task: add files, download them, remove them when allowed.
- **Comments** on a task: add, edit, and delete comments for collaboration and handover.

After sign‑in, users are typically taken into the **tasks** area as the main working surface.

---

## New appointment / new case intake (“Programări”)

Users who are allowed to create new intake can run a **guided, step‑by‑step flow** to open a new dossier. In plain language, the flow covers:

1. **Client information** — who the matter is for (the parties involved at intake).
2. **Case type** — what kind of notarial matter it is (category / subcategory as defined in the product).
3. **Documents** — upload supporting material; **preview** uploaded attachments when needed.
4. **Pricing** — step exists in the journey; the detailed pricing experience may still be **minimal** (advance to the next step rather than full commercial quoting).
5. **Date and time** — choose when the work is scheduled; the product can account for **who will handle drafting (redactor)** when that applies, and **scheduling conflicts** can be enforced so double‑bookings are avoided where configured.
6. **Confirmation** — final step to complete intake; the case moves into the next lifecycle stage for downstream work.

The wizard **does not let users skip ahead** of incomplete steps: the product enforces the intended order.

While filling the form, staff can **search for existing people and companies** to attach the right client or partner without retyping everything.

---

## Clients (“Clienți”)

The clients area is **not complete yet**. The **user-facing screens are largely built** (lists, profiles, and tabs such as summary, cases, finances, and attachments for **direct clients** and for **partner** organisations), but the **server-side work is still outstanding**—business rules, persistence, and APIs needed to drive those pages with real, reliable data are **still to be implemented**. Until that work is finished, behaviour may be partial, static, or incomplete even where the interface looks finished.

Where the feature is **disabled** in an environment (for example non‑local deployments), users will not see these routes at all.

---

## Team (“Echipă”)

Authorized users can:

- See the **team directory**.
- **Invite** new members (where permitted).
- **Edit** a colleague’s **profile details** (where permitted).
- **Adjust permissions** for a colleague so their role matches their responsibilities (where permitted).

---

## Time off and absences (“Concedii”)

The product supports **leave / absence** workflows:

- **Personal view** — each employee can see their own absence picture and **submit** absence requests.
- **Team view** — managers (or similar roles) can see **team** absence information, subject to access rules.
- **Request lifecycle** — submit a request; managers can **approve** or **reject**; users can **cancel** an open request or **remove** one when the rules allow.

Whether someone lands on the personal or team view can depend on whether they are treated as a **manager** in the system.

---

## In-app notifications

Users can:

- Open a **notifications** area (often from the header), with ways to focus on **unread**, **read**, or **all** messages, depending on how the screen is organized.
- **Mark one** notification as read or unread, **mark all** as read, or **delete** notifications they no longer need.

These notifications are the product’s way of surfacing **system and operational messages** (not a full email client).

---

## Navigation: available now vs reserved

The sidebar reflects how the office thinks about work. In the current product:

| Area (Romanian label) | Typical meaning      | Product readiness                                                                                    |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| Acasă                 | Home / dashboard     | **Placeholder** — entry present for permissioning; no full home module wired the same way as tasks.  |
| Programări            | New intake wizard    | **Active** for users with create access.                                                             |
| Cazuri                | Case file management | **Placeholder** — no dedicated case list module behind the menu yet.                                 |
| Șabloane              | Document templates   | **Placeholder**.                                                                                     |
| Arhivă                | Archive              | **Placeholder**.                                                                                     |
| Plăți                 | Payments             | **Placeholder**.                                                                                     |
| Rapoarte              | Reports              | **Placeholder**.                                                                                     |
| Activități            | Tasks                | **Active** (office / personal).                                                                      |
| Clienți               | Clients & partners   | **In progress** — screens exist; **back end still to be built** so the feature is not end‑to‑end. Shown only in environments where client routes are enabled. |
| Echipă                | Team                 | **Active**.                                                                                          |
| Concedii              | Absences             | **Active**.                                                                                          |

“Placeholder” here means: the product may **show the item** for roles that will need it later, or hide it, but **there is no full screen workflow** behind it comparable to tasks or the appointment wizard.

---

## What the app does _not_ do (based on current behaviour)

- **Self‑service registration** for the general public is not part of the sign‑in screen; accounts are created by the organization (for example via team invite or admin processes).
- **Client‑facing portals** for external clients to log in and manage their own dossiers are not described as a primary mode in the current flows; the emphasis is on **staff** using the back office.
- **Full financial, archiving, reporting, and case‑management suites** are not yet the main implemented surfaces—those areas appear in navigation as **future or partial** scope unless your deployment adds customizations.

---

## Summary

**Today, eNotar is strongest as a staff workspace for:** secure sign‑in, **tasks** with files and comments, a **structured new case / appointment intake** wizard with scheduling behaviour, **team** administration, **absence** requests and approvals, **notifications**, and **personal settings**. **Clients / partners** have **front-end pages in place** but **lack the completed back end**, so they should be treated as **preview / work in progress**, not a finished module. Additional domains (cases list, templates, archive, payments, reports, land register) are **anticipated in permissions and navigation** but are not all fully built out as end‑to‑end modules in the baseline product described here.

---

_For implementation details, repository layout, and contributor workflows, see `README.md` and `AGENTS.md`._
