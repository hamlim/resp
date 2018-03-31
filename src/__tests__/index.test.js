import resp, {
  minWidthQueryFactory,
  getMQValue,
} from '../index.js'

const breakpoints = {
  small: 360,
  medium: 800,
  large: 1200,
}

const breakpointNames = Object.keys(breakpoints)

test('it returns an object of functions named the same as the breakpoints', () => {
  const breakpointHandlers = resp(breakpoints)
  expect(Object.keys(breakpointHandlers)).toEqual(
    expect.arrayContaining(breakpointNames),
  )
  expect(
    typeof breakpointHandlers[breakpointNames[0]],
  ).toBe('function')
})

test('calling a handler returns the expected mq string', () => {
  const breakpointHandlers = resp(breakpoints)
  const expected = `@media screen and (min-width: 50rem) { color: red; }`
  const result = breakpointHandlers.medium`color: red;`
  expect(result).toMatchSnapshot()
})

test('accepts a media query factory argument', () => {
  const breakpointHandlers = resp(breakpoints, {
    mediaQueryFactory: ({ breakpoint }) => (
      strings,
      ...interpolations
    ) => {
      return {
        [`@media screen and (min-width: ${getMQValue({
          breakpoint,
          useRems: false,
        })})`]: strings,
      }
    },
  })
  const expectedKey = '@media screen and (min-width: 360px)'
  const expected = { [expectedKey]: { color: 'red' } }
  const result = breakpointHandlers.small({ color: 'red' })
  expect(Object.keys(result)[0]).toMatchSnapshot()
  expect(typeof result).toBe('object')
})

test('minWidthQueryFactory returns a function when called initial params', () => {
  const mediaQuery = minWidthQueryFactory({
    breakpoint: 300,
    fontSize: 16,
    useRems: true,
  })
  expect(typeof mediaQuery).toBe('function')
})
