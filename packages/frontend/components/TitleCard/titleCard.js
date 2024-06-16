import React from 'react'
import styles from './titleCard.module.scss'

function TitleCard(props) {
    return (
        <div className={styles.titleCard}>
            <div className={styles.BigName}>
                <h1>{props.title}</h1>
                <img src="/images/zk-logo2.png" alt="logo" />

            </div>
            <div className={styles.desc}>
                <p>{props.text}  </p>
                <img src="/images/hole.png" alt="wormhole logo" />
            </div>
            <p>(Page layout may be subject to change)</p>
        </div>
    )
}

export default TitleCard
