import styles from "./modal.module.css"

export default function DecisionModal({decision,onClose,onConfirm}){

  return(

    <div className={styles.overlay}>

      <div className={styles.modal}>

        <h3>Confirm Decision</h3>

        <p>
        Are you sure you want to <strong>{decision}</strong> this application?
        </p>

        <div className={styles.buttons}>

          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>

          <button onClick={onConfirm} className={styles.confirm}>
            Confirm
          </button>

        </div>

      </div>

    </div>
  )
}