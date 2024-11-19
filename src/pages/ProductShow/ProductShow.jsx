// src/pages/ProductsShow/ProductsShow.jsx

import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"

// Services
import { show } from "../../services/productService"
import { getBadges } from "../../services/badgeService"
import { getSeasonality } from "../../services/seasonalityService"
import { getCategories } from "../../services/categoriesService"

const ProductsShow = () => {

  const [product, setProduct] = useState(null)
  const [seasonality, setSeasonality] = useState([])
  const [badges, setBadges] = useState([])
  const [categories, setCategories] = useState([])

  // const [errors, setErrors] = useState(null)

  // Location variables
  const { productId } = useParams()
  const navigate = useNavigate()

  const fetchProduct = useCallback(async () => {
    try {
      const { data: products } = await show(productId)
      const { data: seasonality } = await getSeasonality()
      const { data: badges } = await getBadges()
      const { data: categories } = await getCategories()
      setProduct(products)
      setBadges(badges)
      setCategories(categories)
      setSeasonality(seasonality)
    } catch (error) {
      console.log(error)
    }
  }, [productId])

  useEffect(() => {
      fetchProduct()
  }, [productId, fetchProduct])


  console.log(badges)
  console.log(product)
  console.log(seasonality)
  console.log(categories)
  
  if (!product) return <p>Loading...</p>

  return (
    <main>
      <h1>Product Name</h1>
      <h2>Badges</h2>
      <ul>
        {badges.map((badge) => (
          <li>
            <div>
              <div>
                <span>Name: </span>
                <span>{badge.name}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2>Product Details</h2>
      <p>{product.name}</p><br />
      <p>{product.description}</p><br />
      <ul>
        {product.seasonality.map((season) => (
          <li>
            <div>
              <div>
                <span>Name: </span>
                <span>{season.month}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul>
        {product.badges.map((badge) => (
          <li>
            <div>
              <div>
                <span>Name: </span>
                <span>{badge.name}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul>
        {product.categories.map((category) => (
          <li>
            <div>
              <div>
                <span>Name: </span>
                <span>{category.name}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ProductsShow;
