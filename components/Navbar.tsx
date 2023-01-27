import Link from "next/link";
import styles from "../styles/Navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.head}>
        Super
      </div>
      <div className={styles.links}>
        <div className="div"><Link href="">About</Link></div>
        <div className="div"><Link href="">Login</Link></div>
      </div>
    </div>
  )
}

export default Navbar