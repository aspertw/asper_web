# Asper company website

React 19 and Vite company website for Asper International.

## Local development

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

The first factory-entry iteration uses Traditional Chinese by default. The language menu also provides English, Japanese and Korean content.

## Factory entry routes

| Route | Purpose | Next step |
| --- | --- | --- |
| `/` | Choose a route for an operational problem or a customer carbon/recovery-data request | Review ERP fit or ESG data requirements |
| `/nexus/erp` | Review workflow fit, first-release limits and factory/Asper responsibilities | Read preparation steps at `#erp-start`, then request an assessment by email |
| `/esg` | Choose a paid data deliverable by customer requirement and review the agreed scope | Review first-contact information at `#esg-start`, then open a requirement email draft |
| `/nexus` | Illustrative Nexus interface and workflow concepts | Review the visible sample-data notice |

Existing material, recovery, partner and share routes remain available. Charts and operation logs on the existing product demonstration pages are labeled as sample data.

The open-source ERP public release is in preparation. The website does not link to a public download or repository that has not been released. Apache-2.0 is the planned license. Flexible working-hour arrangements are outside the first release.

The ERP page separates factory-led adoption after release from paid migration, configuration, training and maintenance assistance. The release status and first-release exclusions stay visible. HR/IT preparation, workflow and the full responsibility table are optional disclosures. “See how to start” opens `#erp-start`; “Open an ERP enquiry draft” opens six fields, including company/contact details and items that can be marked undecided. Expand the comparison before scrolling its own region on small screens.

ESG services are evaluated per project. AI-assisted data preparation is a planned workflow capability; this iteration does not implement an operational Agent. Existing ERP and spreadsheet data can be discussed without adopting Nexus ERP.

The ESG page distinguishes waste traceability evidence, factory carbon-inventory data preparation and product carbon-footprint data preparation. Each route shows the customer request, paid data deliverables and the information to review after agreeing on the project. Emission calculations, formal reports, consulting and third-party verification require separate agreement on work, responsibilities and fees.

First contact needs the customer requirement, deadline, site/period/product, current data sources and a contact person. Incomplete data can be discussed. After confirming the requirement, the factory provides an authorized export sample; Asper identifies usable fields and gaps, and both parties agree on CSV/Excel import or API feasibility and a quote. Three compact outcome cards open solution-specific email drafts directly. Their detail links expand the matching delivery/data disclosure. Outcome selection also survives the preparation/contact anchors and closing a disclosure; the general draft uses that selection, or an undecided deliverable when none was selected. Visitors review and send drafts from their own mail application.

The partner form's reception behavior is unchanged by this iteration, as requested. New factory-entry calls to action use explicit email links and do not submit the partner form.

The homepage has one pair of problem-based choices, visible release/paid-service statuses and a direct existing-ERP path to ESG. Contact follows the choices; source/material information is optional. The three human follow-up steps remain visible. Every page's enquiry draft has six fields and includes company/contact, requirement, timing and current data context. A visible email address provides a manual alternative when a mail application is not configured. The website does not send or save these drafts.

## Validation

```sh
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
```

Review the homepage, both entry routes and demonstration labels at desktop and mobile sizes. Switch each supported language. Check the two problem-based entry cards, visible release/project statuses, the ERP demonstration link and the ESG waste section anchor. Inspect the email target, subject and body fields without sending email.

On the ERP page, check `#erp-scope` and `#erp-start`, the responsibility comparison, first-release exclusions, IT readiness panel and email draft fields. Confirm that mobile table scrolling does not widen the page.

On the ESG page, check the three outcome anchors, `#esg-start` and `#esg-contact`, including repeat clicks after scrolling away. Confirm that paid scope and first-contact/post-agreement data are distinct. Inspect the three solution-specific and one general email draft: recipient, translated subject, chosen deliverable and six actual lines. Do not send an email during validation.

Walk from the homepage to ERP and ESG, then to each email draft. On ESG, choose an outcome, continue through the existing-ERP path and verify the final draft keeps that outcome. Close/reopen its disclosure, change the outcome, switch languages and use browser history. A direct `/esg#esg-waste` entry must expand the waste disclosure and carry it to contact. Verify the undecided path on a fresh `/esg` entry. Use the native disclosure summaries with a keyboard and confirm mandatory release, limitation and paid-scope statements stay visible when disclosures are closed.

Page titles and descriptions for the three new entry routes update on the client. Static generation, language-specific URLs, canonical tags, sitemap work, contact reception, production Agents and ERP source extraction belong to subsequent iterations.

## Repository boundaries

This repository contains the public company website. The ERP rules package, open-source ERP upstream, client-specific downstream and commercial ESG code are planned separately. Do not copy client data, contracts, ERP source or private repository history into this website repository.
