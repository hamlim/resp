const mediaQueryFactory = (breakpoint, rootFontSize = 16) => (strings, ...interps) => `@media screen and (min-width: ${breakpoint / rootFontSize}rem) { ${interps.reduce((acc, interpolation, ndx) => `${acc}${interpolation}${strings[ndx + 1]}`, strings[0]) } }`


export default breakpoints => {
  return Object.keys(breakpoints).reduce((acc, breakpointName) => {
    return {
      ...acc,
      [breakpointName]: mediaQueryFactory(breakpoints[breakpointName])
    }
  }, {})
};