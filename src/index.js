const getMQValue = (useRems, breakpoint, fontSize) => {
  if (useRems) {
    return `${breakpoint / fontSize}rem`
  } else {
    return `${breakpoint}px`
  }
}

const mediaQueryFactory = (breakpoint, rootFontSize, useRems) => (maybeStrings, ...interps) => {
  if (Array.isArray(maybeStrings)) {
    return `@media screen and (min-width: ${getMQValue(useRems, breakpoint, rootFontSize)}) { ${interps.reduce(
      (acc, interpolation, ndx) => `${acc}${interpolation}${maybeStrings[ndx + 1]}`,
      maybeStrings[0],
    )} }`
  } else {
    return {
      [`@media screen and (min-width: ${getMQValue(useRems, breakpoint, rootFontSize)})`]: maybeStrings,
    }
  }
}

export default (breakpoints, { rootFontSize = 16, useRems = true } = {}) => {
  return Object.keys(breakpoints).reduce((acc, breakpointName) => {
    return {
      ...acc,
      [breakpointName]: mediaQueryFactory(breakpoints[breakpointName], rootFontSize, useRems),
    }
  }, {})
}
