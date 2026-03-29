import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'
import App from '../../App'
import { MOCK_CANDIDATES } from '../../test/mocks'
import { renderWithProviders } from '../../test/renderWithProviders'

const server = setupServer(
  graphql.query('GetCandidates', ({ variables }) => {
    let results = [...MOCK_CANDIDATES]

    if (variables.name) {
      const q = (variables.name as string).toLowerCase()
      results = results.filter((c) => c.name?.toLowerCase().includes(q))
    }

    return HttpResponse.json({
      data: { candidates: results },
    })
  }),
)

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Candidate list (integration)', () => {
  it('renders candidates from the API', async () => {
    renderWithProviders(<App />)

    await waitFor(() => {
      expect(screen.getByText('Anna Schmidt')).toBeInTheDocument()
    })

    expect(screen.getByText('Boris Weber')).toBeInTheDocument()
    expect(screen.getByText('Clara Fischer')).toBeInTheDocument()
  })

  it('shows candidate count after loading', async () => {
    renderWithProviders(<App />)

    await waitFor(() => {
      expect(screen.getByText('3 candidates found')).toBeInTheDocument()
    })
  })

  it('filters by search term (debounced)', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Anna Schmidt')).toBeInTheDocument()
    })

    // Type in search box
    const searchInput = screen.getByPlaceholderText('Search by name...')
    await user.type(searchInput, 'Boris')

    // Wait for debounced query to resolve — only Boris should remain
    await waitFor(() => {
      expect(screen.getByText('Boris Weber')).toBeInTheDocument()
      expect(screen.queryByText('Anna Schmidt')).not.toBeInTheDocument()
      expect(screen.queryByText('Clara Fischer')).not.toBeInTheDocument()
    })
  })

  it('filters by status dropdown (client-side)', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    // Wait for data
    await waitFor(() => {
      expect(screen.getByText('Anna Schmidt')).toBeInTheDocument()
    })

    // The status dropdown should contain dynamically discovered statuses
    const statusSelect = screen.getByDisplayValue('All Statuses')
    await user.selectOptions(statusSelect, 'passive')

    // Only Boris (passive) should show
    await waitFor(() => {
      expect(screen.getByText('Boris Weber')).toBeInTheDocument()
      expect(screen.queryByText('Anna Schmidt')).not.toBeInTheDocument()
      expect(screen.queryByText('Clara Fischer')).not.toBeInTheDocument()
    })
  })

  it('shows empty state when no candidates match', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    await waitFor(() => {
      expect(screen.getByText('Anna Schmidt')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search by name...')
    await user.type(searchInput, 'zzzznotfound')

    await waitFor(() => {
      expect(screen.getByText('No candidates match your filters.')).toBeInTheDocument()
    })
  })

  it('shows error state on network failure', async () => {
    server.use(
      graphql.query('GetCandidates', () => {
        return HttpResponse.json({
          errors: [{ message: 'Internal server error' }],
        })
      }),
    )

    renderWithProviders(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Internal server error/i)).toBeInTheDocument()
    })
  })
})
