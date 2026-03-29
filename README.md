# Starhunter Dashboard

A recruiter-facing candidate management dashboard built with React, TypeScript, and the Starhunter GraphQL API. Built as an AI-assisted coding assessment using **Claude Code**.

**[Video Presentation](https://odysee.com/assigment-starhunter:a)**

## Features

- **Candidate list** with data from the live Starhunter GraphQL API
- **Search** by name (debounced, server-side via GraphQL `candidates` query)
- **Filter** by status (client-side, options derived dynamically from API data)
- **Sort** by name, date, location, or status
- **Pagination** (client-side, 12 candidates per page)
- **Candidate detail panel** — click a card to slide open full profile with professional info, compensation, availability, project history, and social links
- **Loading skeletons** and **error handling** with retry

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 8 |
| GraphQL | Apollo Client 4 |
| Styling | Tailwind CSS 4 |
| Testing | Vitest + React Testing Library + MSW |

## Data Model

The app queries multiple GraphQL entities:

- **Candidate** — core entity with 90+ fields (personal, professional, compensation, availability)
- **ProjectCandidate** — join table linking candidates to projects with status tracking
- **Project** — linked via candidate's project history (name, status, position, company)
- **InterviewConsultant** — responsible persons linked to candidates
- **Interview** — interview records with consultants, notes, suggestions
- **Activity** — contact history timeline

See [`schema.md`](./schema.md) for the full introspected API schema.

## Query Strategy

- **List view** uses `GET_CANDIDATES` with a `CandidateListFields` fragment (18 lightweight fields) for fast loading
- **Detail panel** uses `GET_CANDIDATE_DETAILS` with a `CandidateDetailFields` fragment (90+ fields including nested relations) via `useLazyQuery`, only fetched on card click
- **Search** is debounced (300ms) and sent server-side as the `name` parameter
- **Status filtering** is client-side since the API doesn't support a status filter parameter
- Apollo's `cache-and-network` policy shows cached data instantly while refreshing

## Getting Started

```bash
# Install dependencies
npm install

# Set your API token
cp .env.example .env
# Edit .env and add: VITE_API_TOKEN=<your-token>

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
src/
  components/          UI components (CandidateCard, SearchBar, Layout, etc.)
    __tests__/         Component and integration tests
  graphql/             GraphQL queries with reusable fragments
  hooks/               useCandidates (Apollo query + debounce + filter)
  lib/                 Apollo Client configuration
  test/                Test helpers, mock factories, MSW setup
  types/               TypeScript types matching the GraphQL schema
```

## Tests

20 tests across 3 test files:

- **SearchBar** (4 unit tests) — rendering, value display, onChange callbacks
- **CandidateCard** (10 unit tests) — name, email, initials, avatar, status badge, profession/company fallback, location, level, null handling, click handler
- **Candidate list integration** (6 tests) — API data rendering, count display, debounced search, status filtering, empty state, error state with MSW-mocked GraphQL

```bash
npm test           # single run
npm run test:watch # watch mode
```
