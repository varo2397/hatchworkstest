import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders hello world text', () => {
    render(<Home />)

    const heading = screen.getByText('Hello world!')

    expect(heading).toBeInTheDocument()
  })

  it('renders within a main element', () => {
    render(<Home />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })
})
