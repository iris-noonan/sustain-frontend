// src/components/ProductForm/ProductForm.jsx

//!--- Imports
import { useState, useEffect, useCallback } from 'react'
import {useNavigate, useParams } from 'react-router-dom'

//!--- Services
import {show, create, update, deleteProduct } from '../../services/productService'
import { getBadges } from '../../services/badgeService'
import { getSeasonality } from '../../services/seasonalityService'
import { getCategories } from '../../services/categoriesService'


const ProductForm = () => {

  const [seasonality, setSeasonality] = useState([])
  const [badges, setBadges] = useState([])
  const [categories, setCategories] = useState([])

  //Form Data State

  const[formData, setFormData] = useState ({
    name: '',
    description: '',
    seasonality: [],
    badges: [],
    categories: []
  })

  //Errors State - for storing erros to use in error handling
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { productId } = useParams()

  //useEffect for bringing in the data if form is being used for update

  const fetchProduct = useCallback(async () => {
    try {
      const { data: product } = await show(productId)
      const { data: seasonality } = await getSeasonality()
      const { data: badges } = await getBadges()
      const { data: categories } = await getCategories()
      // set for dropdown and checkbox creation
      setBadges(badges)
      setCategories(categories)
      setSeasonality(seasonality)
      const currentSeasonality = product.seasonality.map(season => season.id)
      const currentBadges = product.badges.map(badge => badge.id)
      // form data needs to be changed to extract the ids
      const newFormData = {
        name: product.name,
        description: product.description,
        seasonality: currentSeasonality,
        badges: currentBadges,
        categories: product.categories
      }
      setFormData(newFormData)
    } catch (error) {
      console.log(error)
    }
  }, [productId])

  useEffect(() => {
      fetchProduct()
  }, [productId, fetchProduct])

  //!--- Handlers
  //Handle live changes to form inputs
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  //Handle live change to badges checkboxes
  const handleBadgeChange = (event) => {
    const badges = formData.badges
    const value = Number(event.target.value)
    // remove or add id to array
    if (badges.includes(value)) {
      const index = badges.indexOf(value)
      badges.splice(index, 1)
    } else {
      badges.push(value)
    }
    setFormData({...formData, ['badges']: badges})
  }

  //Handle live change to seasonality checkboxes
  const handleSeasonalityChange = (event) => {
    const seasonality = formData.seasonality
    const value = Number(event.target.value)
    // remove or add id to array
    if (seasonality.includes(value)) {
      const index = seasonality.indexOf(value)
      seasonality.splice(index, 1)
    } else {
      seasonality.push(value)
    }
    setFormData({...formData, ['seasonality']: seasonality})
  }

  //Handle live change to category dropdown
  const handleCategoryChange = (event) => {
    const categories = []
    debugger
    const value = Number(event.target.value)
    categories.push(value)
    setFormData({...formData, ['categories']: categories})
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

  if (!badges) return <p>Loading...</p>

  return (
    <div>
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
        <label htmlFor="categories">Choose a category:</label>
        <select name="categories" value={formData.categories[0] && formData.categories[0].id} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category.name} value={category.id}>{category.name}</option>
          ))}
        </select>
        <label htmlFor="categories">Choose badges:</label>
        {badges.map((badge, key) => (
          <>
            <input value={badge.id} key={badge.name + key} type="checkbox" checked={formData.badges.includes(badge.id)} onChange={handleBadgeChange} />
            <label htmlFor={badge.name}>{badge.name}</label>
          </>
        ))}
        <label htmlFor="seasonality">Choose Seasons:</label>
        {seasonality.map((season, key) => (
          <>
            <input value={season.id} key={season.name + key} type="checkbox" checked={formData.seasonality.includes(season.id)} onChange={handleSeasonalityChange} />
            <label htmlFor={season.name}>{season.name}</label>
          </>
        ))}

        <button type="submit"> Submit </button>
        <button onClick={handleDeleteProduct}>Delete</button>
      </form>
    </div>
  );
}

export default ProductForm;
