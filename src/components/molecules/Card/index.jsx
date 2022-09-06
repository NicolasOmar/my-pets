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

const Card = ({ cardImage = null, cardContent, cardFooter = [], styles = {} }) => {
  const renderImage = () =>
    cardImage && (
      <section data-testid={'test-card-image'} className="card-image">
        <Image {...cardImage} />
      </section>
    )

  const renderContent = () =>
    cardContent && (
      <section data-testid={'test-card-content'} className="card-content">
        {cardContent}
      </section>
    )

  const renderFooter = () =>
    cardFooter.length > 0 && (
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
    )

  return (
    <section className="card" style={styles}>
      {renderImage()}
      {renderContent()}
      {renderFooter()}
    </section>
  )
}

export default Card

Card.propTypes = {
  cardImage: shape(Image.propTypes),
  cardContent: oneOfType([element, elementType, array]).isRequired,
  cardFooter: arrayOf(shape({ label: string, onClick: func })),
  styles: object
}
