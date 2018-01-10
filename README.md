# Resp

A css-in-js utility for writing responsive styles.

### Usage

Resp is designed to be used along with a css-in-js library, however it can be used anywhere you would like to generate styles scoped to media queries.

Resp is a function that takes in two arguments, the first is an object with keys of the breakpoint names `small, medium, large` for example, and values of the pixel breakpoints that each of those labels applies to. The second argument which is optional is the root font size, this is used to determine the breakpoint in rems.

```javascript
import resp from '@matthamlin/resp'

const breakpoints = {
  small: 640, // small is the name of the breakpoint, 640px is the actual value of the breakpoint
  medium: 800,
  large: 1200,
}

const mediaQueries = resp(breakpoints)

/*
mediaQueries === {
  small: function,
  medium: function,
  large: function
}
*/
```

The value returned after calling Resp is an object of keyed functions, with each key mapping to the same name as the breakpoint it represents. This function can then be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) which will return a string represention of the media query.

```javascript
const { small } = mediaQueries

const redAboveSmallBreakpoint = small`
  .class {
    color: red;
  }
`

// redAboveSmallBreakpoint === '@media screen and (min-width: 40rem) { .class { color: red; } }'
```

One of the key values of the functions being tagged template literals is the ability to interpolate some data in your styles:

```Javascript
const specialColor = 'mediumseagreen';

const greenText = small`.class { color: ${specialColor}; }`;
```

Using these styles is as simple as providing this content as children to a style tag:

```javascript
render(
  <div>
    <h1 className="title">Hello</h1>
    <style>{small`.title { color: green; }`}</style>
  </div>,
)
```

Using these basics we can build an even more advanced example:

```javascript
import resp from '@matthamlin/resp'
import styled from 'react-emotion'

const { small, medium, large } = resp(
  {
    small: 640,
    medium: 800,
    large: 1200,
  },
  16,
)

const Container = styled.div`
  color: red;
  ${medium`
    color: blue;
  `} ${large`
    color: purple;
    background-color: ${props.bg};
  `};
`

render(<Container bg="mediumseagreen">Hello World</Container>)
```

### Using Resp with Emotion

See [this codesandbox link](https://codesandbox.io/s/xk7yj5ry4) for a simple example of using Resp with Emotion.

### Using Resp with Styled-Components

See [this codesandbox link](https://codesandbox.io/s/xzomwq46yq) for a simple example with Resp and Styled-Components.
