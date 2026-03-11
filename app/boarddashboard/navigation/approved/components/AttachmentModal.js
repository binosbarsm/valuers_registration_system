import styles from "./attachments.module.css"

export default function AttachmentViewer({files}){

  if(!files || files.length === 0){
    return <p>No attachments</p>
  }

  return(

    <div className={styles.files}>

      {files.map((file,index)=>(
        <div key={index} className={styles.file}>

          <span>{file.name}</span>

          <a
          href={file.url}
          target="_blank"
          className={styles.view}
          >
          View
          </a>

        </div>
      ))}

    </div>
  )
}