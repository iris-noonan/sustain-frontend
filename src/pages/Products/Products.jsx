// src/pages/Products/Products.jsx

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Services
import { index } from "../../services/productService"
import { getCategories } from "../../services/categoriesService"
import { getBadges } from "../../services/badgeService"

// Components
import Badge from '../../components/Badge/Badge'

import styles from "./Products.module.scss"

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [badges, setBadges] = useState([])
  const [category, setCategory] = useState(undefined)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await index()
        const { data: categories } = await getCategories()
        const { data: badges } = await getBadges()
        setProducts(data)
        setCategories(categories)
        setBadges(badges)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  //Handle live change to category dropdown
  const handleCategoryChange = (event) => {
    const category = Number(event.target.value)
    setCategory(category)
  }

  return (
    <main>
      <h1>Products</h1>

      <select name="categories" value={category} onChange={handleCategoryChange}>
        <option key="all" value="undefined">All</option>
        {categories.map((category) => (
          <option key={category.name} value={category.id}>{category.name}</option>
        ))}
      </select>
      <ul className={styles.products}>
        {products.map((product) => (
          <div key={`product-${product.id}`}>
            { (product.categories[0] === category || !category) &&
              <Link className={styles.productLink} key={product.id} to={`/products/${product.id}`}>
                <li className={styles.product}>
                  <img className={styles.productPhoto} src={product.photo} width="440px" alt={`Photo of a ${product.name}`} />
                  <span className={styles.productName}>{product.name}</span>
                  <div className={styles.productsBadges}>
                    {product.badges.map((badge) => (
                      <Badge key={`badge-${badge.id}`} id={badge} badges={badges} />
                    ))}
                  </div>
                </li>
              </Link>
            }
          </div>
        ))}
      </ul>
    </main>
  )
}

export default Products