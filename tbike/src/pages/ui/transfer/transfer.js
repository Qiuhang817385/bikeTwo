import React from 'react'
import './style.scss'
import Trans1 from './trans1'
import Trans2 from './trans2'
import Trans3 from './trans3'
import Trans4 from './trans4'
// import Trans5 from './trans5'

export default class Transfers extends React.Component {

  render () {

    return (
      <>
        {/* <Trans5></Trans5> */}
        <Trans1></Trans1>
        <Trans2></Trans2>
        {/* 难 */}
        <Trans3></Trans3>
        <Trans4></Trans4>
      </>
    )
  }
}