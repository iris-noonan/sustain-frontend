import { cloudinaryUpload } from "../../services/cloudinary"

import styles from './ImageUploadField.module.scss';

const ImageUploadField = ({ setFormdata, formData, fieldName, setUploading }) => {

  const handleUploadImage = async (event) => {
    setUploading(true)
    const file = event.target.files[0]
    try {
      const { data } = await cloudinaryUpload(file)
      const imageURL = data.secure_url
      setFormdata({...formData, [fieldName]: imageURL })
    } catch (error) {
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={styles.imageUploadField}>
      <input className={styles.imageUploadFieldInput} type="file" name={fieldName} id={fieldName} onChange={handleUploadImage} />
    </div>
  )
}

export default ImageUploadField