import React from 'react'
// SEMANTIC IMPORTS
import { Comment, Header } from 'semantic-ui-react'
import dayJs from 'dayjs'

const commentsArray = [
  'Day N° ',
  'Day N° ',
  'Day N° ',
  'Day N° ',
  'Day N° ',
  'Day N° ',
  'Day N° ',
  'Day N° ',
  'Day N° ',
]
const extraText = 'Another great day with our baby.'

function LogList() {
  return (
    <Comment.Group size="large">
      <Header as="h4">Activities Log</Header>

      {commentsArray.map((item, i) => {
        return (
          <Comment key={i}>
            <Comment.Content>
              <Comment.Metadata>
                {dayJs()
                  .subtract(i + 1, 'day')
                  .format('DD/MM/YYYY')}
              </Comment.Metadata>
              <Comment.Text>{`${item}${commentsArray.length - i} - ${extraText}`}</Comment.Text>
            </Comment.Content>
          </Comment>
        )
      })}
    </Comment.Group>
  )
}

export default LogList
