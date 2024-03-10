import { NavLink} from 'umi'
import styles from './index.scss'
function Header(){
  return <div className={styles.header}>
  <span className={styles.icon}></span>
  <h1 className={styles.text}>Chicken Music</h1>
  <NavLink className={styles.mine} to="/user">
    <i className={'icon-mine ' + styles.iconMine} ></i>
  </NavLink>
</div>
}

export default Header