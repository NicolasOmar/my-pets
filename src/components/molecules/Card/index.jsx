import React from 'react'
import { arrayOf, element, elementType, oneOfType, shape, string } from 'prop-types'
// COMPONENTS
import Image from '../../atoms/Image'

const Card = ({ cardImage, cardContent, cardFooter }) => {
  const renderImage = () =>
    cardImage && (
      <div className="card-image">
        <Image {...cardImage} />
      </div>
    )

  const renderContent = () => cardContent && <div className="card-content">{cardContent}</div>

  const renderFooter = () =>
    Array.isArray(cardFooter) && (
      <footer className="card-footer">
        {cardFooter.map(({ label, link }, i) => (
          <a key={`card-footer-item-${i}`} href={link} className="card-footer-item">
            {label}
          </a>
        ))}
      </footer>
    )

  return (
    <div className="card">
      {renderImage()}
      {renderContent()}
      {renderFooter()}
    </div>
  )
}

export default Card

Card.propTypes = {
  cardImage: Image.propTypes,
  cardContent: oneOfType([element, elementType]).isRequired,
  cardFooter: arrayOf(shape({ label: string, link: string }))
}
