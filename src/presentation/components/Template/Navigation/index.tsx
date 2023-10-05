import React from 'react'
import Styles from './styles.scss'

const Navigation: React.FC = () => {
  return (
      <nav>
        <ul className={Styles.navList}>
          <li className={Styles.navLink}>Home</li>
          <li className={Styles.navLink}>Explore</li>
          <li className={Styles.navLink}>About Us</li>
          <li className={Styles.navLink}>Contact Us</li>
        </ul>
      </nav>
  )
}

export default Navigation;
