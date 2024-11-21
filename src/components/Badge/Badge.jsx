import Biodegradable from '../../assets/Badges/Biodegradable.svg';
import CrueltyFree from '../../assets/Badges/Cruelty Free.svg';
import styles from './Badge.module.scss';

const Badge = ({ badge }) => {
  return (
    <div className={styles.badge}>
      {badge === 'Biodegradable' && <img src={Biodegradable} width="40" />}
      {badge === 'Cruelty Free' && <img src={CrueltyFree} width="40" />}
      <span className={styles.badgeLabel}>{badge}</span>
    </div>
  )
}

export default Badge;