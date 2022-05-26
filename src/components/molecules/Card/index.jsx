import React from 'react'
import { arrayOf, element, elementType, oneOfType, shape, string } from 'prop-types'
// COMPONENTS
import Image from '../../atoms/Image'

const Card = ({ cardImage, cardContent, cardFooter }) => {
  const renderImage = () =>
    cardImage && (
      <section className="card-image">
        <Image {...cardImage} />
      </section>
    )

  const renderContent = () =>
    cardContent && <section className="card-content">{cardContent}</section>

  const renderFooter = () =>
    Array.isArray(cardFooter) &&
    cardFooter.length && (
      <footer className="card-footer">
        {cardFooter.map(({ label, link }, i) => (
          <a key={`card-footer-item-${i}`} href={link} className="card-footer-item">
            {label}
          </a>
        ))}
      </footer>
    )

  return (
    <section className="card">
      {renderImage()}
      {renderContent()}
      {renderFooter()}
    </section>
  )
}

export default Card

Card.propTypes = {
  cardImage: Image.propTypes,
  cardContent: oneOfType([element, elementType]).isRequired,
  cardFooter: arrayOf(shape({ label: string, link: string }))
}
