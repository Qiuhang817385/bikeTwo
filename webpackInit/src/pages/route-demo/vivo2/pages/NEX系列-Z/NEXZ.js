import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class NEXZ extends Component {
  render () {
    return (
      <div>
        NEXZ系列
        {
          [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
            return (
              <div>
                <Link to={`/NEX/NEXZ/${item}`}>商品{item}页面</Link>
              </div>
            )
          })
        }
        {this.props.children}
      </div>
    )
  }
}
