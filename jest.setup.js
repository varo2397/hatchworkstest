import '@testing-library/jest-dom'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...rest }) => {
    return <a {...rest}>{children}</a>
  },
}))
