// src/pages/Products/Products.jsx

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Services
import { index } from "../../services/productService"

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await index()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  console.log(products)

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <li>
              <div>
                <div>
                  <span>Name: </span>
                  <span>{product.name}</span>
                </div>
                <div>
                  <span>Description: </span>
                  <span>{product.description}</span>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  )
}

export default Products