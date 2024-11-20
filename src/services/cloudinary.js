import axios from 'axios'

export const cloudinaryUpload = (file) => {
  const url = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  return axios.postForm(url, {
    file: file,
    upload_preset: upload_preset
  })
}