import React from 'react'
import { arrayOf, element } from 'prop-types'
import NavBarItem from 'components/atoms/NavBarItem'
import NavBarDropdown from 'components/molecules/NavBarDropdown'

const NavBar = ({ icon = null, start = null, end = null }) => {
  const sectionMapper = {
    dropdown: elem => <NavBarDropdown {...elem} />,
    item: elem => <NavBarItem {...elem} />
  }

  const renderBrand = icon =>
    icon && (
      <section className="navbar-brand">
        <NavBarItem>{icon}</NavBarItem>
      </section>
    )

  const renderSection = (sectionClass, elements) =>
    Array.isArray(elements) &&
    elements?.length && (
      <section className={sectionClass}>
        {elements.map(elem => sectionMapper[elem.type || 'item'](elem))}
      </section>
    )

  return (
    <nav className="navbar">
      {renderBrand(icon)}
      {(start || icon) && (
        <section className="navbar-menu">
          {renderSection('navbar-start', start)}
          {renderSection('navbar-end', end)}
        </section>
      )}
    </nav>
  )
}

export default NavBar

NavBar.propTypes = {
  icon: element,
  start: arrayOf(element),
  end: arrayOf(element)
}
