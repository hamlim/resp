# Resp

A css-in-js utility for writing responsive styles.

```javascript
import resp from '@matthamlin/resp';
import styled from 'react-emotion'; // or styled-components, or whatever

const {small, medium, large} = resp({small: 640, medium: 800, large: 1200}, 16);


const Container = styled.div`
  color: red;
  ${medium`
    color: blue;
  `}
  ${large`
    color: purple;
    background-color: ${props.bg};
  `}
`;

/*
<Container bg="mediumseagreen">Cool</Container>

Generated css (roughly)
.container {
  color: red;
}
@media screen and (min-width: 50rem) {
  .container {
    color: blue;
  }
}
@media screen and (min-width: 75rem) {
  .container {
    color: purple;
    background-color: mediumseagreen;
  }
}
*/
```