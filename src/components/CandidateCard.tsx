import type { CandidateListItem } from '../types/candidate'
import { getStatusColor } from '../types/candidate'

function getInitials(name: string | null, firstName: string | null, secondName: string | null): string {
  if (firstName && secondName) {
    return `${firstName[0]}${secondName[0]}`.toUpperCase()
  }
  if (name) {
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  }
  return '?'
}

interface CandidateCardProps {
  candidate: CandidateListItem
  onClick?: () => void
}

function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  const statusColor = getStatusColor(candidate.status)

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Top row: avatar + name/email */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm shrink-0">
          {candidate.avatar ? (
            <img
              src={candidate.avatar}
              alt={candidate.name ?? ''}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            getInitials(candidate.name, candidate.firstName, candidate.secondName)
          )}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">{candidate.name ?? 'Unknown'}</div>
          <div className="text-sm text-gray-500 truncate">{candidate.email ?? '—'}</div>
        </div>
      </div>

      {/* Middle: profession + status badge */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-700 truncate">
          {candidate.profession ?? candidate.companyName ?? '—'}
        </span>
        {candidate.status && (
          <span
            className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full inline-block shrink-0 ${statusColor}`}
          >
            {candidate.status}
          </span>
        )}
      </div>

      {/* Bottom row: location, level, created date */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
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
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <span>{candidate.level}</span>
          </div>
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
