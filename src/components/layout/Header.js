// @flow
import React from 'react'
import logo from './logo.svg'
import styled from 'styled-components'
import styles from '../../styles'

const HeaderBar = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${styles.size.headerHeight};
  background-color: #222;
  color: white;
`

const LogoImage = styled.img`
  ${styles.mixin.centeredY()} height: ${styles.typography.rhythm(1)};
  margin-left: ${styles.typography.rhythm(1)};
`
const Title = styled.h1`
  text-align: center;
  margin: 0 0 0 0;
  height: ${styles.size.headerHeight};
  line-height: ${styles.size.headerHeight};
`

const Header = () => {
  return (
    <HeaderBar>
      <Title>Lazy image loading example with lozad.js</Title>
    </HeaderBar>
  )
}

export default Header
