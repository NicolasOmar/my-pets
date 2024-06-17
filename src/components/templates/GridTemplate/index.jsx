import React from 'react'
import { Button, ProgressBar, Table, Title } from 'reactive-bulma'
import './index.scss'
import DEFAULT_TEXT from '@constants/text'

const GridTemplate = ({
  title = null,
  goBackButton = null,
  isLoading = false,
  headers = null,
  body = null,
  noDataTitle = DEFAULT_TEXT.NO_DATA
}) => {
  return (
    <section className="grid-template__container">
      <>
        <section className="grid-template__header">
          {goBackButton ? <Button text={goBackButton.text} onClick={goBackButton.onClick} /> : null}
          {title ? <Title main={{ text: title, type: 'title' }} /> : null}
        </section>
        {isLoading ? (
          <ProgressBar cssClasses="grid-template__loading" isLoading={true} />
        ) : Array.isArray(headers) && Array.isArray(body) ? (
          <Table
            cssClasses="grid-template__table"
            head={headers.map(item => ({ content: item }))}
            body={body.map(_body => ({
              listOfCells: _body.map(_item => ({ content: _item }))
            }))}
          />
        ) : (
          <Title
            main={{
              text: noDataTitle,
              type: 'title',
              cssClasses: 'grid-template__no-data-label'
            }}
          />
        )}
      </>
    </section>
  )
}

export default GridTemplate

GridTemplate.propTypes = {}
