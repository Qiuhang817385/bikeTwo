import React, { useState, useEffect } from 'react'
import { Table, Spin } from 'antd'
/**
 * 需要传递的参数
 * getItem/getList
 * rowSelection:check/radio/null
 * columns
 * dataSource
 * pagination true/false
 */
export default function ETable (props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedItem, setSelectedItem] = useState()
  const [selectedItemCheck, setSelectedItemCheck] = useState([]);

  const [pagination, setpagination] = useState(null)
  let getItem = (val) => {
    if (Array.isArray(val)) {
      if (!val[0]) {
        val.splice(0, 1)
      }
    }
    return val;
  }
  // 分页
  useEffect(() => {
    setpagination({
      showTotal: () => {
        return `共${props.dataSource.length}条`
      }
    })
  }, [props.dataSource])
  // 多选
  useEffect(() => {
    if (props.getList) {
      props.getList(getItem(selectedItemCheck))
    }
  }, [selectedItemCheck])
  //单选
  useEffect(() => {
    if (props.getItem) {
      props.getItem(getItem(selectedItem))
    }
  }, [selectedItem])

  /**
   * 处理行点击事件-
   */
  let onRowClick = (record, index) => {
    let rowSelection = props.rowSelection;
    //复选框单击操作
    if (rowSelection === 'checkbox') {
      // selectedItem = [];
      // let judgeId = selectedRowKeys.indexOf(record.key);
      // if (judgeId >= 0) {
      //   selectedRowKeys.splice(judgeId, 1);
      //   // selectedItemCheck.splice(judgeId, 1);
      // } else {
      //   selectedRowKeys.push(record.key);
      //   selectedItemCheck.push(record);
      // }
      // setSelectedRowKeys([...selectedRowKeys])
      // setSelectedItemCheck(selectedItemCheck);
      console.log('功能已经取消~!')
    } else
    // 单选框单击操作
    {
      let selectKey = [index + 1];
      // 当前选中和当前点击的如果是同一个,那么直接返回,不做取消的状态
      if (selectedRowKeys && selectedRowKeys[0] === index + 1) {
        return;
      }
      setSelectedRowKeys(selectKey)
      setSelectedItem(record || {})
    }
  };
  /**
   * 选择框变更,调用原生的,
   */
  let onSelectChange = (selectedRowKeys, selectedRows) => {
    let rowSelection = props.rowSelection;
    if (rowSelection === 'checkbox') {
      console.log('selectedRowKeys :', selectedRowKeys);
      console.log('selectedRows :', selectedRows);
      if (!selectedRows[0]) {
        selectedRows.splice(0, 1);
      }
      setSelectedRowKeys([...selectedRowKeys])
      setSelectedItemCheck([...selectedRows])
    } else {
      console.log('selectedRowKeys :', selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys)
      setSelectedItem(selectedRows[0])
    }
  };
  /**
   * 全选按钮
   */
  let onSelectAll = (selected, selectedRows, changeRows) => {
    let selectKey = [];
    selectedRows.forEach((item, i) => {
      selectKey.push(i);
    });
    // if (!selectKey[0]) {
    //   selectKey.splice(0, 1);
    // }
    setSelectedItemCheck([...selectedRows])
    setSelectedRowKeys([...selectKey])
  }
  /**
   *  初始化
   */
  let InitTable = () => {
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
      // 用户手动选择/取消选择某行的回调
      onSelect: (record, selected, selectedRows) => {
        console.log('手动取消选中的回调..')
      },
      onSelectAll: onSelectAll
    };
    let row_selection = props.rowSelection;
    if (row_selection === false || row_selection === null) {
      row_selection = false;
    } else if (row_selection === 'checkbox') {
      //设置类型未复选框
      rowSelection.type = 'checkbox';
    } else {
      row_selection = 'radio';
    }

    let pagi_nation = props.dataSource ? props.pagination : null;

    return <Spin spinning={!props.dataSource ? true : false}>
      <Table
        className="card page-table"
        bordered
        {...props}
        rowSelection={row_selection ? rowSelection : null}
        onRow={(record, index) => ({
          onClick: () => {
            if (!row_selection) {
              return;
            }
            onRowClick(record, index)
          }
        })}
        pagination={pagi_nation ? pagination : false}
      />
    </Spin>
  }
  return (
    <>
      {InitTable()}
    </>
  )
}