import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
export default class Home extends Component {
  handleClick = () => {
    console.log('123')
  }
  render () {
    return (
      <div>
        <Menu onClick={this.handleClick} mode="horizontal">
          <Menu.Item key="iQOO">
            <Link to="/iQOO">iQOO专区</Link>
          </Menu.Item>
          <Menu.Item key="NEX">
            <Link to="/NEX">NEX系列</Link>
          </Menu.Item>
          <Menu.Item key="X">
            <Link to="/X">X系列</Link>
          </Menu.Item>
        </Menu>
        {this.props.children}
      </div>
    )
  }
}
