import resp from '../index.js'

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

test('accepts addition argument to configure return types', () => {
  const breakpointHandlers = resp(breakpoints, {
    useRems: false,
  })
  const expectedKey = '@media screen and (min-width: 360px)'
  const expected = { [expectedKey]: { color: 'red' } }
  const result = breakpointHandlers.small({ color: 'red' })
  expect(Object.keys(result)[0]).toMatchSnapshot()
  expect(typeof result).toBe('object')
})
