import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CandidateCard from '../CandidateCard'
import { makeCandidateListItem } from '../../test/mocks'

describe('CandidateCard', () => {
  it('renders candidate name and email', () => {
    const candidate = makeCandidateListItem({
      name: 'Jane Doe',
      email: 'jane@example.com',
    })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('shows initials when no avatar is set', () => {
    const candidate = makeCandidateListItem({
      avatar: null,
      firstName: 'John',
      secondName: 'Smith',
    })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  it('renders avatar image when avatar url is provided', () => {
    const candidate = makeCandidateListItem({
      avatar: 'https://example.com/photo.jpg',
      name: 'Test User',
    })
    render(<CandidateCard candidate={candidate} />)

    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
    expect(img).toHaveAttribute('alt', 'Test User')
  })

  it('displays status badge', () => {
    const candidate = makeCandidateListItem({ status: 'active' })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('active')).toBeInTheDocument()
  })

  it('displays profession', () => {
    const candidate = makeCandidateListItem({ profession: 'Data Engineer' })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('Data Engineer')).toBeInTheDocument()
  })

  it('falls back to companyName when profession is null', () => {
    const candidate = makeCandidateListItem({
      profession: null,
      companyName: 'Big Corp',
    })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('Big Corp')).toBeInTheDocument()
  })

  it('shows location when available', () => {
    const candidate = makeCandidateListItem({ currentLocation: 'Berlin' })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('Berlin')).toBeInTheDocument()
  })

  it('shows level when available', () => {
    const candidate = makeCandidateListItem({ level: 'Senior' })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('Senior')).toBeInTheDocument()
  })

  it('shows "Unknown" when name is null', () => {
    const candidate = makeCandidateListItem({ name: null })
    render(<CandidateCard candidate={candidate} />)

    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const candidate = makeCandidateListItem()
    render(<CandidateCard candidate={candidate} onClick={onClick} />)

    await user.click(screen.getByText(candidate.name!))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
