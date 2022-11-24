import React from 'react'
import {
  array,
  arrayOf,
  element,
  elementType,
  func,
  object,
  oneOfType,
  shape,
  string
} from 'prop-types'
// COMPONENTS
import Image from '../../atoms/Image'

const Card = ({
  cardHeader = null,
  cardImage = null,
  cardContent,
  cardFooter = [],
  styles = {}
}) => {
  const renderHeader = () =>
    cardHeader ? (
      <header data-testid={'test-card-header'} className="card-header">
        {cardHeader}
      </header>
    ) : null

  const renderImage = () =>
    cardImage ? (
      <section data-testid={'test-card-image'} className="card-image">
        <Image {...cardImage} />
      </section>
    ) : null

  const renderContent = () =>
    cardContent ? (
      <section data-testid={'test-card-content'} className="card-content">
        {cardContent}
      </section>
    ) : null

  const renderFooter = () =>
    cardFooter.length > 0 ? (
      <footer data-testid={'test-card-footer'} className="card-footer">
        {cardFooter.map(({ label, onClick }, i) => (
          <a
            key={`card-footer-item-${i}`}
            data-testid={`test-card-footer-item-${i}`}
            href="/"
            onClick={evt => {
              evt.preventDefault()
              onClick()
            }}
            className="card-footer-item"
          >
            {label}
          </a>
        ))}
      </footer>
    ) : null

  return (
    <section className="card" style={styles}>
      {renderHeader()}
      {renderImage()}
      {renderContent()}
      {renderFooter()}
    </section>
  )
}

export default Card

Card.propTypes = {
  cardHeader: oneOfType([element, elementType, array]),
  cardImage: shape(Image.propTypes),
  cardContent: oneOfType([element, elementType, array]).isRequired,
  cardFooter: arrayOf(shape({ label: string, onClick: func })),
  styles: object
}
