import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

function Logo() {
  return <Link><img className={styles.logo} src={logo} alt="logo image" /></Link>
}

export default Logo;
