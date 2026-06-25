import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import styles from './DiscountPixPrice.css'

const DiscountPixPrice = () => {
  const productContextValue = useContext(ProductContext)

  const sellers = productContextValue?.product?.items?.[0]?.sellers
  const commertialOffer = sellers?.[0]?.commertialOffer
  const pixPrice = commertialOffer?.Price

  if (!pixPrice) return null

  const discountPrice = pixPrice * 0.9

  const formatted = discountPrice.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div>
      <span className={styles.discountPixPrice}>
        R$ {formatted}
      </span>
    </div>
  )
}

export default DiscountPixPrice
