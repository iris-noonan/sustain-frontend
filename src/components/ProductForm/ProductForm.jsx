// src/components/ProductForm/ProductForm.jsx

//!--- Imports
import {useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'

//!--- Services
import {show, create, update, deleteProduct } from '../../services/productService'


const ProductForm = () => {
  //Form Data State
  const[formData, setFormData] = useState ({
    name: '',
    description: '',
  })

  //Errors State - for storing erros to use in error handling
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { productId } = useParams()

  //useEffect for bringing in the data if form is being used for update
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await show(productId)
        setFormData(data)
      } catch(error){
        console.log(error)
      }
    }
    if (productId) fetchProduct()
  }, [productId])

  //!--- Handlers
  //Handle live changes to form inputs
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let res
      if (productId) {//Determining if it's a new product or updating an existing
        res = await update(productId, formData)
      } else {
        res = await create(formData)
      }
      navigate(`/products/${res.data.id}`)
    } catch(error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const handleDeleteProduct = async () => {
    try {
        await deleteProduct(productId)
        navigate('/products')
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className='somethingnew'>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">Name:</label>
        <input
          required 
          type="text" 
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <input
          required
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit"> Submit </button>
        <button onClick={handleDeleteProduct}>Delete</button>
      </form>
    </div>
  );
}

export default ProductForm;
