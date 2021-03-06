import React, { Component } from 'react'
// import MenuConfig from '../../config/menuConfig'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getMenuList } from './store/actionCreator'
// import { GET_MENULIST } from './store/actionType';
import { connect } from 'react-redux'

import "./index.scss";
const { SubMenu } = Menu;
function handleClick (e) {
  console.log('click', e);
}
class NavLeft extends Component {
  componentDidMount () {
    this.props.getMenuList(this.props.userInfo.key)
  }
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          // 如果有,首先返回的是一级菜单,在一级菜单里面调用,再返回二级菜单
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (<Menu.Item title={item.title} key={item.key}>
        <Link to={item.key}>
          {item.title}
        </Link>
      </Menu.Item>)
    })
  }

  render () {
    const { MenuConfig } = this.props;
    return (
      <>
        <div className="logo">
          {/* 
            图片静态资源放到public底下的assets目录
            这里的/就是public目录了
          */}
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>管理系统
          </h1>
        </div>
        {
          MenuConfig.length > 0 ? (
            <Menu onClick={handleClick} mode="vertical">
              {this.renderMenu(MenuConfig)}
            </Menu>
          ) : (<div>loading</div>)
        }

      </>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    MenuConfig: state['navLeft_reducer'].MenuConfig,
    userInfo: state['login_reducer'].userInfo
  }
}
const mapDispatchToProps = {
  getMenuList
}

export default connect(mapStateToProps, mapDispatchToProps)(NavLeft)
