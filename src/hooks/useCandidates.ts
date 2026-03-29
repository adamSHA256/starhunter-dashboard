import { useQuery } from '@apollo/client/react'
import { GET_CANDIDATES } from '../graphql/candidates'
import type { GetCandidatesData, GetCandidatesVars, CandidateListItem } from '../types/candidate'
import { useDebouncedValue } from './useDebouncedValue'
import { useMemo } from 'react'

const PAGE_SIZE = 50

interface UseCandidatesOptions {
  search: string
  statusFilter: string
  limit?: number
  offset?: number
}

export function useCandidates({ search, statusFilter, limit = PAGE_SIZE, offset = 0 }: UseCandidatesOptions) {
  const debouncedSearch = useDebouncedValue(search, 300)

  const { data, loading, error, refetch } = useQuery<GetCandidatesData, GetCandidatesVars>(
    GET_CANDIDATES,
    {
      variables: {
        name: debouncedSearch || undefined,
        limit,
        offset,
      },
      fetchPolicy: 'cache-and-network',
    },
  )

  const allCandidates = data?.candidates ?? []

  const candidates: CandidateListItem[] = useMemo(() => {
    if (!statusFilter) return allCandidates
    return allCandidates.filter((c) => c.status === statusFilter)
  }, [allCandidates, statusFilter])

  const uniqueStatuses: string[] = useMemo(() => {
    const set = new Set<string>()
    for (const c of allCandidates) {
      if (c.status) set.add(c.status)
    }
    return Array.from(set).sort()
  }, [allCandidates])

  return {
    candidates,
    uniqueStatuses,
    totalFetched: allCandidates.length,
    loading,
    error: error?.message ?? null,
    refetch,
    isSearching: search !== debouncedSearch,
  }
}
