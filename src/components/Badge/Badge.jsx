import Biodegradable from '../../assets/Badges/Biodegradable.svg';
import CrueltyFree from '../../assets/Badges/Cruelty Free.svg';
import CarbonNeutral from '../../assets/Badges/Carbon Neutral.svg';
import AnimalWelfare from '../../assets/Badges/Animal Welfare.svg';
import Ethical from '../../assets/Badges/Ethical.svg';
import styles from './Badge.module.scss';

const Badge = ({ id, badges }) => {

  const item = badges.find(item => item.id === id)

  return (
    <div className={styles.badge}>
      {id === 1 && <img src={Biodegradable} width="40" />}
      {id === 2 && <img src={CrueltyFree} width="40" />}
      {id === 3 && <img src={CarbonNeutral} width="40" />}
      {id === 4 && <img src={AnimalWelfare} width="40" />}
      {id === 5 && <img src={Ethical} width="40" />}
      <span className={styles.badgeLabel}>{item.name}</span>
    </div>
  )
}

export default Badge;