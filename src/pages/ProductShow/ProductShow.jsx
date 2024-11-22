// src/pages/ProductsShow/ProductsShow.jsx

import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate, NavLink } from "react-router-dom"

// Services
import { show } from "../../services/productService"
import { getBadges } from "../../services/badgeService"
import { getSeasonality } from "../../services/seasonalityService"
import { getCategories } from "../../services/categoriesService"

// Components
import SeasonalityGraph from '../../components/SeasonalityGraph/SeasonalityGraph'
import Badge from '../../components/Badge/Badge'

import styles from './ProductShow.module.scss';

const ProductsShow = ({ user }) => {

  const [product, setProduct] = useState(null)
  const [seasonality, setSeasonality] = useState([])
  const [seasonalityArray, setSeasonalityArray] = useState([])
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
      const seasons = products.seasonality.map(season => season.id)
      setSeasonalityArray(seasons)
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
  
  if (!product) return <p>Loading...</p>

  return (
    <main className={styles.productShow}>
      <div className={styles.productHeader}>
        <div className={styles.productTitle}>
          <h1 className={styles.productName}>{product.name}</h1>
          <h4 className={styles.productCategory}>{product.categories[0]?.name}</h4>
        </div>
        <div className={styles.productBadges}>
          {product.badges.map((badge) => (
            <Badge key={`badge-${badge.id}`} id={badge.id} badges={badges} />
          ))}
        </div>
      </div>
      <div className={styles.productDetails}>
        <img className={styles.productPhoto} src={product.photo} width="440px" alt={`Photo of a ${product.name}`} />
        <p className={styles.productDescription}>{product.description}</p>
        {product.seasonality.length > 0 && <SeasonalityGraph seasonality={seasonality} seasons={seasonalityArray} />}
      </div>
      { user.admin && <NavLink to={`/products/${product.id}/edit`} className="button" role="button">Edit</NavLink>}
    </main>
  );
};

export default ProductsShow;