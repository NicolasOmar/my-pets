import React from 'react'
// SEMANTIC IMPORTS
import { Feed, Header } from 'semantic-ui-react'

const TestArray = [
  'Flora day #',
  'Flora day #',
  'Flora day #',
  'Flora day #',
  'Flora day #',
  'Flora day #',
  'Flora day #',
  'Flora day #',
  'Flora day #',
]

function LogList() {
  return (
    <Feed size="large">
      <Header as="h4">Activities Log</Header>

      {TestArray.map((item, i) => {
        return (
          <Feed.Event key={i}>
            <Feed.Content>
              <Feed.Summary>{`${item}${i + 1}`}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        )
      })}
    </Feed>
  )
}

export default LogList
