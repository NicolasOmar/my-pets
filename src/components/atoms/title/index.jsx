import React from 'react'
import { oneOf, shape, string } from 'prop-types'
import { fontSizes } from 'constants/bulma-styles.json'
import './index.scss'

const Title = ({
  title,
  subTitle = null,
  size = {
    title: Object.keys(fontSizes)[4],
    subTitle: Object.keys(fontSizes)[2]
  }
}) => {
  const pClasses = {
    title: `title ${fontSizes[size.title]}`,
    subTitle: `subtitle ${fontSizes[size.subTitle]}`
  }

  return (
    <>
      <p data-testid={'test-title'} className={pClasses.title}>
        {title}
      </p>
      {subTitle && (
        <p data-testid={'sub-test-title'} className={pClasses.subTitle}>
          {subTitle}
        </p>
      )}
    </>
  )
}

export default Title

Title.propTypes = {
  title: string.isRequired,
  subTitle: string,
  size: shape({
    title: oneOf(Object.keys(fontSizes).map(size => +size)),
    subTitle: oneOf(Object.keys(fontSizes).map(size => +size))
  })
}
