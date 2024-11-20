import { cloudinaryUpload } from "../../services/cloudinary"

const ImageUploadField = ({ setFormdata, formData, fieldName, setUploading }) => {

  const handleUploadImage = async (event) => {
    setUploading(true)
    const file = event.target.files[0]
    console.log('start')
    try {
      console.log('try')
      const { data } = await cloudinaryUpload(file)
      const imageURL = data.secure_url
      console.log('imageURL: ', imageURL)
      setFormdata({...formData, [fieldName]: imageURL })
    } catch (error) {
      console.log(error)
    } finally {
      console.log('finally')
      setUploading(false)
    }
  }

  return (
    <>
      <input type="file" name={fieldName} id={fieldName} onChange={handleUploadImage} />
    </>
  )
}

export default ImageUploadField