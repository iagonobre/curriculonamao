import css from 'styled-jsx/css'

const normalSize = css`
  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
`

const mediumSize = css`
  p {
    color: red;
  }
  @media (max-width: 1080px) {
    html {
      font-size: 95.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 89.5%;
    }
  }
`

const largeSize = css`
  @media (max-width: 1080px) {
    html {
      font-size: 97.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 91.5%;
    }
  }
`

export { normalSize, mediumSize, largeSize }