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
| `/nexus/erp` | Review planned open-source ERP scope, self-hosting and first-release limits | View the existing Nexus demonstration or discuss early adoption by email |
| `/esg` | Review waste traceability, corporate carbon-inventory data and product carbon-footprint data | Discuss one delivery requirement by email |
| `/nexus` | Illustrative Nexus interface and workflow concepts | Review the visible sample-data notice |

Existing material, recovery, partner and share routes remain available. Charts and operation logs on the existing product demonstration pages are labeled as sample data.

The open-source ERP public release is in preparation. The website does not link to a public download or repository that has not been released. Apache-2.0 is the planned license. Flexible working-hour arrangements are outside the first release.

ESG services are evaluated per project. AI-assisted data preparation is a planned workflow capability; this iteration does not implement an operational Agent. Existing ERP and spreadsheet data can be discussed without adopting Nexus ERP.

The partner form's reception behavior is unchanged by this iteration, as requested. New factory-entry calls to action use explicit email links and do not submit the partner form.

The homepage shows the open-source ERP preparation status beside its assessment link. It also states that existing ERP, spreadsheet and document data can be assessed for ESG directly. The contact section describes human follow-up: confirm the requirement and deadline, review data and conditions, then agree on scope, a quote and acceptance criteria. Its email link opens a draft with requirement fields; the visitor sends the email from their own mail application.

## Validation

```sh
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
```

Review the homepage, both entry routes and demonstration labels at desktop and mobile sizes. Switch each supported language. Check the two problem-based entry cards, visible release/project statuses, the ERP demonstration link and the ESG waste section anchor. Inspect the email target, subject and body fields without sending email.

Page titles and descriptions for the three new entry routes update on the client. Static generation, language-specific URLs, canonical tags, sitemap work, contact reception, production Agents and ERP source extraction belong to subsequent iterations.

## Repository boundaries

This repository contains the public company website. The ERP rules package, open-source ERP upstream, client-specific downstream and commercial ESG code are planned separately. Do not copy client data, contracts, ERP source or private repository history into this website repository.
