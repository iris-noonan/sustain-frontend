import styles from './SeasonalityGraph.module.scss';

const SeasonalityGraph = ({ seasonality, seasons }) => {
  return (
    <div className={styles.graph}>
      <h3>
        Seasonality Graph
      </h3>
      <div className={styles.bars}>
        {seasonality.map((season) => (
          <div key={season.month} className={styles.barArea}>
            <div className={`${styles.bar} ${seasons.includes(season.month) ? styles.positive : styles.neutral}`} />
            <div>
              {season.month}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeasonalityGraph;