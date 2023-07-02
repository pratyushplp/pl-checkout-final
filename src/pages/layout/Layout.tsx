import { Outlet, NavLink, Link } from "react-router-dom";
import ajgLogo from '../../assets/ajgLogo.png'
import styles from "./Layout.module.css";



const Layout = () => {


    return (

        <div className={styles.layout}>
            <header className={styles.header} >
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                       <img src={ajgLogo} alt="icon" className={styles.logo}/>
                        <h3 className={styles.headerTitle}>Gallagher</h3>
                    </Link>
                    <nav className={styles.headerNavList}>
                        <ul className={styles.headerNavList}>
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Chat with me
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
