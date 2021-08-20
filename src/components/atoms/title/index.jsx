import React from 'react'
import { bool, string } from 'prop-types'
import './index.scss'

const Title = ({ title, subTitle, centered }) => {
  const titleClass = `ui ${centered ? 'center aligned' : ''} header`
  const subTitleClass = centered ? 'subtitle-centered' : ''

  return (
    <>
      <h1 data-testid={'test-title'} className={titleClass}>
        {title}
      </h1>
      {subTitle && (
        <span data-testid={'sub-test-title'} className={subTitleClass}>
          {subTitle}
        </span>
      )}
    </>
  )
}

export default Title

Title.propTypes = {
  title: string.isRequired,
  subTitle: string,
  centered: bool
}
