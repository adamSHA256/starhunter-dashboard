# StarHunter GraphQL API Schema

**Endpoint:** `https://release-current.starhunter.software/Api/graphql`
**Auth:** `Authorization: Bearer <token>`
**Introspected:** 2026-03-29

---

## Table of Contents

- [Custom Scalars](#custom-scalars)
- [Enum Types](#enum-types)
- [Interfaces](#interfaces)
- [Object Types](#object-types)
- [Queries](#queries)
- [Mutations](#mutations)
- [Directives](#directives)
- [Relationship Graph](#relationship-graph)

---

## Custom Scalars

| Scalar | Description |
|--------|-------------|
| `Id` | Unique ID consisting of a 13 character hex string |
| `DateTime` | DateTime in ISO 8601 format |
| `Date` | Date in ISO 8601 format |
| `BirthDate` | Date without Year (MM-DD) |

---

## Enum Types

### TargetEnum

| Value |
|-------|
| `Project` |
| `Company` |
| `Person` |
| `Candidate` |

---

## Interfaces

### BaseInterface

Common entity fields shared across most domain objects.

| Field | Type |
|-------|------|
| `id` | `Id!` |
| `name` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

**Implemented by:** Person, Project, Candidate, Employee, Company, ContactPerson

---

### PersonInterface

Extends BaseInterface with person-specific fields.

| Field | Type | Args |
|-------|------|------|
| `id` | `Id!` | |
| `name` | `String` | |
| `createdAt` | `DateTime` | |
| `updatedAt` | `DateTime` | |
| `firstName` | `String` | |
| `middleName` | `String` | |
| `secondName` | `String` | |
| `academicTitle` | `String` | |
| `salutation` | `String` | |
| `birthDate` | `Date` | |
| `functions` | `String` | |
| `email` | `String` | |
| `phone` | `String` | |
| `address` | `String` | |
| `avatar` | `String` | `size: Int` |

**Implemented by:** Person, Candidate, Employee, ContactPerson

---

## Object Types

### Person

**Implements:** `BaseInterface`, `PersonInterface`

| Field | Type | Args |
|-------|------|------|
| `id` | `Id!` | |
| `name` | `String` | |
| `createdAt` | `DateTime` | |
| `updatedAt` | `DateTime` | |
| `firstName` | `String` | |
| `middleName` | `String` | |
| `secondName` | `String` | |
| `academicTitle` | `String` | |
| `salutation` | `String` | |
| `birthDate` | `Date` | |
| `functions` | `String` | |
| `email` | `String` | |
| `phone` | `String` | |
| `address` | `String` | |
| `avatar` | `String` | `size: Int` |

---

### Project

**Implements:** `BaseInterface`

| Field | Type | Args |
|-------|------|------|
| `id` | `Id!` | |
| `name` | `String` | |
| `createdAt` | `DateTime` | |
| `updatedAt` | `DateTime` | |
| `status` | `String` | |
| `statusUpdatedAt` | `DateTime` | |
| `status_updated_at` | `DateTime` | |
| `position` | `String` | |
| `startDate` | `Date` | |
| `endDate` | `Date` | |
| `candidateCount` | `Int` | |
| `company` | `String` | |
| `candidates` | `[ProjectCandidate]` | `status: String` |
| `teamMembers` | `[InterviewConsultant]` | |
| `contactPersons` | `[InterviewConsultant]` | |
| `interviews` | `[Interview]` | |
| `tasks` | `[Task]` | |
| `invoices` | `[Invoice]` | |
| `showInPortal` | `Boolean` | |
| `publishingDate` | `Date` | |
| `jobNumber` | `String` | |
| `jobIntroduction` | `String` | |
| `jobDescription` | `String` | |
| `visibility` | `String` | |
| `employmentType` | `String` | |
| `maxSalary` | `Float` | |
| `closingDate` | `Date` | |
| `postingCode` | `String` | |
| `level` | `String` | |
| `leadershipExperience` | `String` | |
| `source` | `String` | |
| `minSalary` | `Float` | |
| `cost` | `Int` | |
| `probability` | `Float` | |
| `functionTitle` | `String` | |
| `companyCached` | `String` | |
| `clientCached` | `String` | |
| `parentCompanyName` | `String` | |
| `accessHash` | `String` | |
| `customerFeedback` | `String` | |
| `background` | `String` | |
| `location` | `String` | |
| `limitedEmployment` | `Boolean` | |
| `limitedEmploymentUntil` | `Date` | |
| `candidateBenefits` | `String` | |
| `reportingPath` | `String` | |
| `peers` | `String` | |
| `startDateTo` | `Date` | |
| `fee` | `Float` | |
| `candidatesType` | `String` | |
| `keyWords` | `String` | |
| `employmentFactorMax` | `Float` | |
| `employmentFactorMin` | `Float` | |
| `notifyNewMatchings` | `Boolean` | |
| `remarks` | `String` | |
| `projectNumber` | `String` | |
| `activeExportsCache` | `String` | |
| `numberPapi` | `Int` | |
| `numberApplicationDocuments` | `Int` | |
| `numberPromotion` | `Int` | |
| `importId` | `String` | |
| `countCalls` | `Int` | |
| `countCallsSuccessful` | `Int` | |
| `countCallsUnsuccessful` | `Int` | |
| `jobadIntroduction` | `String` | |
| `jobadTask` | `String` | |
| `jobadOffer` | `String` | |
| `jobadProfile` | `String` | |
| `jobadContact` | `String` | |
| `jobadCompany` | `String` | |
| `locationPostalCode` | `String` | |
| `homeoffice` | `String` | |
| `passwordShortlonglist` | `String` | |
| `shareHashMigrated` | `Boolean` | |
| `minAge` | `Int` | |
| `maxAge` | `Int` | |
| `searchprofileStartDate` | `Date` | |
| `universityQualificationGradeWeight` | `Int` | |
| `assessedSum` | `Float` | |
| `jobadIntroductionTitle` | `String` | |
| `jobadTaskTitle` | `String` | |
| `jobadOfferTitle` | `String` | |
| `jobadProfileTitle` | `String` | |
| `jobadContactTitle` | `String` | |
| `startDateFrom` | `Date` | |
| `industryTitle` | `String` | |
| `searchType` | `String` | |
| `titleCached` | `String` | |
| `agenda` | `String` | |
| `color` | `String` | |
| `difficulties` | `String` | |
| `dueDate` | `Date` | |
| `customerApproval` | `String` | |
| `reviewOfNewProject` | `String` | |
| `serviceAgreement` | `String` | |
| `serviceContractAmount` | `Float` | |
| `serviceContractDate` | `Date` | |
| `serviceContractName` | `String` | |
| `billingStatus` | `String` | |
| `billingType` | `String` | |
| `projectType` | `String` | |
| `nextGoal` | `String` | |
| `forcast` | `String` | |
| `futurePotential` | `String` | |
| `elunicNotes` | `String` | |

**Relations:** `candidates` -> [ProjectCandidate], `teamMembers` -> [InterviewConsultant], `contactPersons` -> [InterviewConsultant], `interviews` -> [Interview], `tasks` -> [Task], `invoices` -> [Invoice]

---

### ProjectCandidate

| Field | Type |
|-------|------|
| `id` | `Id` |
| `status` | `String` |
| `changeDate` | `Date` |
| `rejectionReason` | `String` |
| `person` | `Person!` |
| `candidate` | `Candidate` |
| `project` | `Project` |

**Relations:** `person` -> Person, `candidate` -> Candidate, `project` -> Project

---

### Candidate

**Implements:** `BaseInterface`, `PersonInterface`

| Field | Type | Args |
|-------|------|------|
| `id` | `Id!` | |
| `name` | `String` | |
| `createdAt` | `DateTime` | |
| `updatedAt` | `DateTime` | |
| `firstName` | `String` | |
| `middleName` | `String` | |
| `secondName` | `String` | |
| `academicTitle` | `String` | |
| `salutation` | `String` | |
| `birthDate` | `Date` | |
| `functions` | `String` | |
| `email` | `String` | |
| `phone` | `String` | |
| `address` | `String` | |
| `avatar` | `String` | `size: Int` |
| `contactHistory` | `[Activity]` | |
| `availableFrom` | `Date` | |
| `availabilityDate` | `Date` | |
| `candidateNumber` | `String` | |
| `status` | `String` | |
| `level` | `String` | |
| `rating` | `Int` | |
| `salary` | `String` | |
| `currentSalary` | `Float` | |
| `salaryRequirement` | `Float` | |
| `totalSalary` | `Int` | |
| `salaryRange` | `String` | |
| `salaryIsAskingPrice` | `Boolean` | |
| `gBonus` | `String` | |
| `pBonus` | `String` | |
| `employmentFactorMin` | `Float` | |
| `employmentFactorMax` | `Float` | |
| `noticePeriod` | `String` | |
| `noticePeriodUnit` | `String` | |
| `numericNoticePeriod` | `Int` | |
| `currentLocation` | `String` | |
| `matchingRadius` | `Int` | |
| `shortProfile` | `String` | |
| `source` | `String` | |
| `graduation` | `String` | |
| `birthPlace` | `String` | |
| `maritalStatus` | `String` | |
| `jobExperience` | `Int` | |
| `managerialResponsibility` | `Int` | |
| `inActiveProject` | `Boolean` | |
| `optin` | `Boolean` | |
| `optinValidUntilDate` | `Date` | |
| `optinMailSent` | `Boolean` | |
| `specialPropertiesText` | `String` | |
| `spouseName` | `String` | |
| `spouseKnown` | `Boolean` | |
| `lastTotalSalary` | `String` | |
| `totalSalaryDate` | `String` | |
| `lastTotalSalaryDate` | `String` | |
| `tbm` | `String` | |
| `rfXmas1` | `String` | |
| `rfXmas2` | `String` | |
| `rfXmas3` | `String` | |
| `rfXmasYear` | `String` | |
| `sourceOk` | `Boolean` | |
| `secretaryName` | `String` | |
| `incomeLti` | `String` | |
| `incomeStoxx` | `String` | |
| `incomeFreeLabel` | `String` | |
| `incomeFree` | `String` | |
| `freeUrl1` | `String` | |
| `freeUrl2` | `String` | |
| `freeUrl3` | `String` | |
| `candidateId` | `String` | |
| `importId` | `String` | |
| `optinMailSentDate` | `Date` | |
| `notifyMatchings` | `Boolean` | |
| `disableOptinMailReminder` | `Boolean` | |
| `possibleDuplicate` | `Boolean` | |
| `optinReceivedTwoReminders` | `Boolean` | |
| `optinReceivedTwoDeleteReminders` | `Boolean` | |
| `industriesCached` | `String` | |
| `educationsCached` | `String` | |
| `functionsCached` | `String` | |
| `qualifiersCached` | `String` | |
| `skillsCached` | `String` | |
| `otherSkillsCache` | `String` | |
| `languageSkillsCache` | `String` | |
| `gender` | `String` | |
| `linkedinUrl` | `String` | |
| `xingUrl` | `String` | |
| `trackRecord` | `String` | |
| `profession` | `String` | |
| `website` | `String` | |
| `facebookUrl` | `String` | |
| `googlePlusUrl` | `String` | |
| `twitterUrl` | `String` | |
| `companyName` | `String` | |
| `dateOfBirth` | `Date` | |
| `familyStatus` | `String` | |
| `sipgateNumber` | `String` | |
| `perDu` | `Boolean` | |
| `personExternalId` | `String` | |
| `allCompaniesCache` | `String` | |
| `careerPositionsCache` | `String` | |
| `currentCareerPositionCache` | `String` | |
| `currentCareerCompanyCache` | `String` | |
| `sgptCache` | `String` | |
| `elunicNotes` | `String` | |
| `instanceColor` | `String` | |
| `state` | `Int` | |
| `regions` | `String` | |
| `candidateSince` | `Date` | |
| `mailDeliveryMethod` | `String` | |
| `tagsCached` | `String` | |
| `mailsCached` | `String` | |
| `phoneNumbersCached` | `String` | |
| `addressesCache` | `String` | |
| `furtherValuesCache` | `String` | |
| `websitesCached` | `String` | |
| `projects` | `[ProjectCandidate]` | `status: String` |
| `responsiblePersons` | `[InterviewConsultant]` | |
| `interviews` | `[Interview]` | |

**Relations:** `contactHistory` -> [Activity], `projects` -> [ProjectCandidate], `responsiblePersons` -> [InterviewConsultant], `interviews` -> [Interview]

---

### Employee

**Implements:** `BaseInterface`, `PersonInterface`

| Field | Type | Args |
|-------|------|------|
| `id` | `Id!` | |
| `name` | `String` | |
| `createdAt` | `DateTime` | |
| `updatedAt` | `DateTime` | |
| `firstName` | `String` | |
| `middleName` | `String` | |
| `secondName` | `String` | |
| `academicTitle` | `String` | |
| `salutation` | `String` | |
| `birthDate` | `Date` | |
| `functions` | `String` | |
| `email` | `String` | |
| `phone` | `String` | |
| `address` | `String` | |
| `avatar` | `String` | `size: Int` |
| `contactHistory` | `[Activity]` | |

**Relations:** `contactHistory` -> [Activity]

---

### Company

**Implements:** `BaseInterface`

| Field | Type |
|-------|------|
| `id` | `Id!` |
| `name` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `phone` | `String` |
| `email` | `String` |
| `address` | `String` |
| `companyName` | `String` |
| `nameHistory` | `String` |
| `searchInfo` | `String` |
| `legalStructure` | `String` |
| `employeesCount` | `Int` |
| `sales` | `Float` |
| `customerAdditionalInfo` | `String` |
| `posLat` | `Float` |
| `posLong` | `Float` |
| `vatNumber` | `String` |
| `source` | `String` |
| `importId` | `String` |
| `elunicNotes` | `String` |
| `instanceColor` | `String` |
| `state` | `String` |
| `regions` | `String` |
| `candidateSince` | `Date` |
| `mailDeliveryMethod` | `String` |
| `tagsCached` | `String` |
| `mailsCached` | `String` |
| `phoneNumbersCached` | `String` |
| `addressesCache` | `String` |
| `furtherValuesCache` | `String` |
| `websitesCached` | `String` |
| `files` | `[File]` |

**Relations:** `files` -> [File]

---

### ContactPerson

**Implements:** `BaseInterface`, `PersonInterface`

| Field | Type | Args |
|-------|------|------|
| `id` | `Id!` | |
| `name` | `String` | |
| `createdAt` | `DateTime` | |
| `updatedAt` | `DateTime` | |
| `firstName` | `String` | |
| `middleName` | `String` | |
| `secondName` | `String` | |
| `academicTitle` | `String` | |
| `salutation` | `String` | |
| `birthDate` | `Date` | |
| `functions` | `String` | |
| `email` | `String` | |
| `phone` | `String` | |
| `address` | `String` | |
| `avatar` | `String` | `size: Int` |

---

### Interview

| Field | Type |
|-------|------|
| `id` | `Id!` |
| `date` | `DateTime` |
| `notes` | `String` |
| `suggestion` | `String` |
| `change_motivation` | `String` |
| `charges` | `Boolean` |
| `consultants` | `[InterviewConsultant]` |

**Relations:** `consultants` -> [InterviewConsultant]

---

### InterviewConsultant

| Field | Type |
|-------|------|
| `id` | `Id` |
| `name` | `String` |
| `role` | `String` |

---

### Task

| Field | Type |
|-------|------|
| `id` | `Id` |
| `title` | `String` |
| `description` | `String` |
| `deadline` | `Date` |
| `status` | `String` |
| `assigneeId` | `Id` |
| `targetId` | `Id` |
| `targetType` | `TargetEnum` |
| `assignee` | `Employee` |

**Relations:** `assignee` -> Employee

---

### Invoice

| Field | Type |
|-------|------|
| `id` | `Id` |
| `number` | `String` |
| `date` | `Date` |
| `paymentDate` | `Date` |
| `netSum` | `Float` |
| `grossSum` | `Float` |
| `status` | `String` |
| `subject` | `String` |

---

### Activity

| Field | Type |
|-------|------|
| `title` | `String` |
| `type` | `String` |
| `date` | `DateTime` |

---

### File

| Field | Type |
|-------|------|
| `id` | `Id!` |
| `name` | `String` |
| `url` | `String` |

---

### Customer

| Field | Type |
|-------|------|
| `id` | `Id!` |
| `customerId` | `Id` |
| `companyId` | `Id` |

---

### CvData

| Field | Type |
|-------|------|
| `firstName` | `String` |
| `lastName` | `String` |
| `academicTitle` | `String` |
| `birthDate` | `String` |
| `email` | `String` |
| `phone` | `String` |
| `address` | `String` |
| `zipCode` | `String` |
| `city` | `String` |
| `country` | `String` |
| `career` | `[CvCareerItem]` |
| `education` | `[CvEducationItem]` |
| `language` | `[CvLanguageSkill]` |

**Relations:** `career` -> [CvCareerItem], `education` -> [CvEducationItem], `language` -> [CvLanguageSkill]

---

### CvCareerItem

| Field | Type |
|-------|------|
| `company` | `String` |
| `position` | `String` |
| `from` | `String` |
| `to` | `String` |

---

### CvEducationItem

| Field | Type |
|-------|------|
| `institute` | `String` |
| `description` | `String` |
| `from` | `String` |
| `to` | `String` |

---

### CvLanguageSkill

| Field | Type |
|-------|------|
| `language` | `String` |
| `skillLevel` | `String` |

---

## Queries

### `version`
- **Returns:** `String`
- **Args:** none

### `persons`
- **Returns:** `[Person]`
- **Args:** `name: String`, `birthDate: BirthDate`, `limit: Int`, `offset: Int`

### `person`
- **Returns:** `Person`
- **Args:** `id: Id!`

### `projects`
- **Returns:** `[Project]`
- **Args:** `status: String`, `limit: Int`, `offset: Int`

### `project`
- **Returns:** `Project`
- **Args:** `id: Id!`

### `projectCandidates`
- **Returns:** `[ProjectCandidate]`
- **Args:** `projectId: Id`, `status: String`, `limit: Int`, `offset: Int`

### `presentations`
- **Returns:** `[ProjectCandidate]`
- **Args:** `projectId: Id`, `candidateId: Id`, `status: String`, `limit: Int`, `offset: Int`

### `candidate`
- **Returns:** `[Candidate]`
- **Args:** `candidateId: Id`, `birthDate: BirthDate`, `name: String`, `limit: Int`, `offset: Int`

### `candidates`
- **Returns:** `[Candidate]`
- **Args:** `birthDate: BirthDate`, `name: String`, `limit: Int`, `offset: Int`

### `employee`
- **Returns:** `[Employee]`
- **Args:** `employeeId: Id`, `name: String`, `limit: Int`, `offset: Int`

### `user`
- **Returns:** `Employee`
- **Args:** none

### `companies`
- **Returns:** `[Company]`
- **Args:** `name: String`, `limit: Int`, `offset: Int`

### `interviews`
- **Returns:** `[Interview]`
- **Args:** `candidateId: Id`, `projectId: Id`, `limit: Int`, `offset: Int`

### `tasks`
- **Returns:** `[Task]`
- **Args:** `targetId: Id`, `assigneeId: Id`, `status: String`, `limit: Int`, `offset: Int`

### `invoices`
- **Returns:** `[Invoice]`
- **Args:** `projectId: Id`, `companyId: Id`, `status: String`, `limit: Int`, `offset: Int`

---

## Mutations

### `createTask`
- **Returns:** `Task`
- **Args:** `title: String!`, `description: String`, `deadline: Date`, `assignee: Id`, `target: Id`

### `logEmail`
- **Returns:** `Boolean`
- **Args:** `from: String!`, `to: String!`, `subject: String!`, `body: String!`

### `createEmployee`
- **Returns:** `Employee`
- **Args:** `firstName: String!`, `lastName: String!`, `email: String`, `phone: String`

### `createCandidate`
- **Returns:** `Candidate`
- **Args:** `firstName: String!`, `lastName: String!`, `salutation: String`, `academicTitle: String`, `email: String`, `phone: String`, `birthDate: Date`

### `updateCandidate`
- **Returns:** `Candidate`
- **Args:** `id: Id!`, `availableFrom: Date`, `availabilityDate: Date`, `status: String`, `level: String`, `rating: Int`, `salary: String`, `currentSalary: Float`, `salaryRequirement: Float`, `totalSalary: Int`, `salaryRange: String`, `salaryIsAskingPrice: Boolean`, `gBonus: String`, `pBonus: String`, `employmentFactorMin: Float`, `employmentFactorMax: Float`, `noticePeriod: String`, `noticePeriodUnit: String`, `numericNoticePeriod: Int`, `currentLocation: String`, `matchingRadius: Int`, `shortProfile: String`, `source: String`, `graduation: String`, `birthPlace: String`, `maritalStatus: String`, `jobExperience: Int`, `managerialResponsibility: Int`, `inActiveProject: Boolean`, `optin: Boolean`, `optinValidUntilDate: Date`, `optinMailSent: Boolean`, `specialPropertiesText: String`, `spouseName: String`, `spouseKnown: Boolean`, `lastTotalSalary: String`, `totalSalaryDate: String`, `lastTotalSalaryDate: String`, `tbm: String`, `rfXmas1: String`, `rfXmas2: String`, `rfXmas3: String`, `rfXmasYear: String`, `sourceOk: Boolean`, `secretaryName: String`, `incomeLti: String`, `incomeStoxx: String`, `incomeFreeLabel: String`, `incomeFree: String`, `freeUrl1: String`, `freeUrl2: String`, `freeUrl3: String`, `candidateId: String`, `importId: String`, `optinMailSentDate: Date`, `notifyMatchings: Boolean`, `disableOptinMailReminder: Boolean`, `possibleDuplicate: Boolean`, `optinReceivedTwoReminders: Boolean`, `optinReceivedTwoDeleteReminders: Boolean`, `industriesCached: String`, `educationsCached: String`, `functionsCached: String`, `qualifiersCached: String`, `skillsCached: String`, `otherSkillsCache: String`, `languageSkillsCache: String`, `firstName: String`, `lastName: String`, `middleName: String`, `salutation: String`, `academicTitle: String`, `birthdate: Date`, `gender: String`, `linkedinUrl: String`, `xingUrl: String`, `trackRecord: String`, `profession: String`, `website: String`, `facebookUrl: String`, `googlePlusUrl: String`, `twitterUrl: String`, `companyName: String`, `dateOfBirth: Date`, `familyStatus: String`, `sipgateNumber: String`, `perDu: Boolean`, `personExternalId: String`, `elunicNotes: String`, `instanceColor: String`, `state: Int`, `regions: String`, `candidateSince: Date`, `mailDeliveryMethod: String`

### `parseCv`
- **Returns:** `CvData`
- **Args:** `fileContent: String!`, `fileName: String!`

### `setResponsiblePerson`
- **Returns:** `Candidate`
- **Args:** `candidateId: Id!`, `employeeId: Id!`

### `createProject`
- **Returns:** `Project`
- **Args:** `name: String!`, `status: String`, `position: String`, `startDate: Date`, `endDate: Date`

### `updateProject`
- **Returns:** `Project`
- **Args:** `id: Id!`, `status: String`, `position: String`, `startDate: Date`, `endDate: Date`, `source: String`, `minSalary: Float`, `maxSalary: Float`, `cost: Int`, `probability: Float`, `functionTitle: String`, `parentCompanyName: String`, `customerFeedback: String`, `background: String`, `location: String`, `employmentType: String`, `limitedEmployment: Boolean`, `limitedEmploymentUntil: Date`, `candidateBenefits: String`, `reportingPath: String`, `peers: String`, `startDateTo: Date`, `fee: Float`, `candidatesType: String`, `keyWords: String`, `employmentFactorMax: Float`, `employmentFactorMin: Float`, `notifyNewMatchings: Boolean`, `remarks: String`, `importId: String`, `jobIntroduction: String`, `jobDescription: String`, `visibility: String`, `closingDate: Date`, `postingCode: String`, `level: String`, `leadershipExperience: Int`, `jobadIntroduction: String`, `jobadTask: String`, `jobadOffer: String`, `jobadProfile: String`, `jobadContact: String`, `jobadCompany: String`, `locationPostalCode: String`, `homeoffice: String`, `passwordShortlonglist: String`, `minAge: Int`, `maxAge: Int`, `searchprofileStartDate: Date`, `universityQualificationGradeWeight: Int`, `assessedSum: Float`, `jobadIntroductionTitle: String`, `jobadTaskTitle: String`, `jobadOfferTitle: String`, `jobadProfileTitle: String`, `jobadContactTitle: String`, `startDateFrom: Date`, `industryTitle: String`, `searchType: String`, `agenda: String`, `color: String`, `difficulties: String`, `dueDate: Date`, `customerApproval: String`, `reviewOfNewProject: String`, `serviceAgreement: String`, `serviceContractAmount: Float`, `serviceContractDate: Date`, `serviceContractName: String`, `billingStatus: String`, `billingType: String`, `projectType: String`, `nextGoal: String`, `forcast: String`, `futurePotential: String`, `elunicNotes: String`

### `addCandidateToProject`
- **Returns:** `ProjectCandidate`
- **Args:** `projectId: Id!`, `candidateId: Id!`, `status: String`

### `updatePresentationStatus`
- **Returns:** `ProjectCandidate`
- **Args:** `presentationId: Id!`, `status: String!`, `comment: String`

### `setProjectCompany`
- **Returns:** `Project`
- **Args:** `projectId: Id!`, `companyId: Id!`

### `addProjectTeamMember`
- **Returns:** `Project`
- **Args:** `projectId: Id!`, `employeeId: Id!`, `role: String!`

### `addProjectContactPerson`
- **Returns:** `Project`
- **Args:** `projectId: Id!`, `personId: Id!`

### `setProjectPortalSettings`
- **Returns:** `Project`
- **Args:** `projectId: Id!`, `showInPortal: Boolean`, `publishingDate: Date`

### `createCompany`
- **Returns:** `Company`
- **Args:** `name: String!`

### `updateCompany`
- **Returns:** `Company`
- **Args:** `id: Id!`, `companyName: String`, `nameHistory: String`, `searchInfo: String`, `legalStructure: String`, `employeesCount: Int`, `sales: Float`, `customerAdditionalInfo: String`, `posLat: Float`, `posLong: Float`, `vatNumber: String`, `source: String`, `importId: String`, `elunicNotes: String`, `instanceColor: String`, `state: Int`, `regions: String`, `candidateSince: Date`, `mailDeliveryMethod: String`

### `createCustomer`
- **Returns:** `Customer`
- **Args:** `companyId: Id!`

### `uploadCompanyFile`
- **Returns:** `File`
- **Args:** `companyId: Id!`, `fileContent: String!`, `fileName: String!`

### `uploadCustomerFile`
- **Returns:** `File`
- **Args:** `customerId: Id!`, `fileContent: String!`, `fileName: String!`

### `createInterview`
- **Returns:** `Interview`
- **Args:** `candidateId: Id!`, `projectId: Id`, `date: DateTime`, `notes: String`, `consultantId: Id`, `change_motivation: String`, `suggestion: String`, `charges: Boolean`

### `createInvoice`
- **Returns:** `Invoice`
- **Args:** `projectId: Id`, `companyId: Id`, `subject: String`, `invoiceDate: Date`

### `uploadFile`
- **Returns:** `File`
- **Args:** `fileContent: String!`, `fileName: String!`

### `createContactable`
- **Returns:** `Person`
- **Args:** `firstName: String!`, `lastName: String!`, `salutation: String`, `academicTitle: String`, `email: String`, `phone: String`, `birthDate: Date`

### `createContactPerson`
- **Returns:** `ContactPerson`
- **Args:** `firstName: String!`, `lastName: String!`, `salutation: String`, `academicTitle: String`, `email: String`, `phone: String`, `birthDate: Date`

### `uploadContactPersonFile`
- **Returns:** `File`
- **Args:** `contactPersonId: Id!`, `fileContent: String!`, `fileName: String!`

---

## Directives

| Directive | Locations | Args | Description |
|-----------|-----------|------|-------------|
| `@include` | FIELD, FRAGMENT_SPREAD, INLINE_FRAGMENT | `if: Boolean!` | Include field when `if` is true |
| `@skip` | FIELD, FRAGMENT_SPREAD, INLINE_FRAGMENT | `if: Boolean!` | Skip field when `if` is true |
| `@deprecated` | FIELD_DEFINITION, ENUM_VALUE, ARGUMENT_DEFINITION, INPUT_FIELD_DEFINITION | `reason: String` | Mark as deprecated |
| `@oneOf` | INPUT_OBJECT | *(none)* | Require exactly one field |

---

## Relationship Graph

```
Project (central entity)
  |-- candidates --------> [ProjectCandidate] (join table)
  |       |-- person -------> Person
  |       |-- candidate ----> Candidate
  |       |-- project ------> Project (back-ref)
  |-- teamMembers -------> [InterviewConsultant]
  |-- contactPersons ----> [InterviewConsultant]
  |-- interviews --------> [Interview]
  |       |-- consultants -> [InterviewConsultant]
  |-- tasks -------------> [Task]
  |       |-- assignee ----> Employee
  |-- invoices ----------> [Invoice]

Candidate
  |-- contactHistory ----> [Activity]
  |-- projects ----------> [ProjectCandidate] (back-ref to Project)
  |-- responsiblePersons > [InterviewConsultant]
  |-- interviews --------> [Interview]

Employee
  |-- contactHistory ----> [Activity]

Company
  |-- files -------------> [File]

CvData (from parseCv mutation)
  |-- career ------------> [CvCareerItem]
  |-- education ---------> [CvEducationItem]
  |-- language ----------> [CvLanguageSkill]
```

### Type Hierarchy (Interfaces)

```
BaseInterface
  |-- Person (+ PersonInterface)
  |-- Candidate (+ PersonInterface)
  |-- Employee (+ PersonInterface)
  |-- ContactPerson (+ PersonInterface)
  |-- Project
  |-- Company
```

---

## Summary

| Category | Count |
|----------|-------|
| Queries | 15 |
| Mutations | 26 |
| Object types | 16 |
| Interfaces | 2 |
| Enums | 1 |
| Custom scalars | 4 |
| Input types | 0 |
| Directives | 4 |
