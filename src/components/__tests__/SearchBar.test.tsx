import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'

describe('SearchBar', () => {
  it('renders with the given placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Find people..." />)
    expect(screen.getByPlaceholderText('Find people...')).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchBar value="hello" onChange={() => {}} />)
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
  })

  it('calls onChange on each keystroke', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'abc')

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenNthCalledWith(1, 'a')
    expect(onChange).toHaveBeenNthCalledWith(2, 'b')
    expect(onChange).toHaveBeenNthCalledWith(3, 'c')
  })

  it('uses default placeholder when none provided', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })
})
