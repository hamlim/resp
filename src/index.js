export const getMQValue = ({
  breakpoint,
  useRems = true,
  fontSize = 16,
}) => {
  if (useRems) {
    return `${breakpoint / fontSize}rem`
  } else {
    return `${breakpoint}px`
  }
}

export const minWidthQueryFactory = ({ breakpoint }) => (
  maybeStrings,
  ...interps
) => {
  if (Array.isArray(maybeStrings)) {
    return `@media screen and (min-width: ${getMQValue({
      breakpoint,
    })}) { ${interps.reduce(
      (acc, interpolation, ndx) =>
        `${acc}${interpolation}${maybeStrings[ndx + 1]}`,
      maybeStrings[0],
    )} }`
  } else {
    return {
      [`@media screen and (min-width: ${getMQValue({
        breakpoint,
      })})`]: maybeStrings,
    }
  }
}

export default (
  breakpoints,
  { mediaQueryFactory = minWidthQueryFactory } = {},
) => {
  return Object.keys(breakpoints).reduce(
    (acc, breakpointName) => {
      return {
        ...acc,
        [breakpointName]: mediaQueryFactory({
          breakpoint: breakpoints[breakpointName],
        }),
      }
    },
    {},
  )
}
