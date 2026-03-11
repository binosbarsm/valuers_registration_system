import styles from "./section.module.css"

export default function SectionCard({title, children}){

  return(
    <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}