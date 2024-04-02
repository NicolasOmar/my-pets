import PropTypes from 'prop-types'
// COMPONENTS
import NavBarItem from '../../atoms/NavBarItem'
import NavBarDropdown from '../../molecules/NavBarDropdown'
import Icon from '../../atoms/Icon'

const NavBar = ({ icon = null, start = null, end = null, styles = {} }) => {
  const sectionMapper = {
    dropdown: (elem, i) => <NavBarDropdown key={i ? `${elem.type}-${i}` : elem.type} {...elem} />,
    item: (elem, i) => <NavBarItem key={i ? `${elem.type}-${i}` : elem.type} {...elem} />
  }

  const renderBrand = icon =>
    icon && (
      <section data-testid="navbar-brand" className="navbar-brand">
        <NavBarItem key="navbar-brand">
          <Icon {...icon} />
        </NavBarItem>
      </section>
    )

  const renderSection = (sectionClass, elements) =>
    Array.isArray(elements) &&
    elements.length && (
      <section data-testid={sectionClass} className={sectionClass}>
        {elements.map((elem, i) => sectionMapper[elem.type || 'item'](elem, i))}
      </section>
    )

  return (
    <nav data-testid="navbar-body" className="navbar has-shadow" style={styles}>
      {renderBrand(icon)}
      {(start || end) && (
        <section data-testid="navbar-menu" className="navbar-menu">
          {renderSection('navbar-start', start)}
          {renderSection('navbar-end', end)}
        </section>
      )}
    </nav>
  )
}

export default NavBar

NavBar.propTypes = {
  /** `Attribute` Sets a custom Icon at NavBar's start */
  icon: PropTypes.shape(Icon.propTypes),
  /** `Attribute` Sets a list/array of dropdown objects to be shown at NavBar's start */
  start: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.object)
  ]),
  /** `Attribute` Sets a list/array of dropdown objects to be shown at NavBar's end */
  end: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.object)
  ]),
  /** `Styling` Adds custom CSS styles */
  styles: PropTypes.object
}
