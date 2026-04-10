import type { CandidateListItem } from '../types/candidate'
import { getStatusColor, getStatusDisplay, getLevelColor, isActiveStatus } from '../types/candidate'
import { ASSET_BASE_URL } from '../lib/apollo'

function getInitials(firstName: string | null, secondName: string | null, name: string | null): string {
  if (firstName && secondName) {
    return `${firstName[0]}${secondName[0]}`.toUpperCase()
  }
  if (firstName) {
    return firstName[0].toUpperCase()
  }
  if (name) {
    return name.split(' ').filter(Boolean).map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  }
  return '?'
}

interface CandidateCardProps {
  candidate: CandidateListItem
  onClick?: () => void
}

function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  const statusColor = getStatusColor(candidate.status)
  const levelColor = getLevelColor(candidate.level)
  const active = isActiveStatus(candidate.status)

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer overflow-hidden ${active ? 'border-t-2 border-t-green-400' : ''}`}
      onClick={onClick}
    >
      {/* Top row: avatar + name/email */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm shrink-0">
          {candidate.avatar ? (
            <img
              src={`${ASSET_BASE_URL}${candidate.avatar}`}
              alt={candidate.name ?? ''}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            getInitials(candidate.firstName, candidate.secondName, candidate.name)
          )}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">{candidate.name ?? 'Unknown'}</div>
          <div className="text-sm text-gray-500 truncate">{candidate.email ?? '—'}</div>
        </div>
      </div>

      {/* Middle: profession/company + status badge (fixed row) */}
      <div className="mt-3 flex items-center justify-between gap-2 min-h-[24px]">
        <span className="text-sm font-medium text-gray-700 truncate">
          {candidate.profession || candidate.companyName || ''}
        </span>
        {candidate.status && (
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-block shrink-0 ${statusColor}`}
          >
            {getStatusDisplay(candidate.status)}
          </span>
        )}
      </div>

      {/* Bottom row: location, level, created date */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        {candidate.currentLocation && (
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="truncate">{candidate.currentLocation}</span>
          </div>
        )}

        {candidate.level && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor}`}>
            {candidate.level}
          </span>
        )}

        {candidate.createdAt && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span>{new Date(candidate.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateCard
