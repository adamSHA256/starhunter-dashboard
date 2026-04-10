// -- Base scalars --

/** 13-character hex string ID */
export type Id = string

/** ISO 8601 date-time string */
export type DateTime = string

/** ISO 8601 date string */
export type DateString = string

/** MM-DD (no year) */
export type BirthDate = string

// -- Related types --

export interface Activity {
  title: string | null
  type: string | null
  date: DateTime | null
}

export interface InterviewConsultant {
  id: Id | null
  name: string | null
  role: string | null
}

export interface Interview {
  id: Id
  date: DateTime | null
  notes: string | null
  suggestion: string | null
  change_motivation: string | null
  charges: boolean | null
  consultants: InterviewConsultant[] | null
}

export interface ProjectSummary {
  id: Id
  name: string | null
  status: string | null
  position: string | null
  company: string | null
}

export interface ProjectCandidate {
  id: Id | null
  status: string | null
  changeDate: DateString | null
  rejectionReason: string | null
  project: ProjectSummary | null
  person: PersonSummary | null
  candidate: CandidateListItem | null
}

export interface PersonSummary {
  id: Id
  name: string | null
  email: string | null
  phone: string | null
  avatar: string | null
}

// -- Candidate list item (used in list/search queries) --

export interface CandidateListItem {
  id: Id
  name: string | null
  firstName: string | null
  secondName: string | null
  email: string | null
  phone: string | null
  avatar: string | null
  status: string | null
  level: string | null
  currentLocation: string | null
  profession: string | null
  companyName: string | null
  candidateNumber: string | null
  rating: number | null
  availableFrom: DateString | null
  candidateSince: DateString | null
  createdAt: DateTime | null
  updatedAt: DateTime | null
}

// -- Full candidate detail --

export interface CandidateDetail {
  id: Id
  name: string | null
  firstName: string | null
  middleName: string | null
  secondName: string | null
  academicTitle: string | null
  salutation: string | null
  gender: string | null
  email: string | null
  phone: string | null
  address: string | null
  avatar: string | null
  birthDate: DateString | null
  dateOfBirth: DateString | null
  birthPlace: string | null
  maritalStatus: string | null
  familyStatus: string | null

  // Professional
  status: string | null
  level: string | null
  rating: number | null
  profession: string | null
  companyName: string | null
  currentLocation: string | null
  matchingRadius: number | null
  shortProfile: string | null
  trackRecord: string | null
  jobExperience: number | null
  managerialResponsibility: number | null
  graduation: string | null
  candidateNumber: string | null
  candidateId: string | null
  candidateSince: DateString | null
  source: string | null
  sourceOk: boolean | null

  // Salary & compensation
  salary: string | null
  currentSalary: number | null
  salaryRequirement: number | null
  totalSalary: number | null
  salaryRange: string | null
  salaryIsAskingPrice: boolean | null
  gBonus: string | null
  pBonus: string | null

  // Employment
  employmentFactorMin: number | null
  employmentFactorMax: number | null
  noticePeriod: string | null
  noticePeriodUnit: string | null
  numericNoticePeriod: number | null
  availableFrom: DateString | null
  availabilityDate: DateString | null
  inActiveProject: boolean | null

  // Cached tags
  industriesCached: string | null
  educationsCached: string | null
  functionsCached: string | null
  qualifiersCached: string | null
  skillsCached: string | null
  otherSkillsCache: string | null
  languageSkillsCache: string | null
  tagsCached: string | null

  // Social & web
  linkedinUrl: string | null
  xingUrl: string | null
  website: string | null
  facebookUrl: string | null
  twitterUrl: string | null
  freeUrl1: string | null
  freeUrl2: string | null
  freeUrl3: string | null

  // Opt-in
  optin: boolean | null
  optinValidUntilDate: DateString | null
  optinMailSent: boolean | null
  optinMailSentDate: DateString | null

  // Misc
  regions: string | null
  instanceColor: string | null
  state: number | null
  elunicNotes: string | null
  personExternalId: string | null
  perDu: boolean | null
  specialPropertiesText: string | null

  // Timestamps
  createdAt: DateTime | null
  updatedAt: DateTime | null

  // Relations
  projects: ProjectCandidate[] | null
  responsiblePersons: InterviewConsultant[] | null
  interviews: Interview[] | null
  contactHistory: Activity[] | null
}

// -- Query variable types --

export interface GetCandidatesVars {
  name?: string
  birthDate?: BirthDate
  limit?: number
  offset?: number
}

export interface GetCandidateVars {
  candidateId?: Id
  birthDate?: BirthDate
  name?: string
  limit?: number
  offset?: number
}

export interface GetCandidateDetailsVars {
  candidateId: Id
  limit?: number
  offset?: number
}

export interface SearchCandidatesVars {
  name: string
  limit?: number
  offset?: number
}

export interface GetProjectCandidatesVars {
  projectId?: Id
  status?: string
  limit?: number
  offset?: number
}

export interface GetPresentationsVars {
  projectId?: Id
  candidateId?: Id
  status?: string
  limit?: number
  offset?: number
}

// -- Query result types --

export interface GetCandidatesData {
  candidates: CandidateListItem[]
}

export interface GetCandidateData {
  candidate: CandidateListItem[]
}

export interface GetCandidateDetailsData {
  candidate: CandidateDetail[]
}

export interface SearchCandidatesData {
  candidates: CandidateListItem[]
}

export interface GetProjectCandidatesData {
  projectCandidates: ProjectCandidate[]
}

export interface GetPresentationsData {
  presentations: ProjectCandidate[]
}

// -- UI helpers --

/** Maps status strings (lowercase) to Tailwind color classes. API returns free-form strings. */
export const STATUS_COLORS: Record<string, string> = {
  'sucht aktiv': 'bg-green-100 text-green-800',
  new: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  passive: 'bg-blue-100 text-blue-800',
  placed: 'bg-emerald-100 text-emerald-800',
  blocked: 'bg-red-100 text-red-800',
  archived: 'bg-gray-100 text-gray-600',
  screening: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-purple-100 text-purple-800',
  offer: 'bg-emerald-100 text-emerald-800',
  hired: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export const DEFAULT_STATUS_COLOR = 'bg-gray-100 text-gray-700'

export function getStatusColor(status: string | null): string {
  if (!status) return DEFAULT_STATUS_COLOR
  return STATUS_COLORS[status.toLowerCase()] ?? DEFAULT_STATUS_COLOR
}

/** Maps raw API status strings to short display labels. */
const STATUS_DISPLAY: Record<string, string> = {
  'sucht aktiv': 'Active',
}

export function getStatusDisplay(status: string): string {
  return STATUS_DISPLAY[status.toLowerCase()] ?? status
}

/** Returns true if the candidate status indicates they are actively seeking. */
export function isActiveStatus(status: string | null): boolean {
  if (!status) return false
  const s = status.toLowerCase()
  return s === 'sucht aktiv' || s === 'active'
}

/** Maps level strings (lowercase) to Tailwind color classes for the level badge. */
export const LEVEL_COLORS: Record<string, string> = {
  board: 'bg-purple-100 text-purple-700',
  management: 'bg-indigo-100 text-indigo-700',
  spezialist: 'bg-cyan-100 text-cyan-700',
  coo: 'bg-amber-100 text-amber-700',
}

export const DEFAULT_LEVEL_COLOR = 'bg-gray-100 text-gray-600'

export function getLevelColor(level: string | null): string {
  if (!level) return DEFAULT_LEVEL_COLOR
  return LEVEL_COLORS[level.toLowerCase()] ?? DEFAULT_LEVEL_COLOR
}
