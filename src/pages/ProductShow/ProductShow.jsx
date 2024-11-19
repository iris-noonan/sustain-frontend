// src/pages/ProductsShow/ProductsShow.jsx

import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"

// Services
import { show } from "../../services/productService"

const ProductsShow = () => {

  const [product, setProduct] = useState(null)
  // const [errors, setErrors] = useState(null)

  // Location variables
  const { productId } = useParams()
  const navigate = useNavigate()

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await show(productId)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }, [productId])

  useEffect(() => {
      fetchProduct()
  }, [productId, fetchProduct])

  console.log(product)
  if (!product) return <p>Loading...</p>

  return (
    <main>
      <h1>Product Name</h1>
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
