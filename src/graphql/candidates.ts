import { gql } from '@apollo/client'

export const CANDIDATE_LIST_FIELDS = gql`
  fragment CandidateListFields on Candidate {
    id
    name
    firstName
    secondName
    email
    phone
    avatar(size: 80)
    status
    level
    currentLocation
    profession
    companyName
    candidateNumber
    rating
    availableFrom
    candidateSince
    createdAt
    updatedAt
  }
`

export const CANDIDATE_DETAIL_FIELDS = gql`
  fragment CandidateDetailFields on Candidate {
    id
    name
    firstName
    middleName
    secondName
    academicTitle
    salutation
    gender
    email
    phone
    address
    avatar(size: 200)
    birthDate
    dateOfBirth
    birthPlace
    maritalStatus
    familyStatus

    # Professional
    status
    level
    rating
    profession
    companyName
    currentLocation
    matchingRadius
    shortProfile
    trackRecord
    jobExperience
    managerialResponsibility
    graduation
    candidateNumber
    candidateId
    candidateSince
    source
    sourceOk

    # Salary & compensation
    salary
    currentSalary
    salaryRequirement
    totalSalary
    salaryRange
    salaryIsAskingPrice
    gBonus
    pBonus

    # Employment
    employmentFactorMin
    employmentFactorMax
    noticePeriod
    noticePeriodUnit
    numericNoticePeriod
    availableFrom
    availabilityDate
    inActiveProject

    # Cached tags
    industriesCached
    educationsCached
    functionsCached
    qualifiersCached
    skillsCached
    otherSkillsCache
    languageSkillsCache
    tagsCached

    # Social & web
    linkedinUrl
    xingUrl
    website
    facebookUrl
    twitterUrl
    freeUrl1
    freeUrl2
    freeUrl3

    # Opt-in
    optin
    optinValidUntilDate
    optinMailSent
    optinMailSentDate

    # Misc
    regions
    instanceColor
    state
    elunicNotes
    personExternalId
    perDu
    specialPropertiesText

    # Timestamps
    createdAt
    updatedAt

    # Relations
    projects {
      id
      status
      changeDate
      rejectionReason
      project {
        id
        name
        status
        position
        company
      }
    }
    responsiblePersons {
      id
      name
      role
    }
    interviews {
      id
      date
      notes
      suggestion
      change_motivation
      charges
      consultants {
        id
        name
        role
      }
    }
    contactHistory {
      title
      type
      date
    }
  }
`

/**
 * List candidates with optional name/birthDate search and pagination.
 */
export const GET_CANDIDATES = gql`
  ${CANDIDATE_LIST_FIELDS}
  query GetCandidates(
    $name: String
    $birthDate: BirthDate
    $limit: Int
    $offset: Int
  ) {
    candidates(
      name: $name
      birthDate: $birthDate
      limit: $limit
      offset: $offset
    ) {
      ...CandidateListFields
    }
  }
`

/**
 * Fetch a single candidate by ID (also works as search-by-id).
 */
export const GET_CANDIDATE = gql`
  ${CANDIDATE_LIST_FIELDS}
  query GetCandidate(
    $candidateId: Id
    $birthDate: BirthDate
    $name: String
    $limit: Int
    $offset: Int
  ) {
    candidate(
      candidateId: $candidateId
      birthDate: $birthDate
      name: $name
      limit: $limit
      offset: $offset
    ) {
      ...CandidateListFields
    }
  }
`

/**
 * Fetch full candidate details with all relations.
 */
export const GET_CANDIDATE_DETAILS = gql`
  ${CANDIDATE_DETAIL_FIELDS}
  query GetCandidateDetails(
    $candidateId: Id
    $limit: Int
    $offset: Int
  ) {
    candidate(
      candidateId: $candidateId
      limit: $limit
      offset: $offset
    ) {
      ...CandidateDetailFields
    }
  }
`

/**
 * Search candidates by name (partial match).
 */
export const SEARCH_CANDIDATES = gql`
  ${CANDIDATE_LIST_FIELDS}
  query SearchCandidates($name: String!, $limit: Int, $offset: Int) {
    candidates(name: $name, limit: $limit, offset: $offset) {
      ...CandidateListFields
    }
  }
`

/**
 * Get candidates assigned to a specific project.
 */
export const GET_PROJECT_CANDIDATES = gql`
  query GetProjectCandidates(
    $projectId: Id
    $status: String
    $limit: Int
    $offset: Int
  ) {
    projectCandidates(
      projectId: $projectId
      status: $status
      limit: $limit
      offset: $offset
    ) {
      id
      status
      changeDate
      rejectionReason
      person {
        id
        name
        email
        phone
        avatar(size: 80)
      }
      candidate {
        id
        name
        status
        level
        rating
        currentLocation
        profession
        companyName
        candidateNumber
        availableFrom
      }
      project {
        id
        name
        status
      }
    }
  }
`

/**
 * Get presentation history for a candidate across projects.
 */
export const GET_PRESENTATIONS = gql`
  query GetPresentations(
    $projectId: Id
    $candidateId: Id
    $status: String
    $limit: Int
    $offset: Int
  ) {
    presentations(
      projectId: $projectId
      candidateId: $candidateId
      status: $status
      limit: $limit
      offset: $offset
    ) {
      id
      status
      changeDate
      rejectionReason
      person {
        id
        name
      }
      candidate {
        id
        name
        status
      }
      project {
        id
        name
        status
        position
        company
      }
    }
  }
`
