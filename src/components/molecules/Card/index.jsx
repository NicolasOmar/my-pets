import React from 'react'
import { array, arrayOf, element, elementType, object, oneOfType, shape, string } from 'prop-types'
// COMPONENTS
import Image from '../../atoms/Image'

const Card = ({ cardImage = null, cardContent, cardFooter = [], styles = {} }) => {
  const renderImage = () =>
    cardImage && (
      <section key={'card-image'} className="card-image">
        <Image {...cardImage} />
      </section>
    )

  const renderContent = () =>
    cardContent && (
      <section key={'card-content'} className="card-content">
        {cardContent}
      </section>
    )

  const renderFooter = () =>
    cardFooter.length && (
      <footer key={'card-footer'} className="card-footer">
        {cardFooter.map(({ label, link }, i) => (
          <a key={`card-footer-item-${i}`} href={link} className="card-footer-item">
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
  cardFooter: arrayOf(shape({ label: string, link: string })),
  styles: object
}
