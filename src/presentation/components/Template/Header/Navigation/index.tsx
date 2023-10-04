import React from 'react';
import Styles from './styles.scss';


const Navigation: React.FC = () => {

  return (

    <div className={Styles.Container}>

<img className={Styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />

    <nav>
      <ul className={Styles.navList}>
        <li className={Styles.navLink}>Home</li>
        <li className={Styles.navLink}>Explore</li>
        <li className={Styles.navLink}>About Us</li>
        <li className={Styles.navLink}>Contact Us</li>
      </ul>
    </nav>

    </div>
  );
};

export default Navigation;
