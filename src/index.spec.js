import resp from './index.js'

console.log('Starting Tests...')

const breakpoints = {
  small: 360,
  medium: 800,
  large: 1200,
}

const test = (name, func) => {
  console.log(`Running ${name}...`)
  try {
    func()
    console.log(`✅ ${name} passed.`)
  } catch (e) {
    console.error(`❌ ${name} failed.`)
    console.error(e)
  }
}

const breakpointNames = Object.keys(breakpoints)

test('it returns an object of functions named the same as the breakpoints', () => {
  const breakpointHandlers = resp(breakpoints)
  Object.keys(breakpointHandlers).forEach((handler, index) => {
    console.assert(handler === breakpointNames[index])
    console.assert(typeof breakpointHandlers[handler] === 'function')
  })
})

test('calling a handler returns the expected mq string', () => {
  const breakpointHandlers = resp(breakpoints)
  const expected = `@media screen and (min-width: 50rem) { color: red; }`
  const result = breakpointHandlers.medium`color: red;`
  console.assert(result === expected)
})

test('accepts addition argument to configure return types', () => {
  const breakpointHandlers = resp(breakpoints, { useRems: false })
  const expectedKey = '@media screen and (min-width: 360px)'
  const expected = { [expectedKey]: { color: 'red' } }
  const result = breakpointHandlers.small({ color: 'red' })
  console.assert(Object.keys(result)[0] === expectedKey)
  console.assert(typeof result === 'object')
})
