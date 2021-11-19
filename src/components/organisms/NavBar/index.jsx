import React from 'react'
import { arrayOf, element, object, oneOfType } from 'prop-types'
import NavBarItem from '../../atoms/NavBarItem'
import NavBarDropdown from '../../molecules/NavBarDropdown'

const NavBar = ({ icon = null, start = null, end = [] }) => {
  const sectionMapper = {
    dropdown: (elem, i) => <NavBarDropdown key={i ? `${elem.type}-${i}` : elem.type} {...elem} />,
    item: (elem, i) => <NavBarItem key={i ? `${elem.type}-${i}` : elem.type} {...elem} />
  }

  const renderBrand = icon =>
    icon && (
      <section className="navbar-brand">
        <NavBarItem>{icon}</NavBarItem>
      </section>
    )

  const renderSection = (sectionClass, elements) =>
    Array.isArray(elements) &&
    elements.length && (
      <section className={sectionClass}>
        {elements.map((elem, i) => sectionMapper[elem.type || 'item'](elem, i))}
      </section>
    )

  return (
    <nav className="navbar">
      {renderBrand(icon)}
      {(start || end) && (
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
  start: oneOfType([arrayOf(element), arrayOf(object)]),
  end: oneOfType([arrayOf(element), arrayOf(object)])
}
