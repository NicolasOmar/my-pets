
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// COMPONENTS
import Image from '../../atoms/Image'

const Card = ({
  testId = null,
  cssClasses = null,
  style = null,
  cardHeader = null,
  cardImage = null,
  cardContent,
  cardFooter = []
}) => {
  const cardTestId = testId ?? 'test-card'
  const cardClasses = cssClasses ?? 'card'
  const renderHeader = () =>
    cardHeader ? (
      <header data-testid={`${cardTestId}-header`} className="card-header">
        {cardHeader}
      </header>
    ) : null

  const renderImage = () =>
    cardImage ? (
      <section data-testid={`${cardTestId}-image`} className="card-image">
        <Image {...cardImage} />
      </section>
    ) : null

  const renderContent = () =>
    cardContent ? (
      <section data-testid={`${cardTestId}-content`} className="card-content">
        {cardContent}
      </section>
    ) : null

  const renderFooter = () =>
    Array.isArray(cardFooter) && cardFooter.length > 0 ? (
      <footer data-testid={`${cardTestId}-footer`} className="card-footer">
        {cardFooter.map(({ label, onClick }, i) => (
          <a
            key={`card-footer-item-${i}`}
            data-testid={`${cardTestId}-footer-item-${i}`}
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
    <section data-testid={cardTestId} className={cardClasses} style={style ?? undefined}>
      {renderHeader()}
      {renderImage()}
      {renderContent()}
      {renderFooter()}
    </section>
  )
}

export default Card

Card.propTypes = {
  ...elementPropTypes,
  /** `Attribute` Sets the header section where a title and subtitle will be shown */
  cardHeader: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.array]),
  /** `Attribute` Sets the image section where will be shown */
  cardImage: PropTypes.shape(Image.propTypes),
  /** `Attribute` `Required` Sets the content section where any type of component or text will be shown */
  cardContent: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.array])
    .isRequired,
  /** `Attribute` Sets the footer section where a list of links will be shown */
  cardFooter: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, onClick: PropTypes.func })
  )
}
