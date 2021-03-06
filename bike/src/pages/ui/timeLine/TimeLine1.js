import React from 'react'
import { Card, Timeline } from 'antd';
import './style.scss'
export default function TimeLine1 () {
  return (
    <>
      <Card title="时间轴1" className="card">
        <Timeline>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
      </Card>
    </>
  )
}
