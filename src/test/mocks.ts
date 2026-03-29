import type { CandidateListItem } from '../types/candidate'

/** GraphQL response mock with __typename for Apollo fragment matching. */
export type CandidateGqlResponse = CandidateListItem & { __typename: string }

export function makeCandidateListItem(overrides: Partial<CandidateListItem> = {}): CandidateGqlResponse {
  return {
    __typename: 'Candidate',
    id: '64a1b2c3d4e5f',
    name: 'Max Mustermann',
    firstName: 'Max',
    secondName: 'Mustermann',
    email: 'max@example.com',
    phone: '+49 123 456789',
    avatar: null,
    status: 'active',
    level: 'Senior',
    currentLocation: 'Berlin',
    profession: 'Software Engineer',
    companyName: 'Acme GmbH',
    candidateNumber: 'C-001',
    rating: 4,
    availableFrom: '2026-05-01',
    candidateSince: '2025-01-15',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2026-03-20T14:30:00Z',
    ...overrides,
  }
}

export const MOCK_CANDIDATES: CandidateGqlResponse[] = [
  makeCandidateListItem({
    id: 'aaa111bbb222c',
    name: 'Anna Schmidt',
    firstName: 'Anna',
    secondName: 'Schmidt',
    email: 'anna@example.com',
    status: 'active',
    currentLocation: 'Munich',
    profession: 'Product Manager',
  }),
  makeCandidateListItem({
    id: 'bbb222ccc333d',
    name: 'Boris Weber',
    firstName: 'Boris',
    secondName: 'Weber',
    email: 'boris@example.com',
    status: 'passive',
    currentLocation: 'Hamburg',
    profession: 'Data Scientist',
  }),
  makeCandidateListItem({
    id: 'ccc333ddd444e',
    name: 'Clara Fischer',
    firstName: 'Clara',
    secondName: 'Fischer',
    email: 'clara@example.com',
    status: 'active',
    currentLocation: 'Berlin',
    profession: 'Designer',
  }),
]
