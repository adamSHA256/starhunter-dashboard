import { useState, useMemo } from 'react'
import Layout from './components/Layout'
import SearchBar from './components/SearchBar'
import FilterDropdown from './components/FilterDropdown'
import CandidateCard from './components/CandidateCard'
import LoadingSkeleton from './components/LoadingSkeleton'
import ErrorMessage from './components/ErrorMessage'
import { PLACEHOLDER_CANDIDATES } from './data/placeholder'

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Passive', value: 'passive' },
  { label: 'Placed', value: 'placed' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Archived', value: 'archived' },
]

function App() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isLoading] = useState(false)
  const [error] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return PLACEHOLDER_CANDIDATES.filter((c) => {
      const matchesSearch =
        !q ||
        (c.name?.toLowerCase().includes(q) ?? false) ||
        (c.profession?.toLowerCase().includes(q) ?? false) ||
        (c.email?.toLowerCase().includes(q) ?? false) ||
        (c.currentLocation?.toLowerCase().includes(q) ?? false)
      const matchesStatus = !statusFilter || c.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
        <p className="text-sm text-gray-500 mt-1">
          {filtered.length} candidate{filtered.length !== 1 && 's'} found
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, profession, email, or location..."
          />
        </div>
        <div className="w-full sm:w-48">
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_OPTIONS}
          />
        </div>
      </div>

      {isLoading && <LoadingSkeleton count={6} />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No candidates match your filters.</p>
          <button
            onClick={() => {
              setSearch('')
              setStatusFilter('')
            }}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </Layout>
  )
}

export default App
