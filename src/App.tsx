import { useState, useMemo, useCallback } from 'react'
import Layout from './components/Layout'
import SearchBar from './components/SearchBar'
import FilterDropdown from './components/FilterDropdown'
import SortDropdown from './components/SortDropdown'
import CandidateCard from './components/CandidateCard'
import CandidateDetailPanel from './components/CandidateDetailPanel'
import Pagination from './components/Pagination'
import LoadingSkeleton from './components/LoadingSkeleton'
import ErrorMessage from './components/ErrorMessage'
import { useCandidates } from './hooks/useCandidates'
import type { CandidateListItem } from './types/candidate'

const ALL_STATUSES_OPTION = { label: 'All Statuses', value: '' }

const PAGE_SIZE = 12

function sortCandidates(list: CandidateListItem[], sortKey: string): CandidateListItem[] {
  const [field, dir] = sortKey.split('-') as [string, 'asc' | 'desc']
  const mult = dir === 'desc' ? -1 : 1

  return [...list].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[field]
    const bVal = (b as Record<string, unknown>)[field]
    if (aVal == null && bVal == null) return 0
    if (aVal == null) return 1
    if (bVal == null) return -1
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return mult * aVal.localeCompare(bVal)
    }
    return mult * (Number(aVal) - Number(bVal))
  })
}

function App() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sort, setSort] = useState('name-asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null)

  const { candidates, uniqueStatuses, loading, error, refetch, isSearching } = useCandidates({
    search,
    statusFilter,
  })

  const statusOptions = useMemo(
    () => [
      ALL_STATUSES_OPTION,
      ...uniqueStatuses.map((s) => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: s })),
    ],
    [uniqueStatuses],
  )

  const sorted = useMemo(() => sortCandidates(candidates, sort), [candidates, sort])

  const totalItems = sorted.length
  const startIdx = (currentPage - 1) * PAGE_SIZE
  const paged = useMemo(() => sorted.slice(startIdx, startIdx + PAGE_SIZE), [sorted, startIdx])

  // Reset to page 1 when filters/sort change
  const handleSearch = useCallback((v: string) => { setSearch(v); setCurrentPage(1) }, [])
  const handleStatus = useCallback((v: string) => { setStatusFilter(v); setCurrentPage(1) }, [])
  const handleSort = useCallback((v: string) => { setSort(v); setCurrentPage(1) }, [])

  const showLoading = loading && candidates.length === 0

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
        <p className="text-sm text-gray-500 mt-1">
          {loading || isSearching
            ? 'Loading...'
            : `${totalItems} candidate${totalItems !== 1 ? 's' : ''} found`}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by name..."
          />
        </div>
        <div className="w-full sm:w-48">
          <FilterDropdown
            value={statusFilter}
            onChange={handleStatus}
            options={statusOptions}
          />
        </div>
        <div className="w-full sm:w-52">
          <SortDropdown value={sort} onChange={handleSort} />
        </div>
      </div>

      {showLoading && <LoadingSkeleton count={PAGE_SIZE} />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => refetch()}
        />
      )}

      {!showLoading && !error && totalItems === 0 && (
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

      {!showLoading && !error && totalItems > 0 && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {paged.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onClick={() => setSelectedCandidateId(candidate.id)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <CandidateDetailPanel
        candidateId={selectedCandidateId}
        onClose={() => setSelectedCandidateId(null)}
      />
    </Layout>
  )
}

export default App
