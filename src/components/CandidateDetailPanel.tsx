import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { GET_CANDIDATE_DETAILS } from '../graphql/candidates'
import type { GetCandidateDetailsData, GetCandidateDetailsVars, CandidateDetail } from '../types/candidate'
import { getStatusColor } from '../types/candidate'
import { ASSET_BASE_URL } from '../lib/apollo'

interface CandidateDetailPanelProps {
  candidateId: string | null
  onClose: () => void
}

function getInitials(firstName: string | null, secondName: string | null): string {
  const first = firstName?.[0] ?? ''
  const second = secondName?.[0] ?? ''
  return (first + second).toUpperCase() || '?'
}

/** Render a 2-column label/value pair, skipping null values. */
function Field({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === '') return null
  return (
    <div>
      <dt className="text-xs text-gray-500 uppercase">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  )
}

function StarRating({ rating }: { rating: number | null }) {
  const filled = Math.round(Math.min(Math.max(rating ?? 0, 0), 5))
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < filled ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.065 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.284-3.957z" />
        </svg>
      ))}
    </div>
  )
}

function ExternalLink({ href, label }: { href: string | null; label: string }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 underline"
    >
      {label}
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-4.5h6m0 0v6m0-6L9.75 14.25" />
      </svg>
    </a>
  )
}

function LoadingSkeleton() {
  return (
    <div className="px-6 py-8 space-y-6 animate-pulse">
      {/* Avatar circle */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      {/* Text lines */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  )
}

function DetailContent({ detail }: { detail: CandidateDetail }) {
  const fullName = [detail.academicTitle, detail.firstName, detail.middleName, detail.secondName]
    .filter(Boolean)
    .join(' ') || detail.name || 'Unknown'

  const hasLinks = detail.linkedinUrl || detail.xingUrl || detail.website
  const hasProjects = detail.projects && detail.projects.length > 0

  const hasCompensation =
    detail.salary !== null ||
    detail.currentSalary !== null ||
    detail.salaryRequirement !== null ||
    detail.salaryRange !== null ||
    detail.noticePeriod !== null

  const hasAvailability =
    detail.availableFrom !== null ||
    detail.availabilityDate !== null ||
    detail.employmentFactorMin !== null ||
    detail.employmentFactorMax !== null ||
    detail.inActiveProject !== null

  const employmentRange =
    detail.employmentFactorMin !== null && detail.employmentFactorMax !== null
      ? `${detail.employmentFactorMin}% – ${detail.employmentFactorMax}%`
      : detail.employmentFactorMin !== null
        ? `${detail.employmentFactorMin}%`
        : detail.employmentFactorMax !== null
          ? `${detail.employmentFactorMax}%`
          : null

  const noticePeriodDisplay =
    detail.noticePeriod !== null
      ? `${detail.noticePeriod}${detail.noticePeriodUnit ? ` ${detail.noticePeriodUnit}` : ''}`
      : null

  return (
    <>
      {/* Profile header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl shrink-0 overflow-hidden">
            {detail.avatar ? (
              <img
                src={`${ASSET_BASE_URL}${detail.avatar}`}
                alt={fullName}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              getInitials(detail.firstName, detail.secondName)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{fullName}</h2>
            {detail.email && (
              <a
                href={`mailto:${detail.email}`}
                className="text-sm text-indigo-600 hover:text-indigo-800 truncate block"
              >
                {detail.email}
              </a>
            )}
            {detail.phone && (
              <div className="text-sm text-gray-600">{detail.phone}</div>
            )}
            <div className="mt-1.5 flex items-center gap-3 flex-wrap">
              {detail.status && (
                <span
                  className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full inline-block ${getStatusColor(detail.status)}`}
                >
                  {detail.status}
                </span>
              )}
              <StarRating rating={detail.rating} />
            </div>
          </div>
        </div>
      </div>

      {/* Professional */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Professional</h3>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Field label="Profession" value={detail.profession} />
          <Field label="Company" value={detail.companyName} />
          <Field label="Level" value={detail.level} />
          <Field label="Experience" value={detail.jobExperience !== null ? `${detail.jobExperience} years` : null} />
          <Field label="Location" value={detail.currentLocation} />
          <Field label="Graduation" value={detail.graduation} />
          <Field label="Source" value={detail.source} />
        </dl>
      </div>

      {/* Compensation */}
      {hasCompensation && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Compensation</h3>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Field label="Salary" value={detail.salary} />
            <Field label="Current Salary" value={detail.currentSalary !== null ? `${detail.currentSalary.toLocaleString()}` : null} />
            <Field label="Salary Requirement" value={detail.salaryRequirement !== null ? `${detail.salaryRequirement.toLocaleString()}` : null} />
            <Field label="Salary Range" value={detail.salaryRange} />
            <Field label="Notice Period" value={noticePeriodDisplay} />
          </dl>
        </div>
      )}

      {/* Availability */}
      {hasAvailability && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Availability</h3>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Field label="Available From" value={detail.availableFrom} />
            <Field label="Availability Date" value={detail.availabilityDate} />
            <Field label="Employment Factor" value={employmentRange} />
            <Field label="In Active Project" value={detail.inActiveProject !== null ? (detail.inActiveProject ? 'Yes' : 'No') : null} />
          </dl>
        </div>
      )}

      {/* Projects */}
      {hasProjects && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Projects</h3>
          <div>
            {detail.projects!.map((pc) => (
              <div key={pc.id ?? pc.project?.id} className="bg-gray-50 rounded-lg p-3 mb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {pc.project?.name ?? 'Unnamed project'}
                  </span>
                  {pc.project?.status && (
                    <span
                      className={`capitalize text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${getStatusColor(pc.project.status)}`}
                    >
                      {pc.project.status}
                    </span>
                  )}
                </div>
                {pc.status && (
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">Candidate status:</span>
                    <span
                      className={`capitalize text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(pc.status)}`}
                    >
                      {pc.status}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {hasLinks && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Links</h3>
          <div className="space-y-2">
            <ExternalLink href={detail.linkedinUrl} label="LinkedIn" />
            <ExternalLink href={detail.xingUrl} label="Xing" />
            <ExternalLink href={detail.website} label="Website" />
          </div>
        </div>
      )}
    </>
  )
}

function CandidateDetailPanel({ candidateId, onClose }: CandidateDetailPanelProps) {
  const isOpen = candidateId !== null

  const [fetchDetails, { data, loading, error }] = useLazyQuery<
    GetCandidateDetailsData,
    GetCandidateDetailsVars
  >(GET_CANDIDATE_DETAILS)

  useEffect(() => {
    if (candidateId) {
      fetchDetails({ variables: { candidateId } })
    }
  }, [candidateId, fetchDetails])

  const detail = data?.candidate?.[0] ?? null

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`fixed top-16 right-0 bottom-0 z-50 w-full max-w-lg bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 truncate">
            Candidate
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {loading && <LoadingSkeleton />}

        {error && (
          <div className="px-6 py-4">
            <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
              {error.message}
            </div>
          </div>
        )}

        {!loading && !error && detail && <DetailContent detail={detail} />}
      </div>
    </>
  )
}

export default CandidateDetailPanel
